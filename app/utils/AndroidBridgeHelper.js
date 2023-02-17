import {NativeModules} from 'react-native';
const CallingScreenModule = NativeModules.CallingScreenModule;
const SharedPreferenceModule = NativeModules.SharedPreferenceModule;

export const openCallScreenModule = (userIdRef) => {
  CallingScreenModule.navigateToAndroidNativeActivity(userIdRef);
};

export const saveUserTokenNative = (token) => {
  SharedPreferenceModule.setUserToken(token);
}