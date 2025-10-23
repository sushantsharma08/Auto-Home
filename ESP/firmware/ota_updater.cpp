#include "ota_updater.h"
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <Update.h>
#include <LittleFS.h>

OtaUpdater::OtaUpdater(const String &versionUrl, const String &binUrl)
    : _versionUrl(versionUrl), _binUrl(binUrl) {}

void OtaUpdater::begin()
{
    if (!LittleFS.begin())
    {
        Serial.println("LittleFS mount failed");
    }
    else
    {
        Serial.println("LittleFS mounted successfully");
    }
}

// Read local version from LittleFS file
String OtaUpdater::getLocalVersion()
{
    File f = LittleFS.open("/version.txt", "r");
    if (!f)
    {
        Serial.println("No local version file found");
        return "0.0.0";
    }
    String v = f.readStringUntil('\n');
    f.close();
    v.trim();
    return v;
}

// Main OTA update check
void OtaUpdater::checkForUpdate(bool force)
{
    Serial.println("[OTA] Checking for updates...");

    WiFiClientSecure client;
    client.setInsecure(); // Allow HTTPS without certificate validation (GitHub raw)

    HTTPClient http;
    http.begin(client, _versionUrl);
    int code = http.GET();
    if (code != 200)
    {
        Serial.printf("Version fetch error: %d\n", code);
        http.end();
        return;
    }

    String remoteVersion = http.getString();
    remoteVersion.trim();
    http.end();

    String localVersion = getLocalVersion();

    Serial.printf("Local version: %s, Remote version: %s\n",
                  localVersion.c_str(), remoteVersion.c_str());

    if (force || (remoteVersion.length() > 0 && remoteVersion != localVersion))
    {
        Serial.println("[OTA] New version found, starting update...");
        performOTA(remoteVersion);
    }
    else
    {
        Serial.println("[OTA] No update required.");
    }
}

// Perform OTA update from binary URL
void OtaUpdater::performOTA(const String &newVersion)
{
    WiFiClientSecure client;
    client.setInsecure();

    HTTPClient http;
    http.begin(client, _binUrl);
    int httpCode = http.GET();

    if (httpCode == HTTP_CODE_OK)
    {
        int contentLength = http.getSize();
        if (contentLength > 0)
        {
            bool canBegin = Update.begin(contentLength);
            if (canBegin)
            {
                Serial.println("[OTA] Starting firmware update...");
                Stream *stream = http.getStreamPtr();
size_t written = Update.writeStream(*stream);
                if (written == contentLength && Update.end())
                {
                    Serial.println("[OTA] Update successful!");
                    // Save new version to LittleFS
                    File f = LittleFS.open("/version.txt", "w");
                    if (f)
                    {
                        f.print(newVersion);
                        f.close();
                    }
                    Serial.println("[OTA] Rebooting...");
                    delay(1000);
                    ESP.restart();
                }
                else
                {
                    Serial.printf("[OTA] Update failed. Error #: %d\n", Update.getError());
                }
            }
            else
            {
                Serial.println("[OTA] Not enough space for update.");
            }
        }
        else
        {
            Serial.println("[OTA] Content length invalid.");
        }
    }
    else
    {
        Serial.printf("[OTA] Failed to download binary. HTTP code: %d\n", httpCode);
    }

    http.end();
}
