import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, FlatList } from "react-native";
import CustomTheme from '../../styles/CustomTheme';
import Colors from '../../theme/colors';
import Navbar from '../../components/navbar/Navbar';
import VariableStyle from '../../styles/VariableStyle'
import Button from '../../components/buttons/Button';
import OutlinedButton from '../../components/buttons/OutlinedButton';

import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';
// import RNUpiPayment from 'react-native-upi-payment';

const ImagePath = require("../../assets/img/angryimg.png");
const Call = require("../../assets/img/call2.jpg");

// SignIn Config
const PLACEHOLDER_TEXT_COLOR = Colors.black;
const INPUT_TEXT_COLOR = Colors.black;
const INPUT_BORDER_COLOR = Colors.black;
const INPUT_FOCUSED_BORDER_COLOR = Colors.black;



const styleSheet = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // borderColor: CustomTheme.black,
        // position: 'relative'
    },
    backContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    subContainer: {
        display: 'flex'
    },
    badge: {
        margin: 8,
        alignItems: 'center'
    },
    badgeText: {
        fontSize: 15,
        color: VariableStyle.black,
        backgroundColor: VariableStyle.grey,
        borderRadius: 20,
        padding: 10
    },
    mainWrapper: {
        margin: 15
    },
    amountWrapper: {

    },
    inputContainer: { marginBottom: 7 },
    ...CustomTheme
})



const Wallet = ({ history, navigation }) => {

    const currencyPreset = [
        {
            lable: '₹ 10/-',
            value: 10
        },
        {
            lable: '₹ 49/-',
            value: 20
        },
        {
            lable: '₹ 99/-',
            value: 10
        },
        {
            lable: '₹ 199/-',
            value: 10
        },
        {
            lable: '₹ 499/-',
            value: 10
        },
        {
            lable: '₹ 999/-',
            value: 10
        },
        {
            lable: '₹ 1,499/-',
            value: 10
        }
    ]
    const onButtonPress = () => {
    }

    const initPayments = () => {
        // RNUpiPayment.initializePayment({
        //   // vpa: '9711214404@paytm',
        //   vpa: '8630237600@ybl',
        //   payeeName: 'Anurah Singh',
        //   amount: '1',
        //   transactionRef: 'aasf-769-aoei-fn-atdryv6234'
        // }, successCallback, failureCallback);
    }

    function successCallback(data) {
        console.log('success', data);
    }

    function failureCallback(data) {
        console.log('failture', data);
    }


    return (
        <>
            <View style={styleSheet.mainContainer}>
                <Navbar />

                <View style={styleSheet.mainWrapper}>
                    <FlatList
                        style={styleSheet.subContainer}
                        numColumns={4}
                        data={currencyPreset}
                        renderItem={({ item }) => (
                            <View style={styleSheet.badge}>
                                <Text style={styleSheet.badgeText}> {item.lable} </Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />

                    <View style={[styleSheet.amountWrapper, styleSheet.mt4]}>
                        <Text style={[styleSheet.semiBoldText, styleSheet.fontM, styleSheet.mb1]}>Recharge Details</Text>
                        <View
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                        />
                        <View style={[styleSheet.flexbox, styleSheet.m2]}>
                            <Text style={[styleSheet.fontM, styleSheet.semiBoldText]} >Amount payable</Text>
                            <Text style={[styleSheet.fontM, styleSheet.semiBoldText]}>₹ 420/-</Text>
                        </View>
                    </View>

                    <View style={[styleSheet.mt4]}>
                        <UnderlineTextInput
                            // onRef={r => {
                            //     this.email = r;
                            // }}
                            // onChangeText={this.emailChange}
                            // onFocus={this.emailFocus}
                            // inputFocused={emailFocused}
                            // onSubmitEditing={this.focusOn(this.password)}
                            returnKeyType="next"
                            blurOnSubmit={false}
                            placeholder="Enter coupan code"
                            placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                            inputTextColor={INPUT_TEXT_COLOR}
                            borderColor={INPUT_BORDER_COLOR}
                            focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                            inputContainerStyle={[styleSheet.inputContainer, styleSheet.mb2]}
                        />
                        <OutlinedButton titleColor='#fff' color='#2C3333' onPress={onButtonPress} title={'Apply Coupon'} />


                    </View>

                    <View style={{ marginTop: 50 }}><Button  color='#2C3333' onPress={onButtonPress} title={'Pay Now'} /></View>


                </View>




                {/* <View style={{ position: 'absolute', bottom: 50, right: 20, alignSelf: 'flex-end' }}>
                    <Button varient={'fixedR'} onPress={() => initPayments()} title={'Recharge'} />
                </View> */}

            </View>
        </>
    )

}


export default Wallet;