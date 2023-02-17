package com.loofreactapp;

import android.app.NotificationManager;
import android.content.Intent;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.widget.ImageButton;

import androidx.databinding.DataBindingUtil;

import com.facebook.react.ReactActivity;
import com.loofreactapp.data.UserStatus;
import com.loofreactapp.databinding.CallingscreenLayoutBinding;

import org.json.JSONException;
import org.json.JSONObject;


public class CallingScreenActivity extends ReactActivity{
    public static final String MyPREFERENCES = "loofPref" ;
    public static final String NOTIFICATION_ID = "NOTIFICATION_ID";
    static String logtag = "LoofReactApp:CallingScreenActivity";
    private RTConnection rtConnection;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Intent intent = getIntent();
        String activity = intent.getStringExtra("activity");
        String connectedUserId = intent.getStringExtra("connectedUserId"); // this will only set with FireBaseMessageInterceptor
        String intent_action = intent.getStringExtra("action");
        UserStatus userStatus = new UserStatus("");
        CallingscreenLayoutBinding binding = DataBindingUtil.setContentView(this, R.layout.callingscreen_layout);
        binding.setUserStatus(userStatus);
        rtConnection = RTConnection.getInstance(this);
        assert rtConnection != null;
        rtConnection.initialize(userStatus);


        if (activity!=null && activity.equals("FireBaseMessageInterceptor")) {
            Uri incoming_call_notif = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_RINGTONE);
            Ringtone ringtone = RingtoneManager.getRingtone(getApplicationContext(), incoming_call_notif);
            Log.d(logtag," notificationActivity " + getIntent().getIntExtra(NOTIFICATION_ID, -1));
            NotificationManager manager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
            manager.cancel(getIntent().getIntExtra(NOTIFICATION_ID, -1));
            ringtone.stop();
            rtConnection.connectedUserId = connectedUserId; // setting the connected user id here only
            if (intent_action.equals("stop")){
                Log.d(logtag, " stop action recieved cancelling");
                disconnnect(connectedUserId);
                finish();
            }
            else if(intent_action.equals("start")){
                Log.d(logtag, "call accepted");
                sendConnectionInit(connectedUserId);

            }
        }

        else if (activity!=null && activity.equals("AndroidBridgeModule")){
            if (intent.getStringExtra("userId")!=null){
                Log.d(logtag, " calling action initiated");
                int status = rtConnection.sendNotification(
                        intent.getStringExtra("userId")
                );
                Log.d(logtag, "sendNotification status " + status);
                userStatus.setAppStatus("Connecting.....");
                if (status != 200){
                    disconnnect(rtConnection.connectedUserId);
                    rtConnection.close();
                }
            }            
        }


        final ImageButton button = findViewById(R.id.reject_call_btn);
        button.setOnClickListener(v -> {
            Log.d(logtag, " end button clicked");
            RTConnection rtConnection = RTConnection.getInstance(null);
            if (rtConnection!=null && rtConnection.isConnectionInitiated){
                disconnnect(rtConnection.connectedUserId);
                rtConnection.close();
            }
        });
    }

    public void sendConnectionInit(String connectedUserId){
        Log.d(logtag, "sendConnectionInit "+connectedUserId);
        if (connectedUserId == null){
            Log.d(logtag, "null connected user id recieved something is wrong");
            return;
        }
        JSONObject obj = new JSONObject();
        try {
            obj.put("type", "connection_initiated");
            Utils.sendData(obj, connectedUserId);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public void disconnnect(String connectedUserId){
        Log.d(logtag, "calling disconnect "+connectedUserId);
        if (connectedUserId == null){
            Log.d(logtag, "null connected user id recieved something is wrong");
            return;
        }
        JSONObject obj = new JSONObject();
        try {
            obj.put("type", "disconnected");
            Utils.sendData(obj, connectedUserId);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.d(logtag, "On pause called ");
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.d(logtag, "onResume called ");
    }

    @Override
    protected void onDestroy() {
        Log.d(logtag, "On destroy called");        
        super.onDestroy();
        if (this.rtConnection != null){
            Log.w(logtag, "rtcConnection is not null called must be reciever direct end call");
            disconnnect(rtConnection.connectedUserId);
            rtConnection.close();   
        }
        this.rtConnection = null;
    }

}
