#ifndef OTA_UPDATER_H
#define OTA_UPDATER_H

#include <Arduino.h>

class OtaUpdater {
  public:
    OtaUpdater(const String& versionUrl, const String& binUrl);
    void begin();
    void checkForUpdate(bool force = false);
    String getLocalVersion();
    void performOTA(const String& newVersion);

  private:
    String _versionUrl;
    String _binUrl;
};

#endif