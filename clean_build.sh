#!/bin/sh
find platforms/android/app/src/main/res/* -type d | grep -Ev "values|xml" | xargs rm -rf
rm platforms/android/app/src/main/assets/www/icons/app.png
exit 0
