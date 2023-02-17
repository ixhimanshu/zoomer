import React, { useState, useRef } from 'react';
import { StatusBar, StyleSheet, View, TouchableWithoutFeedback, Text, Image, ToastAndroid } from 'react-native';
import PhoneInput from "react-native-phone-number-input";
import { Dimensions } from 'react-native';
import {
  SafeAreaView,
} from "react-native";
// import components
import Button from '../../components/buttons/Button';
import { Heading7, Heading5, ErrorText } from '../../components/text/CustomText';
import ApiHandler from '../../utils/apiHandler';

// import colors, layout
import Colors from '../../theme/colors';

const { width: screenWidth } = Dimensions.get('window')

// Welcome Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.7,
  },
  headerText: {
    fontWeight: '700',
    color: Colors.white,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5
  },
  footer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -60,
    borderRadius: 52,
    width: 104,
    height: 104,
    backgroundColor: Colors.white,
  },
  center: {
    alignItems: 'center',
  },
  buttonsGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  customButton: {
    width: '90%',
    borderRadius: 10,
    marginTop: 10
  },
  hspace16: {
    width: 16,
  },
  linkButtonText: {
    color: Colors.onSurface,
  },
  termsContainer: {
    flexDirection: 'row',
  },
  footerText: {
    fontWeight: '400',
    fontSize: 13,
    color: Colors.primaryColor,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  footerLink: {
    fontWeight: '400'
  },
  referral: {
    position: 'absolute',
    right: 2,
    top: -18,
    fontWeight: '500',
    // backgroundColor: '#000',
    // width: '90%'
    color: '#1CD6CE'
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  inputPhone: {
    margin: 10,
    padding: 0,
    fontSize: 16,
    height: 60
  },
  inputPhoneContainer: {
    margin: 0,
    padding: 0,
    height: 60

  },
  logoWrapper: {
    width: screenWidth / 2,
    height: 40,
    margin: 20
  },
  logo: {
    height: 40,
    width: 'auto',
    resizeMode: 'contain',

  }
});

// Welcome
const SignIn = ({ navigation }) => {

  const [value, setValue] = useState("");
  const [mobileValidator, setMobileValidator] = useState(false);
  const phoneInput = useRef(null);

  const navigateTo = screen => {
    navigation.navigate(screen);
  };

  const sendOTP = () => {
    if (value.length != 10) {
      setMobileValidator(true)
    } else {
      const payload = {
        mobile: value,
        country_code: '+91',
      }
      let handler = ApiHandler.getHandler();
      handler.post(ApiHandler.path._SEND_OTP, payload)
        .then(res => {
          console.log(res);
          if (res.data) {
            ToastAndroid.show(res.data, ToastAndroid.LONG);
            navigateTo("VerifyOtp");
          } else {
            ToastAndroid.show(res.errors[0].msg, ToastAndroid.LONG);
          }
        }).catch(
          err => console.log("error in sendOTP", err)
        )
    }
  }

  const onChangePhone = (text) => {
    setValue(text);
    if(text.length == 10){
      setMobileValidator(false)
    } else {
      setMobileValidator(true)
    }
  }


  return <>
    <View style={styles.screenContainer}>
      <StatusBar
        backgroundColor={Colors.primaryColor}
        barStyle="light-content"
      />


      <View style={[styles.logoWrapper]}>
        <Image
          style={[styles.logo]}
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/tucktools-6b33f.appspot.com/o/LOOF%2FScreenshot%20-%202022-09-15T170645.725.png?alt=media&token=20ade9d9-eba5-4cd1-9f09-e71b4dff7a06' }}
        />
      </View>
      <View style={{ margin: 30 }}>

        <Text>
          <Heading5>Welcome to Loof</Heading5>
        </Text>

        <View style={{ marginTop: 30 }}>
          <Heading7>Please enter your number</Heading7>
        </View>

        <View>
          <SafeAreaView>
            <View style={{ marginTop: 40 }}>
              <PhoneInput
                ref={phoneInput}
                defaultValue={'853287744'}
                defaultCode="IN"
                layout="second"
                textInputStyle={[styles.inputPhone]}
                disabled={false}
                withDarkTheme={true}
                containerStyle={[styles.inputPhoneContainer]}
                onChangeText={(text) => {
                  onChangePhone(text)
                }}
                // onChangeFormattedText={(text) => {
                //   setFormattedValue(text);
                // }}
                withShadow
                autoFocus
              />
              {mobileValidator && <ErrorText>Enter a valid mobile number</ErrorText>}

            </View>

            {/* To check number validity */}
            {/* <TouchableOpacity
              style={styles.button}
              onPress={() => {
                const checkValid = phoneInput.current?.isValidNumber(value);
                setShowMessage(true);
                setValid(checkValid ? checkValid : false);
              }}
            >
              <Text>Check</Text>
            </TouchableOpacity> */}
          </SafeAreaView>
        </View>

      </View>


      <View style={styles.footer}>
        <View style={styles.center}>
          <View style={[styles.buttonsGroup, { position: 'relative', marginTop: 250 }]}>

            <Button
              buttonStyle={styles.customButton}
              onPress={sendOTP}
              // onPress={(e) => navigateTo("VerifyOtp")}
              socialIconName={'shield'}
              iconColor={'#ffffff'}
              iconSize={30}
              title={'Proceed Securely'}
              color={'#16213E'}
            />

          </View>
          <View style={[styles.buttonsGroup]}>
            <TouchableWithoutFeedback
              onPress={(e) => navigateTo("TermsConditions")}
            >
              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  By clicking, I accept the Terms
                  <Text style={[styles.footerText, styles.footerLink]}>

                  </Text>
                  <Text style={styles.footerText}> and </Text>
                  <Text style={[styles.footerText, styles.footerLink]}>
                    Privacy Policy
                  </Text>
                  <Text style={styles.footerText}>.</Text>
                </Text>

              </View>
            </TouchableWithoutFeedback>

          </View>


          {/* <LinkButton
            onPress={this.navigateTo('HomeNavigator')}
            title="Skip"
            titleStyle={styles.linkButtonText}
          /> */}
        </View>
      </View>
    </View>
  </>

}

export default SignIn;