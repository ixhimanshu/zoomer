import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from "react-native";
import Colors from '../../theme/colors';
import CustomTheme from "../../styles/CustomTheme";
import { Rating, AirbnbRating } from 'react-native-ratings';
import Button from '../../components/buttons/Button';

const WATER_IMAGE = require('./water.png')


const styleSheet = StyleSheet.create({
    helperBox: {
        width: "94%",
        height: 80,
        display: "flex",
        // padding: 3,        
        justifyContent: "flex-start",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        borderColor: "rgba(0, 0, 0, 0.109999999)",
        // backgroundColor: Colors.background,
        borderStyle: "solid",
        borderWidth: 1,

        shadowRadius: 4,
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginRight: "3%",
        marginLeft: "3%",
        marginBottom: "2%",
        marginTop: "2%",
        position: "relative",
        // borderWidth: 1,
        // borderColor: '#000'
    },
    imageSource: {
        // borderRadius: 100,
        width: 80,
        height: "100%",
        // borderRadius: 12,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    userDescriptionBox: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        marginBottom: -15
    },
    userTitle: {
        fontWeight: "600",
        fontSize: 18,
        letterSpacing: 0.1,
        color: "rgba(0, 0, 0, 0.6)"
    },
    userDescription: {
        width: "100%",
        // height: "auto"
    },
    userRatingBox: {
        width: "auto",
        // height: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 17
    },
    userRatingAge: {
        width: "auto",
        // height: "auto",
    },

    userRatingNumberBox: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    helperInfoListingWrap: {
        display: "flex",
        flexDirection: "column",
        // justifyContent: "",
        alignItems: "flex-start",
        marginLeft: 25,
    },
    greenDot: {
        height: 10,
        width: 10
    },
    ...CustomTheme
})




let UserDescription = ({ children, title }) => {

    return (
        <View style={styleSheet.userDescriptionBox}>
            <View >
                <Text style={styleSheet.userTitle}>
                    {title + '  '}
                </Text>
            </View>

            <View>
                <Image
                    style={{ height: 15, width: 15, marginTop: 4 }}
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3472/3472620.png' }}
                />
            </View>

        </View>
    );
};


let UserRatings = ({ title, age, avg_rating, number_of_users }) => {

    const ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
    }

    return (
        <View style={styleSheet.userRatingBox}>
            <View style={styleSheet.userRatingAge}>
                <Text style={[styleSheet.normalText, { fontWeight: "500", fontSize: 14 }]}>
                    {title + ' | '}
                </Text>
            </View>

            <View style={styleSheet.userRatingNumberBox}>
                {/* <View>
                    <Text style={styleSheet.semiBoldText}>
                        {avg_rating}
                    </Text>
                </View>
                <View>
                    <MaterialIcon name="star-face" color="black" size={20} />
                </View> */}
                <Rating
                    onFinishRating={ratingCompleted}
                    style={{ paddingVertical: 10 }}
                    ratingCount={5}
                    startingValue={0}
                    readonly={true}
                    imageSize={15}
                />
                <View>
                    {/* <Text style={[styleSheet.normalText, { marginLeft: 5 }]}>
                        ({number_of_users})
                    </Text> */}
                </View>

            </View>
        </View>
    )
}


export default HelperCard = (props, {navigation}) => {
    const { user_description } = props;

    const navigateTo = screen => {
        console.log(screen);
        navigation.navigate(screen);
    };

    return (
        <View style={styleSheet.helperBox} >
            <View onPress={(e) => navigateTo("HelperDetailScreen")}>
                <Image source={{ uri: user_description.profile_image }} style={styleSheet.imageSource}>
                </Image>
            </View>

            <View style={styleSheet.helperInfoListingWrap}>
                <UserDescription title={user_description.full_name}>
                    {/* {user_description.about} */}
                </UserDescription>

                <UserRatings {...user_description} />
            </View>

            <View style={{ position: "absolute", right: 5, top: 5 }}>
                <Image
                    style={[styleSheet.greenDot]}
                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/loofweb.appspot.com/o/checked.png?alt=media&token=4561e428-a86e-45a2-bef2-6f66e9fdc428' }}
                />
            </View>

        </View>)
}