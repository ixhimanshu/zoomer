/**
 * loof - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {useEffect} from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderIconButton from '../components/navigation/HeaderIconButton';
import Welcome from '../screens/welcome/Welcome';
import SignIn from '../screens/signin/SignIn';
import VerifyOtp from '../screens/verifyotp/VerifyOtp';
import UserRole from '../screens/user-role/UserRole';
import Home from '../screens/home/Home';
import HelperListing from '../screens/helperlisting/HelperListing';
import HomeNavigator from '../navigation/HomeNavigator';
import HelperNavigator from '../navigation/HelperNavigator';
import SeekerOnboarding from '../screens/seeker-onboarding/SeekerOnboarding';
import Orders from '../screens/orders/Orders';
import PaymentMethod from '../screens/payment/PaymentMethod';
import AddCreditCard from '../screens/payment/AddCreditCard';
import EditProfile from '../screens/profile/EditProfile';
import HelperEditProfile from '../screens/profile/HelperEditProfile';



// import colors
import Colors from '../theme/colors';
import HelperDetails from '../screens/helper/HelperDetail';
import Calling from '../screens/helper/Calling';
import Chat from '../screens/chat/Chat';
import Wallet from '../screens/wallet/Wallet';
import HelperDashboard from '../screens/helperDashboard/HelperDashboard';
import HelperChatHistory from '../screens/history/HelperChatHistory';
import HelperCallHistory from '../screens/history/HelperCallHistory';
import PartialRegister from '../screens/register/partialRegister';

// MainNavigatorA Config
const SAVE_ICON = Platform.OS === 'ios' ? 'ios-checkmark' : 'md-checkmark';

// create stack navigator
const Stack = createNativeStackNavigator();

// MainNavigatorA
const MainNavigatorA = () => {

  // const navigation = useNavigation();


  useEffect(() => {
    // setTimeout(() => {
    //   navigation.navigate('partialRegister')
    // },2000);
  
  }, [])
  

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="PartialRegister"
        screenOptions={{
          cardOverlayEnabled: false,
          headerStyle: {
            elevation: 1,
            shadowOpacity: 0,
          },
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: Colors.onBackground,
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="PartialRegister"
          component={PartialRegister}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SeekerOnboarding"
          component={SeekerOnboarding}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerifyOtp"
          component={VerifyOtp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserRole"
          component={UserRole}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HelperScreen"
          component={HelperListing}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeNavigator"
          component={HomeNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HelperNavigator"
          component={HelperNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HelperDetailScreen"
          component={HelperDetails}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CallingScreen"
          component={Calling}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ChatScreen"
          component={Chat}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="WalletScreen"
          component={Wallet}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="HelperDashboard"
          component={HelperDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HelperChatHistory"
          component={HelperChatHistory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HelperCallHistory"
          component={HelperCallHistory}
          options={{ headerShown: false }}
        />

        {/* <Stack.Screen
          name="Onboarding"
          component={Intro}
          options={{ headerShown: false }}
        /> */}

        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{
            title: 'My Orders',
          }}
        />
        <Stack.Screen
          name="AddCreditCard"
          component={AddCreditCard}
          options={{
            title: 'Add Credit Card',
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={({ navigation }) => ({
            title: 'Edit Profile',
            headerRight: () => (
              <HeaderIconButton
                onPress={() => navigation.goBack()}
                name={SAVE_ICON}
                color={Colors.primaryColor}
              />
            ),
          })}
        />
        <Stack.Screen
          name="HelperEditProfile"
          component={HelperEditProfile}
          options={({ navigation }) => ({
            title: 'Edit Profile',
            headerRight: () => (
              <HeaderIconButton
                onPress={() => navigation.goBack()}
                name={SAVE_ICON}
                color={Colors.primaryColor}
              />
            ),
          })}
        />
        <Stack.Screen
          name="PaymentMethod"
          component={PaymentMethod}
          options={({ navigation }) => ({
            title: 'Payment Method',
            headerRight: () => (
              <HeaderIconButton
                onPress={() => navigation.goBack()}
                name={SAVE_ICON}
                color={Colors.primaryColor}
              />
            ),
          })}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigatorA;
