/**
 * loof - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component } from 'react';
import {
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// import components
import Avatar from '../../components/avatar/Avatar';
import Icon from '../../components/icon/Icon';
import { Subtitle2 } from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';

// import colors
import Colors from '../../theme/colors';

// EditProfile Config
const AVATAR_SIZE = 100;
const IOS = Platform.OS === 'ios';
const CAMERA_ICON = IOS ? 'ios-camera' : 'md-camera';
const INPUT_FOCUSED_BORDER_COLOR = Colors.primaryColor;

// EditProfile Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    avatarSection: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    whiteCircle: {
        marginTop: -18,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.white,
    },
    cameraButtonContainer: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: Colors.primaryColor,
        overflow: 'hidden',
    },
    cameraButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 34,
        height: 34,
    },
    editForm: {
        paddingHorizontal: 20,
    },
    overline: {
        color: Colors.primaryColor,
        textAlign: 'left',
    },
    inputContainerStyle: {
        marginTop: 0,
        marginBottom: 17,
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
});

// EditProfile
export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'John Doe',
            nameFocused: false,
            email: 'john.doe@example.com',
            emailFocused: false,
            phone: '+1 23 4567890',
            phoneFocused: false,
        };
    }

    goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    };

    nameChange = text => {
        this.setState({
            name: text,
        });
    };

    nameFocus = () => {
        this.setState({
            nameFocused: true,
            emailFocused: false,
            phoneFocused: false,
        });
    };

    emailChange = text => {
        this.setState({
            email: text,
        });
    };

    emailFocus = () => {
        this.setState({
            nameFocused: false,
            emailFocused: true,
            phoneFocused: false,
        });
    };

    phoneChange = text => {
        this.setState({
            phone: text,
        });
    };

    phoneFocus = () => {
        this.setState({
            nameFocused: false,
            emailFocused: false,
            phoneFocused: true,
        });
    };

    focusOn = nextFiled => () => {
        if (nextFiled) {
            nextFiled.focus();
        }
    };

    render() {
        const {
            name,
            nameFocused,
            email,
            emailFocused,
            phone,
            phoneFocused,
        } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    backgroundColor={Colors.statusBarColor}
                    barStyle="dark-content"
                />

                <KeyboardAwareScrollView enableOnAndroid>
                    <View style={styles.avatarSection}>
                        <Avatar
                            imageUri={require('../../assets/img/profile.jpg')}
                            rounded
                            size={AVATAR_SIZE}
                        />

                        <View style={styles.whiteCircle}>
                            <View style={styles.cameraButtonContainer}>
                                <TouchableItem>
                                    <View style={styles.cameraButton}>
                                        <Icon
                                            name={CAMERA_ICON}
                                            size={16}
                                            color={Colors.onPrimaryColor}
                                        />
                                    </View>
                                </TouchableItem>
                            </View>
                        </View>
                    </View>

                    <View style={styles.editForm}>
                        <Subtitle2 style={styles.overline}>Name</Subtitle2>
                        <UnderlineTextInput
                            onRef={r => {
                                this.name = r;
                            }}
                            value={name}
                            onChangeText={this.nameChange}
                            onFocus={this.nameFocus}
                            inputFocused={nameFocused}
                            onSubmitEditing={this.focusOn(this.email)}
                            returnKeyType="next"
                            focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                            inputContainerStyle={styles.inputContainerStyle}
                        />

                        <Subtitle2 style={styles.overline}>E-mail Address</Subtitle2>
                        <UnderlineTextInput
                            onRef={r => {
                                this.email = r;
                            }}
                            value={email}
                            onChangeText={this.emailChange}
                            onFocus={this.emailFocus}
                            inputFocused={emailFocused}
                            onSubmitEditing={this.focusOn(this.phone)}
                            returnKeyType="next"
                            keyboardType="email-address"
                            focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                            inputContainerStyle={styles.inputContainerStyle}
                        />

                        <Subtitle2 style={styles.overline}>Phone 00Number</Subtitle2>
                        <UnderlineTextInput
                            onRef={r => {
                                this.phone = r;
                            }}
                            value={phone}
                            keyboardType="phone-pad"
                            onChangeText={this.phoneChange}
                            onFocus={this.phoneFocus}
                            inputFocused={phoneFocused}
                            focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                            inputContainerStyle={styles.inputContainerStyle}
                        />
                        <Subtitle2 style={styles.overline}>Title</Subtitle2>
                        <UnderlineTextInput
                            onRef={r => {
                                this.name = r;
                            }}
                            value={name}
                            onChangeText={this.nameChange}
                            onFocus={this.nameFocus}
                            inputFocused={nameFocused}
                            onSubmitEditing={this.focusOn(this.email)}
                            returnKeyType="next"
                            focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                            inputContainerStyle={styles.inputContainerStyle}
                        />
                        <Subtitle2 style={styles.overline}>About you</Subtitle2>
                        <UnderlineTextInput
                            onRef={r => {
                                this.name = r;
                            }}
                            value={name}
                            onChangeText={this.nameChange}
                            onFocus={this.nameFocus}
                            inputFocused={nameFocused}
                            onSubmitEditing={this.focusOn(this.email)}
                            returnKeyType="next"
                            focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                            inputContainerStyle={styles.inputContainerStyle}
                        />
                        <Subtitle2 style={styles.overline}>Call Rates</Subtitle2>
                        <UnderlineTextInput
                            onRef={r => {
                                this.name = r;
                            }}
                            value={name}
                            onChangeText={this.nameChange}
                            onFocus={this.nameFocus}
                            inputFocused={nameFocused}
                            onSubmitEditing={this.focusOn(this.email)}
                            returnKeyType="next"
                            focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                            inputContainerStyle={styles.inputContainerStyle}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
}
