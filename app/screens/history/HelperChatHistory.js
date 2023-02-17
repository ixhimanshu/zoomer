import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SeekerHistoryCard from '../../components/cards/SeekerHistoryCard';
import Navbar from '../../components/navbar/Navbar';
import TouchableItem from '../../components/TouchableItem';
import Colors from '../../theme/colors';

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

const Data = [
    {
        about: "I have gone through a lot ....",
        title: "Neha Sharma",
        lastUpdated: "Dec 20, 2022",
        age: 42,
        avg_rating: 4.9,
        number_of_users: 31,
        user_image: "https://i.pinimg.com/736x/71/7f/b5/717fb507e1f9cea548c91285c2c5842b.jpg"
    },

    {
        about: "I have gone through a lot ....",
        title: "Sam Larusauy",
        lastUpdated: "Dec 19, 2022",
        age: 44,
        avg_rating: 4.7,
        number_of_users: 64,
        user_image: "https://i.pinimg.com/564x/ce/91/f5/ce91f5827dfcc99f14077953823c00cc.jpg"
    },

    {
        about: "I have gone through a lot ....",
        title: "Sonal Shahi",
        lastUpdated: "Dec 16, 2022",
        age: 48,
        avg_rating: 4.8,
        number_of_users: 23,
        user_image: "https://i.pinimg.com/564x/b8/15/64/b81564d131ea4f76d4830d8521d4c718.jpg"
    },

    {
        about: "I have gone through a lot ....",
        title: "Akansha Singh",
        lastUpdated: "Dec 16, 2022",
        age: 24,
        avg_rating: 4.3,
        number_of_users: 45,
        user_image: "https://i.pinimg.com/564x/23/57/09/235709dd3b1065c01be414a3043b02b1.jpg"
    },
    {
        about: "I have gone through a lot ....",
        title: "Ayushima",
        lastUpdated: "Dec 16, 2022",
        age: 26,
        avg_rating: 4.9,
        number_of_users: 161,
        user_image: "https://i.pinimg.com/564x/26/b4/19/26b419f59b4da80454a69158d6e44654.jpg"
    },
    {
        about: "I have gone through a lot ....",
        title: "Pratibha Kaur",
        lastUpdated: "Dec 5, 2022",
        age: 21,
        avg_rating: 4.5,
        number_of_users: 61,
        user_image: "https://i.pinimg.com/564x/1f/a8/ac/1fa8acec1480788be7c0e330800f8fdb.jpg"
    }

]



const HelperChatHistory = ({ navigation }) => {

    const navigateTo = screen =>  {        
        console.log("navigaiton", navigation);
        navigation.navigate(screen);
    };

    const renderItem = ({ item }) => (
        <TouchableItem rippleColor={Colors.black} borderless={false} delay={50} onPress={e => navigateTo("ChatScreen")}  >
            <SeekerHistoryCard user_description={item} />
        </TouchableItem>
    )

    const ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
    }

    return (
        <SafeAreaView style={{ backgroundColor: Colors.background, flex: 1 }}>

            <Navbar />
            <Text>Chat History</Text>

            {/* <StatusBar
                backgroundColor={Colors.primaryColor}
                barStyle="light-content"
            /> */}


            <FlatList
                style={{
                    margin: 1
                }}
                data={Data}
                renderItem={renderItem}
                keyExtractor={(item) => item.age}
            />

            <View style={styles.filter}>
                
            </View>
        </SafeAreaView>
    );
}

export default HelperChatHistory;

