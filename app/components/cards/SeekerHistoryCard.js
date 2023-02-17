import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import CustomTheme from "../../styles/CustomTheme";

const WATER_IMAGE = require('./water.png')


const styleSheet = StyleSheet.create({
    helperBox: {
        width: "94%",
        height: 70,
        display: "flex",
        // padding: 3,        
        justifyContent: "flex-start",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        // borderColor: "rgba(0, 0, 0, 0.109999999)",
        // backgroundColor: Colors.background,
        // borderStyle: "solid",
        // borderWidth: 1,

        // shadowRadius: 4,
        // shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginRight: "3%",
        marginLeft: "3%",
        marginBottom: "4%",
        marginTop: "4%",
        position: "relative",
        // borderWidth: 1,
        // borderColor: '#000'
    },
    imageSource: {
        borderRadius: 100,
        width: 70,
        height: "100%",
        // borderRadius: 12,
        // borderTopLeftRadius: 10,
        // borderBottomLeftRadius: 10
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
        </View>
    );
};


let UserRatings = ({ gender, age, avg_rating, number_of_users }) => {

    return (
        <View style={styleSheet.userRatingBox}>
            <View style={styleSheet.userRatingAge}>
                <Text style={[styleSheet.normalText, { fontWeight: "500", fontSize: 14 }]}>
                    Call - Dec 16, 10:42 pm
                </Text>
            </View>
        </View>
    )
}


export default SeekerHistoryCard = props => {
    const { user_description } = props;
    console.log(user_description);
    return (
        <View style={styleSheet.helperBox}>

            <View>
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
                <View style={styleSheet.userRatingAge}>
                    <Text style={[styleSheet.normalText, { fontWeight: "500", fontSize: 14 }]}>
                        {user_description.lastUpdated}
                    </Text>
                </View>
            </View>

        </View>)
}