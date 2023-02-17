package com.loofreactapp;

import android.app.Activity;
import android.content.Context;
import android.util.Log;

import com.loofreactapp.data.UserStatus;

import org.json.JSONException;
import org.json.JSONObject;
import org.webrtc.AudioSource;
import org.webrtc.AudioTrack;
import org.webrtc.IceCandidate;
import org.webrtc.MediaConstraints;
import org.webrtc.MediaStream;
import org.webrtc.PeerConnection;
import org.webrtc.PeerConnectionFactory;
import org.webrtc.SessionDescription;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Nullable;

public class RTConnection {    
    public static  RTConnection rtConnection;
    private Context context;
    public boolean isConnectionInitiated =false;
    public boolean isConnected;
    public UserStatus userStatus;
    public String connectedUserId;
    private PeerConnectionFactory peerConnectionFactory;
    private PeerConnection peerConnection;
    MediaConstraints audioConstraints;
    AudioSource audioSource;
    AudioTrack localAudioTrack;
    MediaConstraints sdpConstraints;
    static String logtag = "LoofReactApp:RTCConnection";
    public RTConnection(Context c) {
        context = c;
    }

    @Nullable
    public static synchronized RTConnection getInstance(Context context) {

        if (rtConnection == null && context != null) {
            rtConnection = new RTConnection(context);
        }
        return rtConnection;
    }

    public void initialize(UserStatus status){
        Log.d(logtag, "RTC connection initialized");
        this.userStatus = status;
        PeerConnectionFactory.InitializationOptions initializationOptions = PeerConnectionFactory.InitializationOptions.builder(
            context
        ).createInitializationOptions();

        PeerConnectionFactory.initialize(initializationOptions);

        PeerConnectionFactory.Options options = new PeerConnectionFactory.Options();
        peerConnectionFactory = PeerConnectionFactory.builder().setOptions(options)
                .createPeerConnectionFactory();


        List<PeerConnection.IceServer> iceServers = new ArrayList<>();
        iceServers.add(PeerConnection.IceServer.builder("stun:stun.l.google.com:19302").createIceServer());
        PeerConnection.RTCConfiguration rtcConfig =
                new PeerConnection.RTCConfiguration(iceServers);

        this.setAudioStream();

        peerConnection = peerConnectionFactory.createPeerConnection(rtcConfig, new CustomPeerConnectionObserver("localPeerCreation") {

            @Override
            public void onIceCandidate(IceCandidate iceCandidate) {
                Log.d(logtag, "recieved icecandidate local");
                super.onIceCandidate(iceCandidate);
                emitIceCandidate(iceCandidate);
            }

            @Override
            public void onAddStream(MediaStream mediaStream) {
                super.onAddStream(mediaStream);
                Log.d(logtag, "recieved audio stream successfully");
            }



            @Override
            public void onIceConnectionChange(PeerConnection.IceConnectionState iceConnectionState) {
                super.onIceConnectionChange(iceConnectionState);
                if(iceConnectionState != null){
                    //DataPacks.RTCIceStateChange rtcIceStateChange = new DataPacks.RTCIceStateChange();
                    if(iceConnectionState == PeerConnection.IceConnectionState.CONNECTED){
                        Log.d(logtag, " connection established successfully");
                        isConnected = true;
                        userStatus.setAppStatus("00:01");

                        //EventBus.getDefault().post(rtcIceStateChange);
                    }
                    if(iceConnectionState == PeerConnection.IceConnectionState.CLOSED){
                        Log.d(logtag, " connection closed successfully");
                        isConnected = false;
                        //Session.getInstance().setBackgroundCloseStatus(true);
                        //rtcIceStateChange.isClose = true;
                        //EventBus.getDefault().post(rtcIceStateChange);
                    }
                    if(iceConnectionState == PeerConnection.IceConnectionState.FAILED){
                        Log.e(logtag, " connection  Failed!!");                        
                        //Session.getInstance().setBackgroundCloseStatus(true);
                        //rtcIceStateChange.isClose = true;
                        //EventBus.getDefault().post(rtcIceStateChange);
                    }
                }
            }
        });

        if(peerConnection == null){
            Log.d(logtag, "Unable to set peerconnection on intialization");
            return;
        }
        this.addStreamToLocalPeer();
    }

    public int sendNotification(String userId){
        if (userId == null){
            Log.d(logtag, " userId null sendNotification returning..");
            return 500;
        }
        this.connectedUserId = userId;
        this.isConnectionInitiated = true;
        return this.generateNotification();
    }

    public void createOffer(){
        if(peerConnection == null){
            Log.d(logtag, "Peer connection is null can't create offer ");
            return;
        }
        sdpConstraints = new MediaConstraints();
        sdpConstraints.mandatory.add(
                new MediaConstraints.KeyValuePair("OfferToReceiveAudio", "true"));

        peerConnection.createOffer(new CustomSdpObserver("localCreateOffer"){

            @Override
            public void onCreateSuccess(SessionDescription sessionDescription) {
                super.onCreateSuccess(sessionDescription);
                peerConnection.setLocalDescription(new CustomSdpObserver("localSetLocalDesc"), sessionDescription);                
                // next we need to send this offer object to firebase or signalling server
                Log.d(logtag, "sending session data for createOffer");
                sendSessionData(sessionDescription);
            }

            @Override
            public void onCreateFailure(String s) {
                super.onCreateFailure(s);

            }
        }, sdpConstraints);
    }

    public void handleOffer(final JSONObject data){
        Log.d(logtag, "offer recieved ");
        if(peerConnection == null){
            return;
        }
        if(this.isConnectionInitiated){
            Log.d(logtag, "peer connection already there ");
            return;
        }
        this.isConnectionInitiated = true;
        Log.d(logtag, "check to see if connectedUserId is set:" +this.connectedUserId);
        try {
            String connectedUserId = data.getString("userId");
            if (connectedUserId == null){
                Log.d(logtag, " no connected user found");
                return;
            }            
            peerConnection.setRemoteDescription(
                    new CustomSdpObserver("localSetRemote"),
                    new SessionDescription(
                            SessionDescription.Type.OFFER,
                            data.getString("sdp")
                    )
            );
            peerConnection.createAnswer(new CustomSdpObserver("localCreateAns"){
                @Override
                public void onCreateSuccess(SessionDescription sessionDescription) {
                    super.onCreateSuccess(sessionDescription);
                    peerConnection.setLocalDescription(new CustomSdpObserver("localSetLocal"), sessionDescription);
                    // send answer to through firebase
                    Log.d(logtag, "sending session data for handleOffer");
                    sendSessionData(sessionDescription);
                }
            }, new MediaConstraints());
        } catch (JSONException e) {
            Log.e(logtag, "json exception occured");
            e.printStackTrace();
        }
    }

    public void onIceCandidateReceived(JSONObject data){
        if(peerConnection == null || data == null){            
            Log.d(logtag, "peerConnection or data is null");
            Log.d(logtag, "peerconnection: "+ peerConnection);
            return;
        }

        try {
            peerConnection.addIceCandidate(
                    new IceCandidate(
                            data.getString("id"),
                            Integer.parseInt(data.getString("label")),
                            data.getString("candidate")
                    )
            );
        } catch (JSONException e) {
            Log.e(logtag, "json exception onIceCandidateReceived "+e.getMessage());
            e.printStackTrace();
        }
    }

    public void onAnswerReceived(JSONObject data) {
        try {
            peerConnection.setRemoteDescription(
                    new CustomSdpObserver("localSetRemote"),
                    new SessionDescription(
                            SessionDescription.Type.fromCanonicalForm(data.getString("type").toLowerCase()),
                            data.getString("sdp")
                    )
            );
        } catch (JSONException e) {
            e.printStackTrace();
            Log.e(logtag, "exception on answer recieved" +  e.getMessage()+ "\n" + e.toString());
        }
    }

    public void close(){
        Log.d(logtag, "clossing connection");
        if (this.audioConstraints != null) {
            this.audioConstraints = null;
        }
        if(this.audioSource != null){
            this.audioSource.dispose();
        }
        if (this.peerConnection != null){
            this.peerConnection.close();
            this.peerConnection.dispose();
            this.peerConnection = null;
        }        
        audioSource = null;
        localAudioTrack = null;
        audioConstraints = null;        
        this.connectedUserId = null;
        this.isConnectionInitiated = false;
        this.isConnected = false;
        this.userStatus.setAppStatus("");
        rtConnection = null;
        ((Activity)(this.context)).finish();
    }

    private void setAudioStream() {
        audioConstraints = new MediaConstraints();
        audioSource = peerConnectionFactory.createAudioSource(audioConstraints);
        localAudioTrack = peerConnectionFactory.createAudioTrack("101", audioSource);
    }

    private  void addStreamToLocalPeer(){
        MediaStream stream = peerConnectionFactory.createLocalMediaStream("102");
        stream.addTrack(localAudioTrack);
        peerConnection.addStream(stream);
    }

    public void sendSessionData(SessionDescription message){
        try{
            Log.d(logtag,"SignallingClient" + " emitMessage() called with: message = [" + message + "]");
            JSONObject obj = new JSONObject();
            obj.put("type", message.type.canonicalForm());
            obj.put("sdp", message.description);
            obj.put("userId", this.connectedUserId);
            Log.d(logtag, "sending session data");
            Utils.sendData(obj, this.connectedUserId);
        }
        catch (JSONException e){
            Log.e(logtag, "JSONException" + e.getMessage());
            e.printStackTrace();
        }
    }

    public void emitIceCandidate(IceCandidate iceCandidate) {
        try {
            JSONObject object = new JSONObject();
            object.put("type", "candidate");
            object.put("label", Integer.toString(iceCandidate.sdpMLineIndex));
            object.put("id", iceCandidate.sdpMid);
            object.put("candidate", iceCandidate.sdp);            
            Log.d(logtag, "sending icecandidate data");
            Utils.sendData(object, this.connectedUserId);
        } catch (Exception e) {
            Log.e(logtag, "emitIceCandidate" + e.getMessage());
            e.printStackTrace();
        }
    }

    private int generateNotification(){
        String endpoint = Utils.BaseUrl + "/send-notification/";
        Log.d(logtag, "Usertoken is-->"+ Utils.getUserToken());
        String user_id = this.connectedUserId;        
        try {
            JSONObject object = new JSONObject();
            object.put("sender_user_id", Utils.selfUserId);
            URL loofBackendUrl = new URL(endpoint+user_id);
            Log.d(logtag, "connection url: "+endpoint+user_id);
            HttpURLConnection urlConnection = (HttpURLConnection) loofBackendUrl.openConnection();
            urlConnection.setRequestMethod("POST");
            urlConnection.setRequestProperty("Content-Type", "application/json;charset=UTF-8");
            urlConnection.setRequestProperty("Accept","application/json");
            urlConnection.setRequestProperty("x-access-token", Utils.getUserToken());
            OutputStream os = urlConnection.getOutputStream();
            os.write(object.toString().getBytes(StandardCharsets.UTF_8));
            os.flush();
            if (urlConnection.getResponseCode() != HttpURLConnection.HTTP_OK) {
                throw new RuntimeException("Failed : HTTP error code : "
                        + urlConnection.getResponseCode());
            }
            urlConnection.disconnect();
            return 200;
        } catch (Exception e) {
            e.printStackTrace();
            Log.e(logtag, " error generateNotification " + e.getMessage());
            return 500;
        }
    }
}