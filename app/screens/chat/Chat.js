import { GiftedChat } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import init from 'react_native_mqtt';
import React, { useEffect, useState } from 'react';
import Message from './LoofMessage';
import emojiUtils from 'emoji-utils'
import ApiHandler from '../../utils/apiHandler';
import { chat_config, mqtt_config } from '../../config/environment';
import { useSelector, useDispatch } from 'react-redux';

const FETCH_CHAT_PAYLOAD = 'fetch-chat'
const DEFAULT_QOS = 0

init({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    sync : {}
  });
const options = {
    host: mqtt_config.MQTT_HOST,
    port: mqtt_config.MQTT_PORT,
    path: '',
    id: 'id_' + parseInt(Math.random()*100000),
    username: mqtt_config.MQTT_USER,
    password: mqtt_config.MQTT_PASSWORD
};

const client = new Paho.MQTT.Client(options.host, options.port, options.path);

const Chat = () =>{ // here the chat screen should have the helper mobile to which the user wants to talk to    
    const id = useSelector((store) => store.id.chatId);
    const full_name = useSelector((store) => store.id.chatUserName);

    const [messages, setMessages] = useState([]);    
    const [connectionState, setConnectionState] = useState({
        topic: '',
        subscribedTopic: '',
    });

    const [status, setStatus] = useState("");
    const [name, setFullName] = useState("Anonymous");

    const handler = ApiHandler.getHandler();

    const fetchChats = () =>{                
        handler.get(
            `${ApiHandler.path._CHAT}/${id}?page_size=${chat_config.DEFAULT_INITIAL_CHAT_FETCH_SIZE}&page_number=${chat_config.DEFAULT_INITIAL_CHAT_PAGE_NUMBER}`,
            true
        )
        .then(res => {
            console.log(`chat response `, res);
            if (res && res.msg == "SUCCESS"){
                setMessages(res.data.messages);
            }
        }).catch(
            err=> console.error('fetchChats error', err)
        );
    }

    const postChat = msg =>{
        handler.getAsyncData().then(res =>{            
            let chatData = {
                users: [parseInt(res.id), parseInt(id)],
                message: msg[0]
            }
            console.log("chat Data", chatData);
            handler.post(
            ApiHandler.path._CHAT,
                chatData,
                true
            ).then(val => {
                console.log("post chat API response", val);
                client.send(id, FETCH_CHAT_PAYLOAD, DEFAULT_QOS)
            }
            ).catch(err => console.error("post chat API error", err))
        }).catch(
            err => console.error("postChat->ApiHandler error", err)
        );        
    }

    const onConnect = () =>{
        console.log('on connected called');
        subscribeTopic();
        setStatus("connected")
    }

    const onFailure = err =>{
        console.log("Connection failed");
        console.log(err)
        setStatus("failed");
    }

    const onConnectionLost = responseObject => {
        if (responseObject.errorCode !== 0) {            
            console.log('onConnectionLost:' + responseObject.errorMessage);
        }
    }

    const subscribeTopic = async() => {
        let data = await handler.getAsyncData();
        console.log("connect mqtt ", data);
        setConnectionState({            
            subscribedTopic: data.id,
            topic: id
        })
        client.subscribe(`${data.id}`, { qos: DEFAULT_QOS })
    }

    const connect = async () =>{
        setStatus("fetching");
        client.connect({
            onSuccess: onConnect,
            useSSL: false,
            timeout: 3,
            onFailure: onFailure,
            userName: options.username,
            password: options.password
        })
    }

    const onMessageArrived = (message )=> {
        console.log('onMessageArrived:' + message.payloadString);
        fetchChats();        
    }

    const disconnect = () => { 
        console.log("disconnect called");
        if (status == "connected"){
            client.unsubscribe(connectionState.subscribedTopic);
            client.disconnect();    
        }
        setStatus("disconnected");
    }

    useEffect(()=>{
        // handler.getAsyncData().then(data => {
        //     console.log("getAsyncData", data)
        //     if (data.is_helper){
        //         console.log("setting helper name");
        //         setFullName(full_name)
        //     }
        // }).catch(error => console.log("error", error));
        AsyncStorage.getItem('user_role', (err, result) => {
            console.log(result)
            if (result == 'helper'){
                setFullName(full_name)
            }
          });
        fetchChats();
        status != 'connected' ? connect().catch(err=> console.log("connection error mqtt", err)) : "";
        client.onConnectionLost = onConnectionLost;
        client.onMessageArrived = onMessageArrived;
        return ()=>{
            disconnect();
        }
    }, [])


    const onSend = (newMessages = []) => {        
        postChat(newMessages);
        setMessages(
            GiftedChat.append(messages, newMessages)
        )
      }

    const renderMessage = (props) =>{
        const {
          currentMessage: { text: currText },
        } = props
    
        let messageTextStyle
    
        // Make "pure emoji" messages much bigger than plain text.
        if (currText && emojiUtils.isPureEmojiString(currText)) {
          messageTextStyle = {
            fontSize: 28,
            // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
            lineHeight: Platform.OS === 'android' ? 34 : 30,
          }
        }
    
        return <Message {...props} messageTextStyle={messageTextStyle} />
    }
    console.log("mqtt connectionState", status);
    return(
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                name: `${name}`,
            }}
            renderMessage={renderMessage}
        />        
    );

};


  
export default Chat;