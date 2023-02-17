package com.loofreactapp;

import android.app.ActivityManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.AudioAttributes;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.SystemClock;
import android.text.Spannable;
import android.text.SpannableString;
import android.text.style.ForegroundColorSpan;
import android.util.Log;

import androidx.annotation.ColorRes;
import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;
import java.util.List;

public class FireBaseMessageInterceptor extends FirebaseMessagingService {
	static String logtag = "LoofReactApp:FireBaseMessageInterceptor";
	private int notification_id;
	private int seconds_delay_notification = 30;

	/**
	 * Returns the name of the main component registered from JavaScript.
	 * This is used to schedule rendering of the component.
	 */

	/**
	 * Called when message is received.
	 *
	 * @param remoteMessage Object representing the message received from Firebase Cloud Messaging.
	 */
	@RequiresApi(api = Build.VERSION_CODES.M)
	@Override
	public void onMessageReceived(RemoteMessage remoteMessage) {
		Log.d(logtag, "remote message "+remoteMessage.getData().toString());
		if (
			remoteMessage.getData().get("handshake") != null &&
			remoteMessage.getData().get("handshake").matches("webrtc")
		){			
			try {
				sendControlMessages(remoteMessage);
			}
			catch (Exception e){
				Log.d(logtag, "exception in webrtc" + e.getMessage() + "\n");
			}
		}
		else if(
				remoteMessage.getData().get("type") != null &&
				remoteMessage.getData().get("type").matches("ring")
		) {
			try {
				RTConnection rtc_obj = RTConnection.getInstance(null);
				if(rtc_obj != null && rtc_obj.isConnectionInitiated){ // this has been added to check if the user is already in call thn he should not be bothered
					Log.d(logtag, "already connected returning..");
					return;
				}
				sendNotification(remoteMessage);
			} catch (Exception e) {
				Log.e(logtag, "onMessageReceived error" + e.getMessage() + "\n");
			}
		}
	}

	private void sendControlMessages(RemoteMessage recived_obj){
		RTConnection rtc_obj = RTConnection.getInstance(null);
		String type = recived_obj.getData().get("type");
		if (rtc_obj == null && type.equals("disconnected")){ // this occurs when phone is ringing and caller disconnected the call
			Log.d(logtag, "disconnected with null rec");
			this.cancelNotification();
			return;
		}

		if (rtc_obj == null){
			Log.d(logtag, "rtc null object recieved");
			return ;
		}
		Log.d(logtag, " type:"+type);
		JSONObject jsonObject = null;
		try {
			jsonObject = new JSONObject(recived_obj.getData());
		} catch (Exception e) {
			e.printStackTrace();
			Log.e(logtag, "Json decode error " + e.getMessage() + "\n");
		}

		if (type.equals("offer")) {
		rtc_obj.handleOffer(jsonObject);
		}
		else if (type.equals("candidate")) {
			rtc_obj.onIceCandidateReceived(jsonObject);
		}
		else if (type.equals("answer")) {
			rtc_obj.onAnswerReceived(jsonObject);
		}
		else if (type.equals("disconnected")) { // this is sent from either side
			rtc_obj.close();
		}
		else if(type.equals("notification_response")) { // this is sent from responder side
			rtc_obj.userStatus.setAppStatus("Ringing....");
		}
		else if(type.equals("connection_initiated")) { // this is sent from responder side
			rtc_obj.createOffer();
		}
		else{
			Log.d(logtag, "Unknown type shouldn't be sent");
		}

	}

	private Spannable getActionText(String title, @ColorRes int colorRes) {
		Spannable spannable = new SpannableString(title);
		if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N_MR1) {
			spannable.setSpan(new ForegroundColorSpan(this.getColor(colorRes)), 0, spannable.length(), 0);
		}
		return spannable;
	}

	/**
	 * Create and show a custom notification containing the received FCM message.
	 *
	 * @param remoteMessage FCM notification payload received.
	 */
	private void sendNotification(RemoteMessage remoteMessage) {
		int oneTimeID = (int) SystemClock.uptimeMillis();
		this.notification_id = oneTimeID;
		String channelId = "fcm_call_channel";
		String channelName = "Incoming Call";

		Uri notification_sound = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_RINGTONE);
        String notification_title= remoteMessage.getData().get("title");
		String userId = remoteMessage.getData().get("sender_user_id");
		JSONObject object = new JSONObject();
		try {
			object.put("type", "notification_response");
			Utils.sendData(object, userId);
			Log.d(logtag, "notifying riniging..");
		} catch (JSONException e) {
			e.printStackTrace();
		}

		Intent intent = new Intent(this, CallingScreenActivity.class);// this intent works with action
		intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
		intent.addFlags(Intent.FLAG_ACTIVITY_REORDER_TO_FRONT);
		intent.setAction(Intent.ACTION_VIEW);
		intent.setAction(Intent.ACTION_MAIN);	
		intent.addCategory(Intent.CATEGORY_LAUNCHER);

		PendingIntent pendingIntent = PendingIntent.getActivity(
				this, 0, intent,
				PendingIntent.FLAG_UPDATE_CURRENT
		); // Supply a PendingIntent to send when the notification is clicked.
		// notification action buttons start
		// accept button
		Intent ci_accept_intent = new Intent(this, CallingScreenActivity.class);
		ci_accept_intent.setAction(Intent.ACTION_VIEW);
		ci_accept_intent.putExtra("NOTIFICATION_ID", oneTimeID);
		ci_accept_intent.putExtra("activity", "FireBaseMessageInterceptor");
		ci_accept_intent.putExtra("connectedUserId", userId);		
		ci_accept_intent.putExtra("action", "start");

		// reject button
		Intent ci_reject_intent = new Intent(this, CallingScreenActivity.class);
		ci_reject_intent.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
		ci_reject_intent.putExtra("NOTIFICATION_ID", oneTimeID);
		ci_reject_intent.putExtra("connectedUserId", userId);		
		ci_reject_intent.putExtra("activity", "FireBaseMessageInterceptor");
		ci_reject_intent.putExtra("action", "stop");

		PendingIntent acptIntent = PendingIntent.getActivity(this, 0, ci_accept_intent, PendingIntent.FLAG_UPDATE_CURRENT );
		PendingIntent rjctIntent = PendingIntent.getActivity(this, 0, ci_reject_intent, PendingIntent.FLAG_UPDATE_CURRENT );

		NotificationCompat.Action rejectCall=new NotificationCompat.Action.Builder(R.drawable.rjt_btn,getActionText("Decline",android.R.color.holo_red_light),rjctIntent).build();
		NotificationCompat.Action acceptCall=new NotificationCompat.Action.Builder(R.drawable.acpt_btn,getActionText("Answer",android.R.color.holo_green_light),acptIntent).build();
		//end

	    //when device locked show fullscreen notification start
        Intent i = new Intent(this, LockScreenActivity.class);
        i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
		i.addFlags(Intent.FLAG_ACTIVITY_REORDER_TO_FRONT);
        i.putExtra("APP_STATE",isAppRunning());
        i.putExtra("FALL_BACK",true);
        i.putExtra("NOTIFICATION_ID",oneTimeID);
		i.putExtra("connectedUserId", userId);
        PendingIntent fullScreenIntent = PendingIntent.getActivity(this, 0 /* Request code */, i,
                PendingIntent.FLAG_ONE_SHOT);
        //end
		//Add an action to this notification. Actions are typically displayed by the system as a button adjacent to the notification content.
		//Action buttons won't appear on platforms prior to Android 4.1. Action buttons depend on expanded notifications,
		//which are only available in Android 4.1 and later. To ensure that an action button's functionality is always available,
		//first implement the functionality in the Activity that starts when a user clicks the notification (see setContentIntent()),
		//and then enhance the notification by implementing the same functionality with addAction().


		NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this, channelId)
				.setContentTitle(notification_title)
				.setContentText(channelName)
				.setPriority(NotificationCompat.PRIORITY_HIGH)
				.setCategory(NotificationCompat.CATEGORY_CALL)
				.setAutoCancel(true)
				.setSound(notification_sound)
				.addAction(acceptCall)
				.addAction(rejectCall)
				.setContentIntent(pendingIntent)
				.setDefaults(Notification.DEFAULT_VIBRATE)
				.setFullScreenIntent(fullScreenIntent, true)
				.setSmallIcon(R.mipmap.ic_launcher)
				.setAutoCancel(true);


		NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
		int importance = NotificationManager.IMPORTANCE_HIGH;

		//channel creation start
		if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
			NotificationChannel mChannel = new NotificationChannel(
					channelId, channelName, importance);
			AudioAttributes attributes = new AudioAttributes.Builder()
					.setUsage(AudioAttributes.USAGE_NOTIFICATION)
					.build();
			mChannel.setSound(notification_sound,attributes);
			mChannel.setDescription(channelName);
			mChannel.enableLights(true);
			mChannel.enableVibration(true);
			notificationManager.createNotificationChannel(mChannel);
		}
		//end

		notificationManager.notify(oneTimeID, notificationBuilder.build());
	}

	private boolean isAppRunning() {
		ActivityManager m = (ActivityManager) this.getSystemService( ACTIVITY_SERVICE );
		List<ActivityManager.RunningTaskInfo> runningTaskInfoList =  m.getRunningTasks(10);
		Iterator<ActivityManager.RunningTaskInfo> itr = runningTaskInfoList.iterator();
		int n=0;
		while(itr.hasNext()){
			n++;
			itr.next();
		}
		if(n == 1){ // App is killed
			return false;
		}
		return true; // App is in background or foreground
	}

	public void cancelNotification(){
		Log.d(logtag, "cancelling the notification initiated" );
		Uri incoming_call_notif = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_RINGTONE);
		Ringtone ringtone = RingtoneManager.getRingtone(getApplicationContext(), incoming_call_notif);
		NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
		Log.d(logtag, "cancelling the notification" );
		notificationManager.cancel(this.notification_id);
		ringtone.stop();
	}

}