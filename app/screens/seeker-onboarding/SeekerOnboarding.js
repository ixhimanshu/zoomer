/**
 * loof - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text, View, Image
} from 'react-native';

// import components
import Button from '../../components/buttons/Button';
import CategoryCard from '../../components/cards/CategoryCard';
import { Heading5 } from '../../components/text/CustomText';
import SafeAreaView from '../../components/SafeAreaView';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import colors, layout
import Colors from '../../theme/colors';

import SelectDropdown from 'react-native-select-dropdown';


const countries = [13, 14, 15, 16, 17,
    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
    35, 36, 37, 38, 39, 40, '40+']

const genderData = [
    {
        imageUri: 'https://firebasestorage.googleapis.com/v0/b/tucktools-6b33f.appspot.com/o/LOOF%2F1019173.png?alt=media&token=d402f6f4-c41d-443c-9c83-f61af05c626f',
        name: 'Female',
        id: 1
    },
    {
        imageUri: 'https://firebasestorage.googleapis.com/v0/b/tucktools-6b33f.appspot.com/o/LOOF%2F1019172.png?alt=media&token=b701bcd7-1fca-403a-b02b-9bfcfd295545',
        name: 'Male',
        id: 2
    },
    {
        imageUri: 'https://firebasestorage.googleapis.com/v0/b/tucktools-6b33f.appspot.com/o/LOOF%2F2517445.png?alt=media&token=5395ee8b-ccde-4099-90ef-65ce46870326',
        name: 'Transgender',
        id: 3
    }
]

// Home Styles
const styles = StyleSheet.create({
    avatarWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        padding: 20
    },
    avatar: {
        fontSize: 40
    },
    screenContainer: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    container: {
        flex: 1,
    },
    bannerImage: {
        width: '100%',
        height: 228,
        resizeMode: 'contain',
        borderRadius: 0,
        marginTop: -0.5
        //backgroundColor:'#000'
    },
    categoriesContainer: {
        paddingBottom: 16,
    },
    category: {
        position: 'absolute',
        bottom: -20,
        alignItems: 'center',
        width: '100%',
        marginHorizontal: 17,
        backgroundColor: '#fff',
        borderWidth: 3,
        borderColor: 'rgba(0, 0, 0, 0.08)',
        borderRadius: 8,
    },
    categoryView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    categoryHeading: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
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
    viewAllText: {
        color: Colors.primaryColor,
    },
    categoriesList: {
        paddingTop: 4,
        paddingRight: 16,
        paddingLeft: 5,
    },
    popularCategoriesList: {
        paddingHorizontal: 12,
        paddingBottom: 16,
    },
    buttonContainer: {
        padding: 30,
    },
    picker: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center"
    },
    inputContainer: {

    },
    tinyLogo: {
        width: 55,
        height: 55,
        margin: 7
    }
});

const SeekerOnboarding = ({props,navigation}) => {

    const [step, setStep] = useState(0)

    keyExtractor = (item, index) => index.toString();

    renderPopularProductItem = ({ item, index }) => (
        <CategoryCard
            swipeoutDisabled
            key={index}
            imageUri={item.imageUri}
            title={item.name}
            description={item.description}
            rating={item.rating}
            starRating={true}
            price={item.price}
            quantity={item.quantity}
            discountPercentage={item.discountPercentage}
            label={item.label}
            cartButton={true}
        />
    );

    return (
        <SafeAreaView>


            {step === 0 ?
                <>
                    <View style={styles.titleContainer}>
                        <Heading5 style={styles.titleText}>What is your gender?</Heading5>
                    </View>
                    {/* <FlatList
                        data={genderData}
                        keyExtractor={(item) => item.id}
                        renderItem={renderPopularProductItem}
                        contentContainerStyle={styles.popularCategoriesList}
                    /> */}
                </>
                : step === 1 ?
                    <>
                        <View style={styles.titleContainer}>
                            <Heading5 style={styles.titleText}>What is your age?</Heading5>
                        </View>
                        <View style={styles.picker}>
                            <SelectDropdown
                                data={countries}
                                onSelect={(selectedItem, index) => {
                                    // console.log(selectedItem, index)
                                }}
                                buttonTextAfterSelection={(selectedItem) => {
                                    // text represented after item is selected
                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                    return selectedItem
                                }}
                                rowTextForSelection={(item) => {
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    return item
                                }}
                            />
                        </View>
                    </>
                    : <>
                        <View style={styles.titleContainer}>
                            <Heading5 style={styles.titleText}>Pick your avatar?</Heading5>
                        </View>
                        {/* <View style={styles.avatarWrapper}>
                            {countries.map((e, index) => {
                                return <Image
                                style={styles.tinyLogo}
                                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/7088/7088470.png' }}
                            />
                            })}
                        </View> */}
                    </>
            }


            <View style={styles.buttonContainer}>
                <Button
                    //  onPress={() => navigation.navigate('HomeNavigator')}
                    onPress={step < 2 ? () => setStep(step + 1) : () => navigation.navigate('HomeNavigator')}
                    color={Colors.primaryColor}
                    rounded
                    borderRadius={'10'}
                    title={'Next'.toUpperCase()}
                    titleColor={'#fff'}
                />
            </View>
        </SafeAreaView>

    );
}

export default SeekerOnboarding;