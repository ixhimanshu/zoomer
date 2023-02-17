import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View, Image, Text, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from '../../components/icon/Icon';
import MaterialIcon from '../../components/icon/materialIcon';
import StarRating from '../../components/starrating/StarRating';
import TouchableItem from '../../components/TouchableItem';
import CustomTheme from '../../styles/CustomTheme';
import Colors from '../../theme/colors';
import { useSelector, useDispatch } from 'react-redux';
import ApiHandler from '../../utils/apiHandler';
import Navbar from '../../components/navbar/Navbar';
import { openCallScreenModule } from '../../utils/AndroidBridgeHelper';
import { setChatId, setChatUserName } from '../../redux/actions/action';
import { useNavigation } from '@react-navigation/native';


const styleSheet = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    contentContainerStyle: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 64,
        paddingHorizontal: 10,
    },
    userDetailsContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "auto",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
    },
    profileImgContainer: {
        width: 128 * 3,
        height: 128 * 3,
        position: "relative",
        borderRadius: 0,
        transform: [
            { translateX: 0 },
            { translateY: 0 },
            { rotate: "0deg" }
        ]
    },
    imageSource: {
        width: 128 * 3,
        height: 128 * 3,
        transform: [
            { translateX: 0 },
            { translateY: 0 },
            { rotate: "0deg" }
        ],
        borderWidth: 1,
        borderRadius: 300,
        borderWidth: 3,
        borderColor: "green", // this color is need to be dynammic as it is going to be diffrent for online and offline

    },
    ellipse_2: {
        position: "absolute",
        width: 30,
        height: 30,
        borderRadius: 1000,
        backgroundColor: "green", // this color is need to be dynammic as it is going to be diffrent for online and offline
        borderWidth: 3,
        borderStyle: "solid",
        borderColor: "rgba(255, 255, 255, 1)",
        left: 300,
        right: "auto",
        transform: [
            { translateY: 300 }
        ]
    },
    usernameContainer: {
        width: 93,
        height: 20,
        minWidth: 0,
        fontFamily: "Comfortaa",
        fontWeight: "400",
        color: "rgba(0, 0, 0, 0.560000)",
        textAlign: "center",
        marginBottom: 0,
    },
    NameContainer: {
        position: "relative",
        width: "auto",
        height: "auto",
        minWidth: 0,
        fontFamily: "Comfortaa",
        fontWeight: "400",
        fontSize: 36,
        color: "rgba(0, 0, 0, 1)",
        textAlign: "center",
        letterSpacing: 0.1,
        flexShrink: 0,
        marginBottom: 0,
        textDecorationLine: "none"
    },
    Location: {
        position: "relative",
        width: 125,
        height: 23,
        minWidth: 0,
        flexShrink: 0,
        marginBottom: 0,
    },
    InfoContainerSection: {
        width: "100%",
        height: "auto",
        borderWidth: 1,
        borderColor: "rgba(207, 207, 207, 1)",
        marginTop: 30,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 10,
    },
    giveMargin: {
        marginBottom: 12
    },
    iconContainer: {
        display: "flex",
        width: "40%",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    badgeSection: {
        position: "absolute",
        left: "50%",
        right: "50%",
        width: 40,
        transform: [
            { translateX: 0 },
            { translateY: -10 }
        ],
        borderWidth: 1,
        borderRadius: 150 / 2,
        backgroundColor: "green"
    },
    avgListeningHours: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        width: "80%"
    },
    avgCount: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: 50
    },
    availaibiltyContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "70%"
    },
    reviewHighlights: {
        hieght: "auto",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 1)",
        marginTop: 30,
        padding: 10
    },
    latestReviewCard: {
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowColor: "rgba(0, 0, 0)",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        display: "flex",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: "100%"
    },
    ...CustomTheme

})



let LatestReviewsCard = ({ ratings_count, time }) => {

    return (<View style={styleSheet.latestReviewCard}>
        <StarRating rating={ratings_count} starSize={30} />
        <Text style={styleSheet.boldText}>
            {time}
        </Text>
    </View>);
};


const HelperDetails =
    ({
        profile_image = "https://lh3.googleusercontent.com/47bi6kNTTwsc21QgIW8YL92OVdjvl3CLyhLcfPTR9L290dLFRAgINDVe17LFKwc2RbOKUOA-D_9GMQ_v2MrM_EL-TFgo5_A9bqR0MuxwcfL9VQ=w960-rj-nu-e365",
        name = "Davender", // this is suppose to be first name only for helper 
        username = "jan2123",
        location = "San fransisco CA",
        ratings = 4.1,
        activityStatus = "online",
        hobby = "Professional Cycelist",
        about = "I have gone through a lot shitty",
        charges = "6",
        currency = "Rs",
        avg_listening_hours = 48,
        avg_ratings = 4.1,
        count_avg_ratings = 42,
        latest_reviews = [
            { "ratings": 4.5, created_at: "1 hour ago" },
            { "ratings": 5, created_at: "1 hour ago" }
        ],
        imageSource = [
            {
                src: "https://lh3.googleusercontent.com/47bi6kNTTwsc21QgIW8YL92OVdjvl3CLyhLcfPTR9L290dLFRAgINDVe17LFKwc2RbOKUOA-D_9GMQ_v2MrM_EL-TFgo5_A9bqR0MuxwcfL9VQ=w960-rj-nu-e365"
            },
            {
                src: "https://lh3.googleusercontent.com/47bi6kNTTwsc21QgIW8YL92OVdjvl3CLyhLcfPTR9L290dLFRAgINDVe17LFKwc2RbOKUOA-D_9GMQ_v2MrM_EL-TFgo5_A9bqR0MuxwcfL9VQ=w960-rj-nu-e365"
            },
            {
                src: "https://lh3.googleusercontent.com/47bi6kNTTwsc21QgIW8YL92OVdjvl3CLyhLcfPTR9L290dLFRAgINDVe17LFKwc2RbOKUOA-D_9GMQ_v2MrM_EL-TFgo5_A9bqR0MuxwcfL9VQ=w960-rj-nu-e365"
            },
            {
                src: "https://lh3.googleusercontent.com/47bi6kNTTwsc21QgIW8YL92OVdjvl3CLyhLcfPTR9L290dLFRAgINDVe17LFKwc2RbOKUOA-D_9GMQ_v2MrM_EL-TFgo5_A9bqR0MuxwcfL9VQ=w960-rj-nu-e365"
            }
        ] // provide the last 3 ratings of the user 
    }) => {
        const dispatch = useDispatch();
        const [isLoading, setLoadingState] = useState(false);
        const [helperDetails, setHelperDetailsData] = useState([]);
        const helperId = useSelector((store) => store.id);
        const navigation = useNavigation();
        console.log(helperId);

        useEffect(() => {
            getHelperDeatils(helperId.helperId)
        }, [])

        const getHelperDeatils = (id) => {
            setLoadingState(true);
            let handler = ApiHandler.getHandler();
            handler.get(ApiHandler.path._HELPER_DETAILS + id, true, false)
                .then(res => {
                    if (res.data) {
                        setHelperDetailsData(res.data);
                        console.log('helperDetails DATA:', res.data);
                    }
                    setLoadingState(false);
                })
                .catch(err => {
                    console.log('error in listingapi', err);
                    setLoadingState(false);
                })
        }



        const navigateTo = (screen, data) =>  {
            console.log("navigaiton", data);
            dispatch(setChatId(helperDetails.id))
            dispatch(setChatUserName(helperDetails.first_name))
            navigation.navigate(screen);
        };


        let chosenColor = activityStatus == "online" ? "green" : "red";

        return (
            <SafeAreaView style={styleSheet.screenContainer}>
                <Navbar />
            <ScrollView contentContainerStyle={styleSheet.contentContainerStyle}>
                  <View style={styleSheet.userDetailsContainer}>
                        <View style={styleSheet.profileImgContainer}>
                            <Image source={{ uri: helperDetails.profile_image }} style={{ ...styleSheet.imageSource, borderColor: chosenColor }}>
                            </Image>
                            <View style={{ ...styleSheet.ellipse_2, backgroundColor: chosenColor }}>
                            </View>
                        </View>

                        <View style={styleSheet.usernameContainer}>
                            <Text style={styleSheet.usernameContainer}>
                                @{username}
                            </Text>
                        </View>

                        <View style={styleSheet.NameContainer}>
                            <Text style={styleSheet.NameContainer}>
                                {helperDetails.first_name}
                            </Text>
                        </View>

                        <View style={styleSheet.Location}>
                            <Text style={styleSheet.normalText}>
                                {location}
                            </Text>
                        </View>

                        <View>
                            <StarRating rating={ratings} starSize={30} />
                        </View>
                    </View>

                    {/* Profile Section */}
                    <View style={styleSheet.InfoContainerSection}>
                        <View style={styleSheet.giveMargin}>
                            <Text style={styleSheet.headerText}>
                                About
                            </Text>
                        </View>

                        <View style={styleSheet.giveMargin}>
                            <Text style={{ ...styleSheet.semiBoldText, ...styleSheet.giveMargin }}>
                                {hobby}
                            </Text>
                        </View>

                        <View>
                            <Text style={styleSheet.normalText}>
                                {about}
                            </Text>
                        </View>

                    </View>

                    {/* charges section*/}
                    <View style={styleSheet.InfoContainerSection}>

                        <View style={styleSheet.badgeSection}>
                            <MaterialIcon name="currency-inr" color="white" size={20} />
                        </View>

                        <View style={styleSheet.giveMargin}>
                            <Text style={styleSheet.headerText}>
                                Charges
                            </Text>
                        </View>

                        <View style={styleSheet.giveMargin}>
                            <Text style={styleSheet.boldText}>
                              Call:  {helperDetails.currency_denomination} {helperDetails.calling_charges_per_minute} per/- min

                            </Text>
                            <Text style={styleSheet.boldText}>
                              Chat:  {helperDetails.currency_denomination} {helperDetails.chat_charges_per_message} per/- message

                            </Text>
                        </View>
                        <View style={styleSheet.availaibiltyContainer}>
                            <View >
                                <Text style={styleSheet.semiBoldText}>
                                    Available On
                                </Text>
                            </View>

                        <View style={styleSheet.iconContainer}>
                            <TouchableItem rippleColor={Colors.black} borderless onPress={e => openCallScreenModule(helperId.helperId.toString())}>  
                                <Icon name="call" size={40} color={"black"}/>
                            </TouchableItem>

                            <TouchableItem rippleColor={Colors.black} borderless onPress={e=> navigateTo("ChatScreen", helperId.helperId)}>
                                <MaterialIcon name="android-messages" size={40} color={"black"}/>
                            </TouchableItem>

                            </View>
                        </View>
                    </View>

                    <View style={styleSheet.InfoContainerSection}>
                        <View style={styleSheet.badgeSection}>
                            <MaterialIcon name="account" color="white" size={20} />
                        </View>
                        <View style={styleSheet.giveMargin}>
                            <Text style={styleSheet.headerText}>
                                Avg Reviews
                            </Text>
                        </View>
                        <View style={styleSheet.avgListeningHours}>
                            <View>
                                <Text style={styleSheet.semiBoldText}>
                                    {avg_listening_hours} Listening Hours
                                </Text>
                            </View>
                            <View style={styleSheet.avgCount}>
                                <View>
                                    <Text style={styleSheet.semiBoldText}>
                                        {avg_ratings} stars
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styleSheet.semiBoldText}>
                                        {count_avg_ratings} reviews
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>


                    <View style={styleSheet.reviewHighlights}>
                        <Text style={{ ...styleSheet.boldText, color: "white", textAlign: "center" }}>
                            {count_avg_ratings} reviews
                        </Text>
                    </View>


                    {/* {
                        latest_reviews.map(
                            (iter, index) => (<LatestReviewsCard
                                ratings_count={iter.ratings}
                                time={iter.created_at}
                                id={index} />)
                        )
                    } */}

                    {/* <FlatList
                        numColumns={2}
                        data={imageSource}
                        renderItem={({ item }) => (
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    margin: 1
                                }}>
                                <Image
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 200,
                                        width: 200,

                                    }}
                                    source={{ uri: item.src }}
                                />
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    /> */}
                    </ScrollView>
            </SafeAreaView>
        )

    }


export default HelperDetails;