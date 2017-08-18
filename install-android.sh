react-native bundle --platform android --dev true --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
cd android

echo "Building..."
./gradlew assembleDebug --configure-on-demand --daemon
for SERIAL in $(adb devices | grep -v List | cut -f 1);
    do
        DEVICE=$(adb -s $SERIAL shell getprop ro.product.model)
        echo "Installing On $DEVICE"
        adb -s $SERIAL install -r app/build/outputs/apk/app-debug.apk
        echo "Launching On $DEVICE"
        adb -s $SERIAL shell am start -n "com.firstdemo/com.firstdemo.MainActivity" -a android.intent.action.MAIN -c android.intent.category.LAUNCHER
    done