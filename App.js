import 'react-native-gesture-handler';
import SplashScreen from 'react-native-lottie-splash-screen'
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import HomeScreen from './src/Screens/HomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import { MainNavigator, TestNavigator } from './src/Navigation/StackNavigator';
import LottieView from 'lottie-react-native';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import colors from './src/Colors/Color';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
//import thunk from 'redux-thunk';
import auth from './src/store/reducers/LoginReducer';
import TicketGameNumberReducer from './src/store/reducers/TicketGameNumberReducer';
import TicketOnNumberReducer from './src/store/reducers/TicketOnNumberReducer';
import RecommendedSlotReducer from './src/store/reducers/RecommendedSlotReducer';
import { color } from 'react-native-reanimated';








const rootReducer = combineReducers({
  userCredentials: auth,
  modelData: TicketGameNumberReducer,
  TicketOnNumberData: TicketOnNumberReducer,
  RecommendedSlotModelData: RecommendedSlotReducer,
  

});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default function App() {
  
 /* useEffect(() => {
    SplashScreen.hide(); 
  }, []);*/
 
  return (

    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
      <StatusBar backgroundColor={colors.tertiary}/>
         <MainNavigator/>
      </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
   
  )

}


const styles = StyleSheet.create({
  spinnerStyling: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',

  },
})

