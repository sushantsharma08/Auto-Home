#include <WiFi.h>
#include <WiFiMulti.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <LittleFS.h>
#include "DHT.h"
#include "ota_updater.h"

// DHT
#define DHTPIN 35
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// WiFi & timing
WiFiMulti wifiMulti;
static unsigned long lastAttemptTime = 0;
const unsigned long retryInterval = 10000; // Retry every 10 seconds
const uint32_t connectTimeoutMs = 5000;

// Relays
const int RELAY_PINS[] = {32, 33, 25, 26, 27, 14, 12, 13};
const int pinCount = sizeof(RELAY_PINS) / sizeof(RELAY_PINS[0]);
int RELAY_STAT[8] = {1, 1, 1, 1, 1, 1, 1, 1}; // 1=OFF (HIGH in your wiring), 0=ON (LOW)
const int wifiStatus = 2;                     // status LED pin

// OTA URLs (replace <user>/<repo> with your GitHub repo)
const String remoteVersionUrl = "https://raw.githubusercontent.com/sushantsharma08/Auto-Home/refs/heads/main/ESP/releases/version.txt";
const String remoteBinUrl = "https://raw.githubusercontent.com/sushantsharma08/Auto-Home/refs/heads/main/ESP/releases/firmware.bin";

OtaUpdater ota(remoteVersionUrl, remoteBinUrl);

// For storing outside temperature read from OpenWeatherMap
float outsideTemp = 0.0;

void ensureLocalVersionFile()
{
  // Create default version file if missing so ota.getLocalVersion() returns something sane on first boot
  if (!LittleFS.exists("/data/version.txt"))
  {
    File f = LittleFS.open("/data/version.txt", "w");
    if (f)
    {
      f.print("1.0.0");
      f.close();
      Serial.println("Created default data/version.txt -> 1.0.0");
    }
    else
    {
      Serial.println("Failed to create data/version.txt");
    }
  }
}

void setup()
{
  Serial.begin(115200);
  delay(10);

  if (!LittleFS.begin())
  { // 'true' forces format if mount fails
    Serial.println("LittleFS mount failed — formatted new FS");
  }
  else
  {
    Serial.println("LittleFS mounted successfully");
  }

  // Ensure version file
  ensureLocalVersionFile();

  // Pins
  for (int i = 0; i < pinCount; ++i)
  {
    pinMode(RELAY_PINS[i], OUTPUT);
    digitalWrite(RELAY_PINS[i], HIGH); // HIGH = relay off (based on your wiring)
  }
  pinMode(wifiStatus, OUTPUT);
  digitalWrite(wifiStatus, LOW);

  // WiFi APs (replace with your APs)
  wifiMulti.addAP("Heyy", "123456789");
  wifiMulti.addAP("RAILWIRE ", "Sushant@123");
  wifiMulti.addAP("LBS", "Sushant@123");
  wifiMulti.addAP("Sushma", "Sushant@123");

  // DHT
  dht.begin();

  // Scan networks (optional)
  Serial.println("Scanning for networks...");
  int n = WiFi.scanNetworks();
  Serial.println("scan done");
  if (n == 0)
  {
    Serial.println("no networks found");
  }
  else
  {
    Serial.print(n);
    Serial.println(" networks found");
    for (int i = 0; i < n; ++i)
    {
      Serial.print(i + 1);
      Serial.print(": ");
      Serial.print(WiFi.SSID(i));
      Serial.print(" (");
      Serial.print(WiFi.RSSI(i));
      Serial.print(")");
      Serial.println((WiFi.encryptionType(i) == WIFI_AUTH_OPEN) ? " " : "*");
      delay(10);
    }
  }

  // Connect to WiFi (initial attempt)
  Serial.println("Connecting Wifi...");
  if (wifiMulti.run() == WL_CONNECTED)
  {
    Serial.println("WiFi connected");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
    digitalWrite(wifiStatus, HIGH);
  }
  else
  {
    Serial.println("WiFi not connected at startup");
    digitalWrite(wifiStatus, LOW);
  }

  // Initialize OTA
  ota.begin();

  // Check for update at boot (non-forced)
  ota.checkForUpdate(false);
}

void applyRelayStatesFromArray()
{
  for (int i = 0; i < pinCount; ++i)
  {
    digitalWrite(RELAY_PINS[i], RELAY_STAT[i] ? HIGH : LOW);
  }
}

void setAllRelaysOff()
{
  for (int i = 0; i < pinCount; ++i)
  {
    RELAY_STAT[i] = 1;
    digitalWrite(RELAY_PINS[i], HIGH);
  }
}

void loop()
{
  // Let WiFiMulti manage connections; use short timeout here because we do other work
  if (wifiMulti.run(connectTimeoutMs) == WL_CONNECTED)
  {
    // Connected branch
    digitalWrite(wifiStatus, HIGH);
    Serial.print("WiFi connected: ");
    Serial.print(WiFi.SSID());
    Serial.print(" RSSI: ");
    Serial.println(WiFi.RSSI());

    // ---- Fetch relay states from your server ----
    HTTPClient client;
    HTTPClient client2;

    // Replace URLs as needed (these are from your original code)
    client.begin("https://auto-home-orcin.vercel.app/relay/relayStatus/6743a8c997a5808f5c931306");
    client2.begin("https://api.openweathermap.org/data/2.5/weather?lat=24.2788073&lon=80.751114&appid=9ea7d46e608e220eeb700a039471e561&units=metric");

    int httpCode = client.GET();
    int httpCode2 = client2.GET();

    if (httpCode > 0 && httpCode2 > 0)
    {
      String payload = client.getString();
      String payload2 = client2.getString();
      Serial.println("Relay payload:");
      Serial.println(payload);

      // Clean payload
      payload.replace(" ", "");
      payload.replace("\n", "");
      payload.trim();

      // Prepare char buffers
      const size_t BUF1 = 1024;
      const size_t BUF2 = 1024;
      char Json[BUF1];
      char Json2[BUF2];

      payload.toCharArray(Json, BUF1);
      payload2.toCharArray(Json2, BUF2);

      // Parse JSON
      StaticJsonDocument<1024> doc;
      StaticJsonDocument<1024> doc2;
      DeserializationError err1 = deserializeJson(doc, Json);
      DeserializationError err2 = deserializeJson(doc2, Json2);

      if (!err2)
      {
        // main.temp in weather
        if (doc2.containsKey("main") && doc2["main"].containsKey("temp"))
        {
          outsideTemp = doc2["main"]["temp"].as<float>();
        }
      }
      else
      {
        Serial.print("Weather JSON parse error: ");
        Serial.println(err2.c_str());
      }

      if (!err1)
      {
        // Filling RELAY_STAT from JSON array
        if (doc.containsKey("relayStatus") && doc["relayStatus"].is<JsonArray>())
        {
          JsonArray arr = doc["relayStatus"].as<JsonArray>();
          for (int i = 0; i < pinCount && i < (int)arr.size(); ++i)
          {
            RELAY_STAT[i] = arr[i].as<int>();
          }
          applyRelayStatesFromArray();
        }
        else
        {
          Serial.println("relayStatus missing or not array");
        }
      }
      else
      {
        Serial.print("Relay JSON parse error: ");
        Serial.println(err1.c_str());
      }

      Serial.print("http code :");
      Serial.println(httpCode);

      client.end();
      client2.end();
    }
    else
    {
      // HTTP failed: keep previous states, try reconnect logic
      Serial.println("HTTP fetch failed or returned bad code");
      client.end();
      client2.end();
      digitalWrite(wifiStatus, LOW);
      if (millis() - lastAttemptTime > retryInterval)
      {
        lastAttemptTime = millis();
        Serial.println("reconnecting...");
        if (wifiMulti.run(connectTimeoutMs) == WL_CONNECTED)
        {
          Serial.println("Reconnected to WiFi!");
        }
      }
    }

    // Reading DHT sensor
    float h = dht.readHumidity();
    float t = dht.readTemperature(); // Celsius

    if (isnan(h) || isnan(t))
    {
      Serial.println("Failed to read from DHT sensor!");
    }
    else
    {
      Serial.print("Humidity: ");
      Serial.print(h);
      Serial.print("%  Inside Temperature: ");
      Serial.print(t);
      Serial.print("°C  Outside Temperature: ");
      Serial.print(outsideTemp);
      Serial.println("°C");
    }

    // Periodic OTA check. 
    // Frequency: every 1 hour.
    static unsigned long lastOtaCheck = 0;
    const unsigned long otaInterval = 60UL * 60UL * 1000UL; // 1 hour
    if (millis() - lastOtaCheck > otaInterval)
    {
      lastOtaCheck = millis();
      ota.checkForUpdate(false);
    }

    delay(200); // small pause to not put load on the server
  }
  else
  {
    digitalWrite(wifiStatus, LOW);
    Serial.println("Connection Lost!!!");
    setAllRelaysOff();

    if (millis() - lastAttemptTime > retryInterval)
    {
      lastAttemptTime = millis();
      Serial.println("reconnecting...");
      // Try to reconnect
      wifiMulti.run();
      if (wifiMulti.run(connectTimeoutMs) == WL_CONNECTED)
      {
        Serial.println("Reconnected to WiFi!");
        digitalWrite(wifiStatus, HIGH);
      }
    }

    delay(500);
  }
}