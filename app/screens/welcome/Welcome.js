import React, { Component } from 'react';
import { StatusBar, StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';

// import components
import Button from '../../components/buttons/Button';
import { Paragraph } from '../../components/text/CustomText';
import SafeAreaView from '../../components/SafeAreaView';

// import colors, layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth } = Dimensions.get('window')
// Welcome Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
  },
  headerImg: {
    height: Layout.SCREEN_HEIGHT * 0.48,
    backgroundColor: Colors.primaryColor,
    opacity: 0.8,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.7,
  },
  headerText: {
    fontWeight: '700',
    color: Colors.white,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5
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
});



// Welcome
export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      entries: [
        {
          text: "Choose someone to talk to",
          thumbnail: 'https://img.freepik.com/free-vector/best-friends-greeting-new-normal-way_52683-44585.jpg?w=826&t=st=1663235969~exp=1663236569~hmac=d9585d2166bc0e8a445896870d826d8102f5d5f5e62a9e3ba0d0484ea582d100'
        },
        {
          text: "Talk anonymously on Call",
          thumbnail: 'https://img.freepik.com/free-vector/cellphone-concept-illustration_114360-6398.jpg?t=st=1663236236~exp=1663236836~hmac=6a6cd83cc01fa64f0bc7cb8ae31ccae92898151eb84ab2e54185af85adfc88f9'
        },
        {
          text: "or Talk anonymously on Chat",
          thumbnail: 'https://img.freepik.com/free-vector/conversation-concept-illustration_114360-1305.jpg?t=st=1663236190~exp=1663236790~hmac=511e9ce15199a94b45d08fe57080917c52d640b3009c9bc41e5dbe48ded3688f'
        }
      ]
    }

    AsyncStorage.getItem('access_token', (err, result) => {
      if (result) {
        AsyncStorage.getItem('user_role', (err, result) => {
          console.log(result)
          const { navigation } = this.props;
          if (result == 'seeker') {
            navigation.navigate('HomeNavigator');
          } else if (result == 'helper'){
            navigation.navigate('HelperNavigator');
          }
        });
      }
    });
  }

  _renderItem({ item, index }, parallaxProps) {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.thumbnail }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <View style={[styles.center, { margin: 20 }]}>
          <Paragraph>{item.text}</Paragraph>
        </View>
      </View>
    );
  }

  navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  render() {
    return (
      <SafeAreaView forceInset={{ top: 'never' }} style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.primaryColor}
          barStyle="light-content"
        />

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 40 }}>
          <Carousel
            sliderWidth={screenWidth}
            sliderHeight={screenWidth}
            itemWidth={screenWidth - 60}
            data={this.state.entries}
            renderItem={this._renderItem}
            hasParallaxImages={true}
          />
        </View>


        <View style={styles.footer}>

          <View style={styles.center}>

            <View style={[styles.buttonsGroup, { position: 'relative', marginTop: 120 }]}>

              <Text style={styles.referral}>
                Have a referral code?
              </Text>
              <Button
                buttonStyle={styles.customButton}
                // onPress={this.navigateTo('HomeNavigator')}
                onPress={this.navigateTo('SignIn')}
                socialIconName={'mobile-phone'}
                iconColor={'#ffffff'}
                iconSize={40}
                title={'Continue via Phone'}
                color={'#16213E'}
              />


            </View>
            <View style={[styles.buttonsGroup]}>
              <TouchableWithoutFeedback
                onPress={this.navigateTo('TermsConditions')}>
                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    By clicking, I accept the Terms
                    <Text style={[styles.footerText, styles.footerLink]}>

                    </Text>
                    <Text style={styles.footerText}> and </Text>
                    <Text style={[styles.footerText, styles.footerLink]}>
                      Privacy Policy
                    </Text>
                    <Text style={styles.footerText}>.</Text>
                  </Text>

                </View>
              </TouchableWithoutFeedback>

            </View>


            {/* <LinkButton
              onPress={this.navigateTo('HomeNavigator')}
              title="Skip"
              titleStyle={styles.linkButtonText}
            /> */}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}