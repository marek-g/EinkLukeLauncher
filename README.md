# EinkLukeLauncher

Luke Launcher with changes for eink devices (tested on Likebook Mars).
Original site: https://lukelauncher.de/
Original code: https://gitlab.com/LukeSoftware/lukelauncher

## Changes

1. Added static wallpaper (icons/wallpaper.png) as a body background, because Likebook Mars doesn't support Android wallpapers.
2. Adjusted default settings to be more eink friendly.
3. Replaced black & white icon filters with inverted icons.

## Build

### Prerequisites

1. Nodejs
2. npm install -g cordova
3. cordova telemetry off
4. JavaSDK 1.8
5. AndroidSDK 28, build-tools 28.0.3
6. gradle 4.1

### Verification

1. cd project_dir
2. cordova requirements

### Build

1. cd project_dir
2. cordova build

Output: platforms\android\app\build\outputs\apk\debug\app-debug.apk
