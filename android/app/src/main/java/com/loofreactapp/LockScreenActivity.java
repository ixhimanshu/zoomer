package com.loofreactapp;


import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.WindowManager;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.annotation.RequiresApi;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;


public class LockScreenActivity extends ReactActivity implements LockScreenActivityInterface {

    private static final String TAG = "MessagingService";
    private Ringtone ringtone;
    LocalBroadcastManager mLocalBroadcastManager;
    BroadcastReceiver mBroadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            if(intent.getAction().equals("com.lockscreenactivity.action.close")){
                finish();
            }
        }
    };
    @RequiresApi(api = Build.VERSION_CODES.P)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);        
        mLocalBroadcastManager = LocalBroadcastManager.getInstance(this);
        IntentFilter mIntentFilter = new IntentFilter();
        mIntentFilter.addAction("com.lockscreenactivity.action.close");
        mLocalBroadcastManager.registerReceiver(mBroadcastReceiver, mIntentFilter);

        getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN | WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON | WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON
                | WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED | WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD);

        setContentView(R.layout.incomingcall_activity);

        Intent intent = getIntent();
        String connectedUserId = intent.getStringExtra("connectedUserId");
        final Integer notifID=intent.getIntExtra("NOTIFICATION_ID", -1);

        //ringtoneManager start
        Uri incoming_call_notif = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_RINGTONE);
        this.ringtone= RingtoneManager.getRingtone(getApplicationContext(), incoming_call_notif);
        //ringtoneManager end

        final Boolean fallBack = intent.getBooleanExtra("FALL_BACK",true);
            if(!fallBack) {
                ringtone.setLooping(true);
                ringtone.play();
            }
        final String host_name = "Seeker";
        final Boolean isAppRuning = intent.getBooleanExtra("APP_STATE",false);

        TextView tvName = (TextView)findViewById(R.id.callerName);
        tvName.setText(host_name);

        TextView iconName = (TextView)findViewById(R.id.icon_text);
        iconName.setText("A");

        ImageButton acceptCallBtn = (ImageButton) findViewById(R.id.accept_call_btn);
        acceptCallBtn.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {                
                WritableMap params = Arguments.createMap();
                params.putBoolean("done", true);                
                removeNotification(fallBack,notifID);
                Intent intent = new Intent(LockScreenActivity.this, CallingScreenActivity.class);
                intent.setAction(Intent.ACTION_VIEW);
                intent.setAction(Intent.ACTION_MAIN);
                intent.addCategory(Intent.CATEGORY_LAUNCHER);
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
                intent.putExtra("activity", "FireBaseMessageInterceptor");
		        intent.putExtra("connectedUserId", connectedUserId);		
		        intent.putExtra("action", "start");                
                startActivity(intent); 
                finish();               
            }
        });

        ImageButton rejectCallBtn = (ImageButton) findViewById(R.id.reject_call_btn);
        rejectCallBtn.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                WritableMap params = Arguments.createMap();
                params.putBoolean("done", true);
                removeNotification(fallBack,notifID);
                Intent intent = new Intent(LockScreenActivity.this, CallingScreenActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
                intent.putExtra("activity", "FireBaseMessageInterceptor");
		        intent.putExtra("connectedUserId", connectedUserId);		
		        intent.putExtra("action", "stop");
                startActivity(intent);
                finish();
            }
        });

        Handler handler = new Handler();

        handler.postDelayed(new Runnable() {
            public void run() {
                finish();
            }
        }, 45000);

    }


    @Override
    public void onDestroy() {
        super.onDestroy();
        mLocalBroadcastManager.unregisterReceiver(mBroadcastReceiver);
        ringtone.stop();
    }

    @Override
    public void onConnected() {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
//                ...
            }
        });
    }


    @Override
    public void onConnectFailure() {

    }

    @Override
    public void onIncoming(ReadableMap params) {

    }

    private void removeNotification(Boolean fallBack,Integer notifID){
        if(fallBack) {
            NotificationManager manager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
            manager.cancel(notifID);
        }
    }


}
