
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/buttons/Button";
import { StyleSheet, View } from "react-native";
import React, { useEffect, useReducer, useRef, useState } from 'react';
import Colors from '../../theme/colors';


// import {        
//     RTCView,
//   } from 'react-native-webrtc';
import { Text } from "../../components/text/CustomText";
import { TextInput } from "react-native-gesture-handler";
// import webRTCService from "../../utils/webRTCService";
import { openCallScreenModule } from "../../utils/AndroidBridgeHelper";




/////////////////  component //////////////////////////////////////////////////////
const styleSheet = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    buttonsGroup: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
    },  
    customButton: {
      width: '90%',
      borderRadius: 50
    },
    videoContainer: {
      flex: 1,
    },
    videos: {
        width: '100%',
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 10,
    },
    localVideos: {
        height: 100,
        marginBottom: 10,        
    },
    remoteVideos: {
        height: 400,
    },
    localVideo: {
        backgroundColor: '#f2f2f2',
        height: '80%',
        width: '100%',        
    },
    remoteVideo: {
        backgroundColor: '#f2f2f2',
        height: '80%',
        width: '100%',    
      },
    inputContainer: {
      width: '100%',
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.12)',
      borderRadius: 4,
      marginBottom: 40
    },
    textInput: {
      height: 48,
      textAlign: 'center',
    }  
});





const Calling = ({
            userId= "123",
            name= "gyanender"
        }) => {

    const reducer = (state, action) => ({ ...state, ...action});

    const initialState = {
      ready: false,
      number: '',
      ringing: false,
      inCall: false,
      held: false,      
      error: null,
      remoteStream: null,
    };
              
    const [ state, dispatch ] = useReducer(reducer, initialState);    
    const { remoteStream } = state;
    const [userIdRef, setUserIdRef] = useState();
          

    const getState = () => {
      // this function is made because non react component can not get the updated state from react component has to binding with a function
      return state;
    }

    const handleCall = async (e) =>{       
      console.log("user_id-===->", userIdRef);      
      // let instance = webRTCService.getInstance();      
      // instance.send_notification(userIdRef);
      openCallScreenModule(userIdRef.toString());
    };

    const handleDisconnect = async ()=>{
      // let instance = webRTCService.getInstance()
      // await instance.handleCallDisconnect()      
    }

    // useEffect(() =>{
    //   let instance = webRTCService.getInstance(dispatch, getState);
    //   const unsubscribe = messaging().onMessage(async remoteMessage => {
    //     console.log("this is the recieved msg", remoteMessage);
    //     instance.received_msg(remoteMessage)
    //   });
    //   return unsubscribe;
    // }, [])


    
    console.log("remote stream", remoteStream);
    return(      
        <SafeAreaView style={styleSheet.screenContainer} forceInset={{top: 'never'}}>
            { 
                remoteStream &&
                <View style={styleSheet.videoContainer}>
                    <View style={[styleSheet.videos, styleSheet.remoteVideos]}>
                        <Text>Friends Video</Text>                        
                    </View>                    
                </View>
            }
            <View>

                <View style={styleSheet.inputContainer}>
                  <TextInput
                      autoCapitalize="none"
                      mode="outlined"
                      style={styleSheet.textInput}
                      defaultValue=""
                      placeholder="Type the friend id to call in"                      
                      onChangeText={text=>setUserIdRef(text)}
                  />
                </View>

                <View style={styleSheet.buttonsGroup}>

                  <Button 
                    title="call me bitch" 
                    onPress={handleCall} 
                    buttonStyle={styleSheet.customButton} 
                    disabled={userIdRef ? false: true}
                  />

                </View>


                <View style={styleSheet.buttonsGroup}>
                  <Button 
                    title="Disconnect" 
                    onPress={handleDisconnect} 
                    buttonStyle={styleSheet.customButton}                     
                  />

                </View>

            </View>        
        </SafeAreaView>
    )

}


export default Calling;