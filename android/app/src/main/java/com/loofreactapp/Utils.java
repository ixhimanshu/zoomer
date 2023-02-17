package com.loofreactapp;

import android.content.SharedPreferences;
import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public class Utils {
    static String logtag = "LoofReactApp:Utils";
    public static String BaseUrl = "https://dev.loof.in/api";
    public static String selfUserId = "gyan";
    public static SharedPreferences sharedpreferences;

    public  Utils(){
    }

    public static String getUserToken(){
        String token = sharedpreferences.getString("userToken", "None");
        Log.d(logtag, "token recieved: " + token);
        return token;
    }

    public static void sendData(JSONObject data, String connectedUserId){
        new Thread(() -> {
            String endpoint = BaseUrl + "/webrtc-handshake/";
            try {
                data.put("handshake", "webrtc"); // setting the handshake key
                Log.d(logtag, "sent object is "+ data);
                Log.d(logtag, "connected user id is " + connectedUserId);
                URL loofBackendUrl = new URL(endpoint+connectedUserId);
                HttpURLConnection urlConnection = (HttpURLConnection) loofBackendUrl.openConnection();
                urlConnection.setRequestMethod("POST");
                urlConnection.setRequestProperty("Content-Type", "application/json");
                urlConnection.setRequestProperty("Accept","application/json");
                urlConnection.setRequestProperty("x-access-token", Utils.getUserToken());
                urlConnection.setConnectTimeout(5*1000);
                OutputStream os = urlConnection.getOutputStream();
                os.write(data.toString().getBytes(StandardCharsets.UTF_8));
                os.flush();
                if (urlConnection.getResponseCode() != HttpURLConnection.HTTP_OK) {
                    Log.e(logtag, "error sendData " + urlConnection.getErrorStream());
                    throw new RuntimeException("Failed : HTTP error code : "
                            + urlConnection.getResponseCode());
                }
                urlConnection.disconnect();
            } catch (Exception e) {
                Log.e(logtag, "error sendData " + e.getMessage());
                e.printStackTrace();
            }
        }).start();
    }

    public static void registerToken(String auth_token, String fcm_token){
        new Thread(() -> {
            if (fcm_token == null){
                Log.d(logtag, "User has not logged in yet");
                return;
            }
            Log.d(logtag, "calling register token");
            String endpoint = BaseUrl + "/register-token/";
            JSONObject fcm_object = new JSONObject();
            try {
                fcm_object.put("fcm_token", fcm_token);
                URL loofBackendUrl = new URL(endpoint);
                HttpURLConnection urlConnection = (HttpURLConnection) loofBackendUrl.openConnection();
                urlConnection.setRequestMethod("POST");
                urlConnection.setRequestProperty("Content-Type", "application/json");
                urlConnection.setRequestProperty("Accept","application/json");
                urlConnection.setRequestProperty("x-access-token", auth_token);
                urlConnection.setDoOutput(true);
                OutputStream os = urlConnection.getOutputStream();
                os.write(fcm_object.toString().getBytes(StandardCharsets.UTF_8));
                os.flush();
                if (urlConnection.getResponseCode() != HttpURLConnection.HTTP_CREATED) {
                    Log.e(logtag, "error registerToken " + urlConnection.getErrorStream());
                    throw new RuntimeException("Failed : HTTP error code : "
                            + urlConnection.getResponseCode());
                }
                urlConnection.disconnect();
                Log.d(logtag, "fcm_token_set successfully");
            } catch (JSONException | IOException e) {
                Log.e(logtag, "error sendData " + e.getMessage());
                e.printStackTrace();
            }
        }).start();

    }
}
