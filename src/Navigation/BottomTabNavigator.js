import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import { AppNavigator, MainNavigator } from './StackNavigator';
import colors from '../Colors/Color';
import { Dimensions } from 'react-native'
import EndShiftScreen from '../Screens/EndhiftScreen';
import EndDayScreen from '../Screens//EndDayScreen';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { RFPercentage as rfp, RFValue as rfv } from "react-native-responsive-fontsize";
import AddWinnerScreen from '../Screens/AddWinnerScreen';
import CameraScreen from '../Screens/User/CameraScreen';




const Tab = createBottomTabNavigator();


const dew_Height = Dimensions.get('window').height
const dew_Width = Dimensions.get('window').width




const BottomTabNavigator = (props) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior='order'


      screenOptions={{
        tabBarLabelPosition: 'below-icon',
        headerShown: false,
        tabBarIcon: true,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#B5B5B5",
        tabBarHideOnKeyboard: true,


        tabBarLabelStyle: {
          fontSize: rfv(10),
          paddingBottom: 5,
          
          color: 'white',



        },
        tabBarStyle: {
          //backgroundColor: colors.tertiary,
          height:Platform.OS=="android"? '8%': "10%",
          borderTopWidth: 0,



        },





      }}>
      <Tab.Screen name="Home" component={HomeScreen}

        options={{
          tabBarActiveTintColor: 'white',
          tabBarItemStyle: { backgroundColor: '#1d398c' },
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={dew_Width > 700 ? rfv(30) : rfv(25)} />
          ),



        }} />
     { Platform.OS=="android"?<Tab.Screen name='Add Winner' component={AddWinnerScreen}
        options={{
          tabBarActiveTintColor: 'white',

          tabBarItemStyle: { backgroundColor: '#008f21', borderColor: '#98A2BF' },

          tabBarIcon: ({ color, size }) => (
            <Icon name="trophy" color={color} size={dew_Width > 700 ? rfv(30) : rfv(25)} />
          ),
        }} />:null}
      <Tab.Screen name='End Shift' component={EndShiftScreen}
        options={{
          tabBarActiveTintColor: 'white',
          activeBorderColor: "red",
          tabBarItemStyle: { backgroundColor: '#0070ff', },

          tabBarIcon: ({ color, size }) => (

            <Icon name="calendar-clock" color={color} size={dew_Width > 700 ? rfv(30) : rfv(25)} />

          ),
        }} />
      <Tab.Screen name='End Day' component={EndDayScreen}
        options={{
          tabBarActiveTintColor: 'white',
          tabBarItemStyle: { backgroundColor: '#f93d3d', },
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar-check" color={color} size={dew_Width > 700 ? rfv(30) : rfv(25)} />
          ),

        }} />

    </Tab.Navigator>
  );
}


export default BottomTabNavigator;
