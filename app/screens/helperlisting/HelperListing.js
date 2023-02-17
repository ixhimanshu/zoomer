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

let max_page = 1;


const HelperListing = () => {
    const dispatch = useDispatch();
    const [helperListingData, setHelperListingData] = useState([]);
    const [page_number, setPageNumber] = useState(2);
    const [isLoading, setLoadingState] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        getHelperListing(1)
    }, [])

    const onLogout = () => {
        AsyncStorage.getItem('access_token', (err, result) => {
          if (result) {
            console.log(result);
            AsyncStorage.removeItem('access_token', (err, result) => {
              console.log('token removed!!');
              ApiHandler._instance = null;
            });
            navigation.navigate('Welcome');
          }
        });
      } 

    const getHelperListing = (page) => {
        if(page <= max_page) {
            setLoadingState(true);
            let handler = ApiHandler.getHandler();
            handler.get(ApiHandler.path._HELPER_LISTING, true, true, page, 10)
                .then(res => {
                    if (res.data) {
                        const d = [...helperListingData, ...res.data]
                        setHelperListingData(d)
    
                        max_page = Math.round(res.total_count/10) + 1;
                    } else if(res.message == "Unauthorized!"){
                        onLogout();
                    }
                    setLoadingState(false);
                })
                .catch(err => {
                    console.log('error in listingapi', err);
                    setLoadingState(false);
                })
        } else {
            console.log('last page');
        }
    }

    const renderItem = ({ item, index }) => (
        <TouchableItem rippleColor={Colors.black} borderless={false} delay={50} onPress={(e) => navigateTo('HelperDetailScreen',item)} key={index} >
            <HelperCard user_description={item} key={item.id} />
        </TouchableItem>
    )

    const navigateTo = (screen,item) => {
        dispatch(setHelperId(item.id))
        navigation.navigate(screen);
    };

    const onScrollEnd = () => {
        setPageNumber(page_number + 1)
        getHelperListing(page_number);
    }


    return (
        <SafeAreaView style={{ backgroundColor: Colors.background, flex: 1 }}>

            <Navbar />
            {
                helperListingData && helperListingData.length > 0 &&
                    <FlatList
                        style={{
                            margin: 1
                        }}
                        data={helperListingData}
                        renderItem={renderItem}
                        onEndReached={onScrollEnd}
                    />
            }

            { isLoading && <View style={{
                        margin: 30
                    }}>
                        <ActivityIndicator size="large" color={Colors.primaryColor} />
                    </View> }

        </SafeAreaView>
    );
}

export default HelperListing;

