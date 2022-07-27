import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ModelEditor from '../Components/ModelComponents/ModelEditor';
import ModelScanner from '../Components/ModelComponents/ModelScanner';
import { color } from 'react-native-reanimated';
import colors from '../Colors/Color';

const Tab = createMaterialTopTabNavigator();

const ModelTab=()=>{
  return (
  
    <Tab.Navigator    screenOptions={{
      tabBarLabelStyle: { fontSize: 12 },
      tabBarItemStyle: { width:100 },
      tabBarActiveTintColor: '#208EFD',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: { backgroundColor: "transparent" },
     
    }}>
      <Tab.Screen name="Manual" component={ModelEditor}  options={{ 
      
         tabBarLabelStyle:{
         fontWeight: '400',
         backgroundColor: '#ECE8E4',
         paddingHorizontal:6,
         paddingVertical:10,
        borderRadius: 10,
         width: '100%',
       
        },
       
       }}/>
      <Tab.Screen name="Scanner" component={ModelScanner}
      options={{ 
      
        tabBarLabelStyle:{
        fontWeight: '400',
        backgroundColor: '#ECE8E4',
        paddingHorizontal:6,
        paddingVertical:10,
       borderRadius: 10,
        width: '100%',
      
       },
      
      }}/>
    </Tab.Navigator>
    
  );
}

export default ModelTab;