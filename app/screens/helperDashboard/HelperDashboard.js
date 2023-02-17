import React, { useEffect, useState } from 'react';
import { ScrollView, FlatList, SafeAreaView, StyleSheet, ActivityIndicator, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HelperCard from '../../components/Helper/HelperCard';
import Navbar from '../../components/navbar/Navbar';
import TouchableItem from '../../components/TouchableItem';
import Colors from '../../theme/colors';
import ApiHandler from '../../utils/apiHandler';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setHelperId } from '../../redux/actions/action';

const styles = StyleSheet.create({
    filter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 10,
        bottom: 10
    },
});



const HelperDashboard = () => {


    return (
        <SafeAreaView style={{ backgroundColor: Colors.background, flex: 1 }}>

            <Navbar />
            <Text>Helper Dashboard </Text>
            <Text>Action items </Text>

            <Text>Missed calls </Text>
            <Text>What next to do </Text>
            <Text>Stats / Graphs / Offers </Text>



        </SafeAreaView>
    );
}

export default HelperDashboard;

