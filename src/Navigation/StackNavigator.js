import React from "react";
import { View, Text } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../Screens/User/LoginScreen";
import SwitchScreen from "../Screens/User/SwitchScreen";
import { useDispatch } from 'react-redux';
import AddWinnerScreen from "../Screens/AddWinnerScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import EndShiftScreen from "../Screens/EndhiftScreen";
import ConformPackScreen from "../Screens/ConformPackScreen";
import ActivePackScreen from "../Screens/ActivePackScreen";
import RecommendedGameScreen from "../Screens/RecommendedGameScreen";
import RecommendedSlotScreen from "../Screens/RecommendedSlotScreen";
import TicketOnNumberScreen from "../Screens/TicketOnNumberScreen";




const Stack = createStackNavigator();





const LoginNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            defaultScreenOptions: {
                gesturesEnabled: false,
                swipeEnabled: false
            }

        }} >
            <Stack.Screen name='Login' component={LoginScreen} />
        </Stack.Navigator>
    )
}


export const AppNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            gestureEnabled: false,

            

        }} >
            <Stack.Screen name='homeTab' component={BottomTabNavigator}/>
            <Stack.Screen name='camra' component={AddWinnerScreen}/>
            <Stack.Screen name="EndShift" component={EndShiftScreen}/>
            <Stack.Screen name="conformPack" component={ConformPackScreen}/>
            <Stack.Screen name="activePack" component={ActivePackScreen}/>
            <Stack.Screen name="recommendedGame" component={RecommendedGameScreen} />
            <Stack.Screen name="recommendedSlot" component={RecommendedSlotScreen}/>
            <Stack.Screen name="onNumber" component={TicketOnNumberScreen}/>
           
        </Stack.Navigator>
    )
}

////////////////////////////


////////////////




export const MainNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
             gestureEnabled: false,
             defaultScreenOptions:{
                 gesturesEnabled: false,
                 swipeEnabled: false
             }

    }} >

          
            <Stack.Screen name='Switch' component={SwitchScreen} options={{
                gestureEnabled: false,
                  defaultScreenOptions:{
                    
                     swipeEnabled: false
                 }

           }} />
            <Stack.Screen name='login' component={LoginNavigator} options={{
                            gestureEnabled: false,
                             defaultScreenOptions:{
                               
                                swipeEnabled: false
                            }
                    
                        }}/>

            <Stack.Screen name='home' component={AppNavigator} options={{
                 gestureEnabled: false,
                  defaultScreenOptions:{
                    
                     swipeEnabled: false
                 }

            }} />
            

        </Stack.Navigator>
    )
}
