cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "com-darryncampbell-cordova-plugin-intent.IntentShim",
      "file": "plugins/com-darryncampbell-cordova-plugin-intent/www/IntentShim.js",
      "pluginId": "com-darryncampbell-cordova-plugin-intent",
      "clobbers": [
        "intentShim"
      ]
    },
    {
      "id": "com.bar.info.Info",
      "file": "plugins/com.bar.info/www/info.js",
      "pluginId": "com.bar.info",
      "clobbers": [
        "androidinfo"
      ]
    },
    {
      "id": "com.lampa.startapp.startapp",
      "file": "plugins/com.lampa.startapp/www/startApp.js",
      "pluginId": "com.lampa.startapp",
      "merges": [
        "startApp"
      ]
    },
    {
      "id": "cordova-open-native-settings.Settings",
      "file": "plugins/cordova-open-native-settings/www/settings.js",
      "pluginId": "cordova-open-native-settings",
      "clobbers": [
        "cordova.plugins.settings"
      ]
    },
    {
      "id": "cordova-plugin-app-version.AppVersionPlugin",
      "file": "plugins/cordova-plugin-app-version/www/AppVersionPlugin.js",
      "pluginId": "cordova-plugin-app-version",
      "clobbers": [
        "cordova.getAppVersion"
      ]
    },
    {
      "id": "cordova-plugin-camera.Camera",
      "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "Camera"
      ]
    },
    {
      "id": "cordova-plugin-camera.CameraPopoverOptions",
      "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "CameraPopoverOptions"
      ]
    },
    {
      "id": "cordova-plugin-camera.camera",
      "file": "plugins/cordova-plugin-camera/www/Camera.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "navigator.camera"
      ]
    },
    {
      "id": "cordova-plugin-camera.CameraPopoverHandle",
      "file": "plugins/cordova-plugin-camera/www/CameraPopoverHandle.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "CameraPopoverHandle"
      ]
    },
    {
      "id": "cordova-plugin-device.device",
      "file": "plugins/cordova-plugin-device/www/device.js",
      "pluginId": "cordova-plugin-device",
      "clobbers": [
        "device"
      ]
    },
    {
      "id": "cordova-plugin-fonts.fonts",
      "file": "plugins/cordova-plugin-fonts/www/fonts.js",
      "pluginId": "cordova-plugin-fonts",
      "clobbers": [
        "navigator.Fonts"
      ]
    },
    {
      "id": "cordova-plugin-intent-list.IntentList",
      "file": "plugins/cordova-plugin-intent-list/www/IntentList.js",
      "pluginId": "cordova-plugin-intent-list",
      "clobbers": [
        "navigator.IntentList"
      ]
    },
    {
      "id": "cordova-plugin-nativestorage.mainHandle",
      "file": "plugins/cordova-plugin-nativestorage/www/mainHandle.js",
      "pluginId": "cordova-plugin-nativestorage",
      "clobbers": [
        "NativeStorage"
      ]
    },
    {
      "id": "cordova-plugin-nativestorage.LocalStorageHandle",
      "file": "plugins/cordova-plugin-nativestorage/www/LocalStorageHandle.js",
      "pluginId": "cordova-plugin-nativestorage"
    },
    {
      "id": "cordova-plugin-nativestorage.NativeStorageError",
      "file": "plugins/cordova-plugin-nativestorage/www/NativeStorageError.js",
      "pluginId": "cordova-plugin-nativestorage"
    },
    {
      "id": "cordova-plugin-navigationbar-color.navigationbar",
      "file": "plugins/cordova-plugin-navigationbar-color/www/navigationbar.js",
      "pluginId": "cordova-plugin-navigationbar-color",
      "clobbers": [
        "window.NavigationBar"
      ]
    },
    {
      "id": "cordova-plugin-statusbar.statusbar",
      "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
      "pluginId": "cordova-plugin-statusbar",
      "clobbers": [
        "window.StatusBar"
      ]
    },
    {
      "id": "cordova-plugin-wallpaper.wallpaper",
      "file": "plugins/cordova-plugin-wallpaper/www/wallpaper.js",
      "pluginId": "cordova-plugin-wallpaper",
      "clobbers": [
        "wallpaper"
      ]
    },
    {
      "id": "cordova-plugin-x-toast.Toast",
      "file": "plugins/cordova-plugin-x-toast/www/Toast.js",
      "pluginId": "cordova-plugin-x-toast",
      "clobbers": [
        "window.plugins.toast"
      ]
    },
    {
      "id": "cordova.plugins.diagnostic.Diagnostic",
      "file": "plugins/cordova.plugins.diagnostic/www/android/diagnostic.js",
      "pluginId": "cordova.plugins.diagnostic",
      "merges": [
        "cordova.plugins.diagnostic"
      ]
    },
    {
      "id": "cordova.plugins.diagnostic.Diagnostic_External_Storage",
      "file": "plugins/cordova.plugins.diagnostic/www/android/diagnostic.external_storage.js",
      "pluginId": "cordova.plugins.diagnostic",
      "merges": [
        "cordova.plugins.diagnostic.external_storage"
      ]
    },
    {
      "id": "net.coconauts.notification-listener.NotificationListener",
      "file": "plugins/net.coconauts.notification-listener/www/notification-listener.js",
      "pluginId": "net.coconauts.notification-listener",
      "clobbers": [
        "notificationListener"
      ]
    }
  ];
  module.exports.metadata = {
    "com-darryncampbell-cordova-plugin-intent": "1.1.8",
    "com.bar.info": "0.7.0",
    "com.lampa.startapp": "6.1.6",
    "cordova-open-native-settings": "1.5.2",
    "cordova-plugin-app-version": "0.1.9",
    "cordova-plugin-camera": "4.1.0",
    "cordova-plugin-device": "2.0.3",
    "cordova-plugin-fonts": "0.6.5",
    "cordova-plugin-intent-list": "0.0.5",
    "cordova-plugin-nativestorage": "2.3.2",
    "cordova-plugin-navigationbar-color": "0.0.8",
    "cordova-plugin-proguard": "2.0.1",
    "cordova-plugin-statusbar": "2.4.2",
    "cordova-plugin-wallpaper": "0.1.0",
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-plugin-x-toast": "2.7.2",
    "cordova.plugins.diagnostic": "5.0.1",
    "net.coconauts.notification-listener": "0.0.2"
  };
});