import AsyncStorage from "@react-native-async-storage/async-storage";
import { environment } from "../config/environment";
import * as path from '../utils/apiPath';

const buildQueryParams = (url, is_params, page_number, page_size) => {
    if(!is_params){
        return environment.BASE_URL + url
    } else {
        return environment.BASE_URL + url + `?page_number=${page_number}&page_size=${page_size}`
    }
}

export default class ApiHandler {// on logout we need to reset the #user_details
    #user_details;
    ////  a singleton class

    static path = path;
    static _instance; 

    static getHandler(){ // always use this method to access class instance 
        if (!ApiHandler._instance){
            console.log("creating ApiHandler instance");
            ApiHandler._instance = new ApiHandler();
            return ApiHandler._instance;
        }
        return ApiHandler._instance;
    }

    getAsyncData = async () => {
        if(this.#user_details != null){
            return this.#user_details;
        }
        return AsyncStorage.getItem('access_token').then(val=>{
            if (!val) {
                console.log(`no value found set ${val}`)
                return
            }
            val = JSON.parse(val);            
            this.#user_details = {
                "token": val.token,
                "id": val.data.id,
                "is_helper": val.data.is_helper,
                "is_seeker": val.data.is_seeker,
            }
            return this.#user_details;
        }).catch(err => {
            console.log(`error getting local storage data: ${err}`);
        })
    }

    getHeaders = async (is_authorized) =>{   
        let data = await this.getAsyncData();       
        return  {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
                'Credential': 'Aman@333',
                ...is_authorized && {'x-access-token': data.token},
            }        
    }

    async post(url, payload, is_authorized=false) {
        try {
            const response = await fetch(environment.BASE_URL + url, {
                method: 'POST',
                headers: await this.getHeaders(is_authorized),
                body: JSON.stringify(payload),
            })
            if (response.status === 201){
                return "success"
            }
            const json = await response.json();
            console.log("response data", json.data);
            return json;
        } catch (error) {
            console.log(`error in post API handler`, error);
            return error
        }
    };

    async get(url, is_authorized=false, is_params=false, page_number=0, page_size=8) {    
        console.log(buildQueryParams(url, is_params, page_number, page_size));   
        return fetch(buildQueryParams(url, is_params, page_number, page_size), {
            method: "GET",
            headers: await this.getHeaders(is_authorized)
        }).then(
            res => res.json()
        ).then(
            result => {
                return result;
        }).catch(
            error => {
                console.error(`error hitting API ${error}`)
                return error
            }
        )
    }
}