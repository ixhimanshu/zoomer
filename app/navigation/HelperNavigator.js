import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HelperDashboard from '../screens/helperDashboard/HelperDashboard';
import Settings from '../screens/settings/Settings';
import SeekerHistory from '../screens/history/SeekerHistory';
import Wallet from '../screens/wallet/Wallet';
import HelperSettings from '../screens/settings/HelperSettings';
import HelperCallHistory from '../screens/history/HelperCallHistory';
import HelperChatHistory from '../screens/history/HelperChatHistory';

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
            iconName = `facebook-messenger`;
          } else if (route.name === 'History') {
            iconName = `call-missed`;
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

      <Tab.Screen title="HIm" name="Home" component={HelperDashboard} />
      <Tab.Screen name="History" component={HelperCallHistory} />

      <Tab.Screen name="Intralink" component={HelperChatHistory} />
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


      <Tab.Screen name="User" component={HelperSettings} />


    </Tab.Navigator>
  );
}

export default HomeNavigator;
