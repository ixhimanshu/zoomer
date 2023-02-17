/**
 * loof - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import Home screen
import HelperListing from '../screens/helperlisting/HelperListing';

// import Settings screen
import Settings from '../screens/settings/Settings';


// import colors
import Colors from '../theme/colors';
import { color } from 'react-native-reanimated';
import SeekerHistory from '../screens/history/SeekerHistory';
import Wallet from '../screens/wallet/Wallet';

// HomeNavigator Config

type Props = {
  color: string,
  focused: string,
  size: number,
};

// create bottom tab navigator
const Tab = createBottomTabNavigator();

// HomeNavigator
function HomeNavigator() {
  return (
    <Tab.Navigator
      // initialRouteName="Home"
      backBehavior="initialRoute"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused, size }: Props) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          }
          else if (route.name === 'Search') {
            iconName = 'magnify';
          } else if (route.name === 'Intralink') {
            iconName = `call-split`;
          } else if (route.name === 'History') {
            iconName = `history`;
          } else if (route.name === 'User') {
            iconName = `account-settings-outline`;
          }

          // You can return any component that you like here!
          return  <Icon name={iconName} size={size} color={color} />;
          // return   <Text> HI</Text>;

        },
        tabBarLabel:false,
        tabBarShowLabel:false,
        headerShown: false
      })
      }
      >

      <Tab.Screen title="HIm" name="Home" component={HelperListing} />
      <Tab.Screen name="History" component={SeekerHistory} />

      <Tab.Screen name="Intralink" component={Wallet} />
      {/* <Tab.Screen name="Cart" component={Cart}
        options={{
          tabBarIcon: props => (
            <TabBadgeIcon
              name={`cart${props.focused ? '' : '-outline'}`}
              badgeCount={5}
              {...props}
            />
          ),
        }}
      /> */}


      <Tab.Screen name="User" component={Settings} />


    </Tab.Navigator>
  );
}

export default HomeNavigator;
