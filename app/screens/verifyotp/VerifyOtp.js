import { ToastAndroid, Animated, Image, SafeAreaView, Text, View, StatusBar, Dimensions, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../theme/colors';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Heading7, Heading5, ErrorText } from '../../components/text/CustomText';
import Button from '../../components/buttons/Button';
import ApiHandler from '../../utils/apiHandler';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from './styles';
import { saveUserTokenNative } from '../../utils/AndroidBridgeHelper';

const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 4;
const source = {
  uri: 'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png',
};

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const VerifyOtp = ({ navigation }) => {
  const [value, setValue] = useState('');
  const [mobileValidator, setMobileValidator] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const verifyOTP = () => {
    if(value && value.length == 4){
      setMobileValidator(false);
      let handler = ApiHandler.getHandler();
      const payload = {
        otp: value
      }
      handler.post(ApiHandler.path._VERIFY_OTP, payload)
        .then(res => {
          console.log(res)
          if(res.data && res.data.token && res.data.data.is_seeker && res.data.data.is_helper) {
            AsyncStorage.setItem('access_token',JSON.stringify(res.data))
            navigateTo("UserRole");
          }
          else if (res.data && res.data.token) {
            AsyncStorage.setItem('access_token',JSON.stringify(res.data))
            res.data.is_seeker ?? (navigateTo("HomeNavigator") && AsyncStorage.setItem('user_role','seeker'));
            res.data.is_helper ?? (navigateTo("HelperNavigator") && AsyncStorage.setItem('user_role','helper'));
          } else {
            ToastAndroid.show(res.errors[0].msg, ToastAndroid.LONG);
          }
        })
        .catch(err => console.log('error in verifyotp', err))
    } else {
      setMobileValidator(true);
    }

  }

  const navigateTo = screen => {
    navigation.navigate(screen);
  };

  const renderCell = ({ index, symbol, isFocused }) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
          inputRange: [0, 1],
          outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
        })
        : animationsColor[index].interpolate({
          inputRange: [0, 1],
          outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
        }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  return (
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
      <SafeAreaView style={styles.root}>
        <Heading5>Verify it's you!</Heading5>

        <View style={{ marginTop: 30 }}>
          <Heading7>Enter the 4-digit code we have sent to</Heading7>
          <Heading7 style={{ color: '#59CE8F', marginTop: 10, fontWeight: '700' }}>+91 8532877445</Heading7>

        </View>
        {/* <Text style={styles.title}>Verification</Text>
        <Image style={styles.icon} source={source} />
        <Text style={styles.subTitle}>
          Please enter the verification code{'\n'}
          we send to your email address
        </Text> */}

        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={renderCell}
        />

        {mobileValidator && <ErrorText>Enter a valid OTP</ErrorText>}

        <View style={{ marginTop: 50, display: 'flex', flexDirection: 'row' }}>
          <Heading7 style={{ color: '#000000', fontSize: 15, marginLeft: 10 }}>Did not receive code?</Heading7>
          <Heading7 style={{ color: '#B7C4CF', fontSize: 15, marginLeft: 10 }}>Resend</Heading7>
          <Heading7 style={{ color: '#000000', fontSize: 15, fontWeight: '700', marginLeft: 40 }}>00:29 sec</Heading7>

          {/* <Heading7 style={{ color: '#59CE8F', marginTop: 10, fontWeight: '700' }}>+91 8532877445</Heading7> */}

        </View>

        <View style={styles.footer}>

          <View style={styles.center}>

            <View style={[styles.buttonsGroup, { position: 'relative', marginTop: screenHeight / 5 }]}>


              <Button
                buttonStyle={styles.customButton}
                onPress={verifyOTP}
                // onPress={(e) => navigateTo("UserRole")}
                socialIconName={'shield'}
                iconColor={'#ffffff'}
                iconSize={30}
                title={'Verify and Proceed'}
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

          </View>
        </View>


      </SafeAreaView>
    </View>

  );
};

export default VerifyOtp;