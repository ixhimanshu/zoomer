import React, { Component, useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View, TouchableWithoutFeedback, Text, Image } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';

// import components
import Button from '../../components/buttons/Button';
import { Paragraph } from '../../components/text/CustomText';
import SafeAreaView from '../../components/SafeAreaView';

// import colors, layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Heading6 } from '../../components/text/CustomText';
import ApiHandler from '../../utils/apiHandler';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window')

// Welcome Styles
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: Colors.background,

    },
    headerImg: {
        height: Layout.SCREEN_HEIGHT * 0.48,
        backgroundColor: Colors.primaryColor,
        opacity: 0.8,
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
    logoWrapper: {
        width: screenWidth / 2,
        height: 40,
        margin: 20
    },
    logo: {
        height: 40,
        width: 'auto',
        resizeMode: 'contain',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    titleText: {
        fontWeight: '700',
        fontSize: 30,
        paddingTop: 10,
        paddingBottom: 20
    },
    picker: {
        // flex: 1,
        paddingTop: 10,
        alignItems: "center",
        marginBottom: 30
    },
});


const handler = ApiHandler.getHandler();
// Welcome
const PartialRegister = () => {

    const [statesData, setStatesData] = useState([]);
    const [citiesData, setCitiesData] = useState([]);
    const [schoolsData, setSchoolsData] = useState([]);
    const [statesSelected, setStateSelected] = useState(null);
    const [citiesSelected, setCitieSelected] = useState(null);
    const [schoolsSelected, setSchoolSelected] = useState(null);
    const navigation = useNavigation();



    useEffect(() => {
        handler.get(ApiHandler.path._GET_STATES)
            .then(res => {
                setStatesData(res.states);
            }).catch(
                err => console.log("error in sendOTP", err)
            )
        return () => {
        }
    }, [])

    const onStateChange = (state) => {
        setStateSelected({
            title: state.stateName,
            id: state.id
        })
        handler.get(ApiHandler.path._GET_CITIES + `?id=${state.id}`)
            .then(res => {
                setCitiesData(res.cities);
                console.log(statesSelected, citiesSelected, schoolsSelected)
            }).catch(
                err => console.log("error in sendOTP", err)
            )
    }

    const onCityChange = (city) => {
        setCitieSelected({
            title: city.cityName,
            id: city.id
        })
        handler.get(ApiHandler.path._GET_SCHOOL + `?id=${city.id}`)
            .then(res => {
                setSchoolsData(res.schools);
                console.log(statesSelected, citiesSelected, schoolsSelected)
            }).catch(
                err => console.log("error in sendOTP", err)
            )
    }


    return (
        <SafeAreaView forceInset={{ top: 'never' }} style={styles.screenContainer}>
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
                <View >
                    <Heading6>Choose your state</Heading6>
                    <View style={styles.picker}>
                        <SelectDropdown
                            data={statesData}
                            onSelect={(state, index) => {
                                onStateChange(state)
                            }}
                            defaultButtonText={'Select country'}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem.stateName;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item.stateName;
                            }}
                            buttonStyle={styles.dropdown1BtnStyle}
                            buttonTextStyle={styles.dropdown1BtnTxtStyle}
                            renderDropdownIcon={isOpened => {
                                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                            }}
                            dropdownIconPosition={'right'}
                            dropdownStyle={styles.dropdown1DropdownStyle}
                            rowStyle={styles.dropdown1RowStyle}
                            rowTextStyle={styles.dropdown1RowTxtStyle}
                        />
                    </View>
                </View>

                <View >
                    <Heading6>Choose your city</Heading6>
                    <View style={styles.picker}>
                        <SelectDropdown
                            data={citiesData}
                            onSelect={(city, index) => {
                                onCityChange(city)
                            }}
                            defaultButtonText={'Select country'}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem.cityName;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item.cityName;
                            }}
                            buttonStyle={styles.dropdown1BtnStyle}
                            buttonTextStyle={styles.dropdown1BtnTxtStyle}
                            renderDropdownIcon={isOpened => {
                                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                            }}
                            dropdownIconPosition={'right'}
                            dropdownStyle={styles.dropdown1DropdownStyle}
                            rowStyle={styles.dropdown1RowStyle}
                            rowTextStyle={styles.dropdown1RowTxtStyle}
                        />
                    </View>
                </View>

                <View >
                    <Heading6>Choose your school</Heading6>
                    <View style={styles.picker}>
                        <SelectDropdown
                            data={schoolsData}
                            onSelect={(school, index) => {
                                setSchoolSelected({
                                    title: school.schoolName,
                                    id: school.affiliationId
                                })
                                console.log(statesSelected, citiesSelected, schoolsSelected)
                            }}
                            defaultButtonText={'Select country'}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem.schoolName;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item.schoolName;
                            }}
                            buttonStyle={styles.dropdown1BtnStyle}
                            buttonTextStyle={styles.dropdown1BtnTxtStyle}
                            renderDropdownIcon={isOpened => {
                                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                            }}
                            dropdownIconPosition={'right'}
                            dropdownStyle={styles.dropdown1DropdownStyle}
                            rowStyle={styles.dropdown1RowStyle}
                            rowTextStyle={styles.dropdown1RowTxtStyle}
                        />
                    </View>
                </View>


            </View>





            <View style={styles.footer}>

                <View style={styles.center}>

                    <View style={[styles.buttonsGroup, { position: 'relative', marginTop: 120 }]}>


                        <Button
                            buttonStyle={styles.customButton}
                            // onPress={this.navigateTo('HomeNavigator')}
                            onPress={() => navigation.navigate('Welcome')}
                            socialIconName={'mobile-phone'}
                            iconColor={'#ffffff'}
                            iconSize={40}
                            title={'Next'}
                            color={'#16213E'}
                            disabled={(statesSelected && citiesSelected && schoolsSelected) ? false : true}
                        />


                    </View>
                    <View style={[styles.buttonsGroup]}>


                    </View>



                </View>
            </View>
        </SafeAreaView>
    );
}

export default PartialRegister;