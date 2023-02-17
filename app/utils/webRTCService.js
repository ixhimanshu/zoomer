import { mediaDevices, RTCIceCandidate, RTCPeerConnection, RTCSessionDescription } from 'react-native-webrtc';

export default class webRTCService {

    static _instance;
    yourConn = null;
    opposite_user_id = null;
    self_user_id = null;
    dispatch = null;
    answer_obj = null;
    getState = null;

    static getInstance(dispatch, getState){ // made a single ton class
        console.log("calling webRTCService......", webRTCService._instance);
        if (!webRTCService._instance){
            console.log("recieved dispatch", dispatch);
            let obj = new webRTCService(dispatch, getState);
            webRTCService._instance = obj;
            return obj;
        }
        return webRTCService._instance;
        
    }

    constructor(dispatch, getState){        
        this.self_user_id = '321';        // this will be fetched at the login time
        this.dispatch = dispatch;
        this.getState = getState;
        this.initiateWebRtc();        
    }
                    
    
    received_msg = msg =>{ // received msg from queue                 
        let {webrtc} = msg.data;
        if (!webrtc){
          console.log("not a webrtc packet")
          return
        }
        let json_obj = JSON.parse(webrtc);        
        console.log("json object type..recieved", json_obj.type);
        switch(json_obj.type){
          case 'offer':
            this.handleOffer(json_obj);
    
          case 'candidate':
            this.handleCandidate(json_obj);
    
          case 'answer':
            this.handleAnswer(json_obj)
          
          case "connected":
            this.handleConnected(json_obj);

          case "disconnected":
            this.handleCallDisconnect()
        }

    };
        
    handleConnected = json_obj => {
        if (
          this.getState().inCall
        ){
          console.warning("already in call i avoid")
          return
        }
        const {user_id} = json_obj; // this user id is the id sent as an response of notification that the call has been picked
        this.sendOffer(user_id);
        this.dispatch({
          inCall: true,
          ringing: true
        })
    }

    
    handleOffer = offer_obj =>{

      const {offer, sender_user_id, name } = offer_obj; // here we need to ring the phone up and show the display who is calling
      if (!offer || sender_user_id == this.self_user_id) {
        sender_user_id == this.self_user_id ? console.warn("returning the circlular shit for HandleOffer..."): ""
        return
      };

      this.opposite_user_id = sender_user_id;            
      console.log("Opposite user id set", this.opposite_user_id)
      this.yourConn.setRemoteDescription(new RTCSessionDescription(offer)).then(
        () =>  this.yourConn.createAnswer()
      ).then(answer => {
        console.log("generating answer");
        this.yourConn.setLocalDescription(answer);
        let answer_obj = {
          type: "answer",
          answer: answer,         
        };        
        this.send_msg(answer_obj, sender_user_id);
    
      }).catch(err => {
        console.log("error while sending answer", err); // here we need to raise alarm and send logs 
      });
    }
    
    
    handleAnswer = answer_obj => {  
      const {answer} = answer_obj;      
      if (!answer) return;
      console.log("answer recieved", answer);
      this.yourConn.setRemoteDescription(new RTCSessionDescription(answer));
    }

    
    handleCandidate = candidate_obj =>{
      const {candidate, sender_user_id} = candidate_obj;      
      if (!candidate || sender_user_id == this.self_user_id) {        
        sender_user_id == this.self_user_id ? console.warn("returning the circlular shit for ice candidate ...."): ""
        return
      }
      console.log("recieved candidate", candidate);
      this.yourConn.addIceCandidate(new RTCIceCandidate(candidate)).catch(err=>console.log("fucking ,..", err));      
    }

    
    iceHandller = event => {        
        if (event.candidate) { // here we need to send ice candidate to other user          
          console.log("sending ice candidat from callback ", this.opposite_user_id)
          this.send_msg({
            type: 'candidate',
            candidate: event.candidate,
            sender_user_id: this.self_user_id,
          }, this.opposite_user_id);
        }
    };  


    send_notification = (user_id) =>{
      this.opposite_user_id = user_id; 
      var raw = "";

      var requestOptions = {
        method: 'POST',
        body: raw,
        redirect: 'follow'
      };

      fetch(`http://192.168.1.20:8080/api/sendNotification/${user_id}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.error('error', error));
    }

    send_msg = (msg, user_id) =>{
      if (msg && user_id){        
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify(msg);

        let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch(`http://192.168.1.20:8080/api/webRtcHandshake/${user_id}`, requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));        
          }
        };

    registerPeerEvents = () => { // registering events for stream
        console.log("registering peer events", this.yourConn);
        this.yourConn.onaddstream = (event) => {                        
            console.log("remote sttram------->---->", event.stream);
            this.dispatch({
              remoteStream: null
            });
        };
    
        
        this.yourConn.onicecandidate =  this.iceHandller
        
        this.yourConn.onicecandidateerror = (e=>{
          console.error("error occured mother fucker", e);
        })

        this.oniceconnectionstatechange = ()=>{
          if (this.yourConn.iceConnectionState == 'disconnected'){
            console.log('Disconnected');
          }
        }
    };


    sendOffer = (user_id) =>{     // call intitation handshaking        
        this.yourConn.createOffer().then(offer => {
            this.yourConn.setLocalDescription(offer).then(()=>{
              console.log("sending offer ");
              let send_obj = {
                type: "offer",
                offer: offer,
                sender_user_id: this.self_user_id,
                name: "calling user name "
              };
              this.send_msg(send_obj, user_id)
            });
        })
    }    

    handleCallDisconnect = () => {        
        this.yourConn.close();  
        this.dispatch({
          inCall: false,
          ringing: false,          
          remoteStream: null          
        });        
        this.opposite_user_id = null;
        webRTCService._instance = null;
    }

    
    initiateMediaDevice = () => {
      mediaDevices.enumerateDevices().then(() => {
        mediaDevices.getUserMedia({
          audio: true,
        }).then(stream => {          
          this.yourConn.addStream(stream);         
          this.registerPeerEvents();
        }).catch(err => {
          console.error("error can not get the stream bitches", err)
        })
      });      
    }

    initiateWebRtc = () => {  // this is need to be called first always
        console.log("initiating webrtc");
        const configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};

        this.yourConn = new RTCPeerConnection(configuration)
        this.initiateMediaDevice()
    };
            
}


