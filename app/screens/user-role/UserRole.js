import React, { useState, useRef } from 'react';
import { StatusBar, StyleSheet, View, TouchableWithoutFeedback, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhoneInput from "react-native-phone-number-input";
import { Dimensions } from 'react-native';
import {
    SafeAreaView,
} from "react-native";
// import components
import Button from '../../components/buttons/Button';
import { Heading7, Heading5 } from '../../components/text/CustomText';

// import colors, layout
import Colors from '../../theme/colors';

const { width: screenWidth } = Dimensions.get('window')

// Welcome Styles
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
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
const UserRole = ({ navigation }) => {

    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);

    const navigateTo = screen => {
        screen == 'HelperNavigator' && AsyncStorage.setItem('user_role','helper');
        screen == 'HomeNavigator' && AsyncStorage.setItem('user_role','seeker');
        navigation.navigate(screen);
    };


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
                    {/* <Heading7>Please enter your number</Heading7> */}
                </View>

                <View>
                    <SafeAreaView>


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

                    <View style={[styles.buttonsGroup, { position: 'relative', marginTop: 200 }]}>
                        <Button
                            buttonStyle={styles.customButton}
                            onPress={(e) => navigateTo("HelperNavigator")}
                            socialIconName={'handshake-o'}
                            iconColor={'#ffffff'}
                            iconSize={30}
                            title={'Login as Helper'}
                            color={'#16213E'}
                        />
                    </View>
                    <View style={[styles.buttonsGroup, { position: 'relative', marginTop: 25 }]}>
                        <Button
                            buttonStyle={styles.customButton}
                            onPress={(e) => navigateTo("HomeNavigator")}
                            socialIconName={'github-alt'}
                            iconColor={'#ffffff'}
                            iconSize={30}
                            title={'Login as Seeker'}
                            color={'#16213E'}
                        />
                    </View>
                   
                </View>
            </View>
        </View>
    </>

}

export default UserRole;