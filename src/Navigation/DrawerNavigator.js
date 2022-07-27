import React from 'react';
import { createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../Screens/HomeScreen';
import { Dimensions } from 'react-native'
import CameraScreen from '../Screens/AddWinnerScreen';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { RFPercentage as rfp, RFValue as rfv } from "react-native-responsive-fontsize";



const Drawer = createDrawerNavigator();


const dew_Height = Dimensions.get('window').height
const dew_Width = Dimensions.get('window').width


const DrawerNavigator=()=>{
    return(
        <Drawer.Screen name='home' component={HomeScreen}/>
    )
}
