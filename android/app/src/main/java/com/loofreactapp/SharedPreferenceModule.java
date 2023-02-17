package com.loofreactapp;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.firebase.messaging.FirebaseMessaging;

public class SharedPreferenceModule extends ReactContextBaseJavaModule {
    ReactApplicationContext reactContext;
    SharedPreferences sharedpreferences;
    public static String TAG = "LoofReactApp: SharedPreferenceModule ";

    SharedPreferenceModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "SharedPreferenceModule";
    }

    @ReactMethod
    void setUserToken(String token){
        sharedpreferences = getCurrentActivity().getSharedPreferences(CallingScreenActivity.MyPREFERENCES, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedpreferences.edit();
        editor.putString("userToken", token);
        editor.apply();
        FirebaseMessaging.getInstance().getToken().addOnCompleteListener(task -> {
            if (!task.isSuccessful()) {
                Log.w(TAG, "Fetching FCM registration token failed", task.getException());
                return;
            }
            String fcm_token = task.getResult();
            Log.d(TAG, "token: "+fcm_token);
            Utils.registerToken(token, fcm_token);
        });

    }
}
