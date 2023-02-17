import React, { useState } from 'react';
import { useColorScheme, SafeAreaView, Text, StyleSheet, Dimensions, View, Image } from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorsDefault from '../../theme/colors';
import * as RootNavigation from '../../navigation/RootNavigation';
const { width: screenWidth } = Dimensions.get('window')


const styleSheet = StyleSheet.create({
    helperBox: {
        width: Dimensions.get('window').width,
        height: 50,
        display: "flex",
        // padding: 8,
        paddingTop:25,
        paddingBottom:7,
        paddingLeft:15,
        paddingRight:10,
        justifyContent: "space-between",
        borderRadius: 0,
        flexDirection: "row",
        alignItems: "flex-end",
        flexDirection: "row",
        backgroundColor: ColorsDefault.primaryColor,
        marginBottom: 8,
        // borderWidth: 1,
        // borderColor: "#fff",
        // borderRadius: 10,
    },
    logoWrapper: {
        width: screenWidth / 2.8,
    },
    logo: {
        height: 35,
        width: 'auto',
        resizeMode: 'contain',
    },
    walletInfoWrap:{
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: "flex-start",
        justifyContent: "flex-start",
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 10,
        padding: 5,
        height: 30
    }
})


const Navbar = ({ navigation }) => {
    // console.log(navigation);
    const isDarkMode = useColorScheme() === 'dark';
    const logo = 'https://firebasestorage.googleapis.com/v0/b/tucktools-6b33f.appspot.com/o/LOOF%2FScreenshot%20-%202022-09-15T170645.725.png?alt=media&token=20ade9d9-eba5-4cd1-9f09-e71b4dff7a06';



    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };


    return (
        <SafeAreaView>
            <View style={styleSheet.helperBox}>
                <View style={[styleSheet.logoWrapper]}>
                    <Image
                        style={[styleSheet.logo]}
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/loofweb.appspot.com/o/Screenshot_-_2022-09-15T170645.725__1_-removebg-preview.png?alt=media&token=55fa01a4-779f-4376-acb6-cd4b9bea09aa' }}
                    />
                    {/* <Text style={{ color: '#efefef', paddingRight: 5 }} >  LOOF</Text> */}
                </View>

                <View style={[styleSheet.walletInfoWrap]}>
                    <Text onPress={(e) => RootNavigation.navigate('WalletScreen')} style={{ color: '#efefef', paddingRight: 5 }} >  ₹ 342</Text>
                    <Icon onPress={(e) => RootNavigation.navigate('WalletScreen')} name='wallet' size={22} color='#ffffff' />
                </View>
            </View>
        </SafeAreaView>
    );
}


export default Navbar;