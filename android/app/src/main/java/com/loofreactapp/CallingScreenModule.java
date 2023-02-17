package com.loofreactapp;

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

class CallingScreenModule extends ReactContextBaseJavaModule {
    ReactApplicationContext reactContext;
    CallingScreenModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "CallingScreenModule";
    }

    @ReactMethod
    void navigateToAndroidNativeActivity(String userId) {
        ReactApplicationContext context = getReactApplicationContext();
        Intent intent = new Intent(context, CallingScreenActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        intent.putExtra("activity", "AndroidBridgeModule");
        intent.putExtra("userId", userId);
        context.startActivity(intent);
    }
 }
