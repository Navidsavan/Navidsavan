import React, {useEffect} from 'react';
import {Text, View, ActivityIndicator, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {UserVarification} from '../../store/actions/AuthConstants';

import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


const dew_Height = Dimensions.get('window').height
const dew_Width = Dimensions.get('window').width
const SwitchScreen = () => {
 

  const dispatch=useDispatch();
  const nav = useNavigation();
  //AsyncStorage.clear();
  AsyncStorage.getItem('user_data')
    .then(jsonValue => {
      if (jsonValue != null) {
        jsonValue = JSON.parse(jsonValue);
       
       
        // The number is the number of seconds since Jan 1 1970
        if (jsonValue.accessToken) {
          dispatch({type: UserVarification.USER_DATA, payload: jsonValue});
            nav.navigate('home');
            //console.log("accesstoken is:", jsonValue.accessToken);
          //////////////// Time session //////////////////////
          const date = new Date();
          const currentTimeMs = date.getTime();
          const futureExpTimeMs = jsonValue.exp *1000;
            // console.log(currentTimeMs, '2');
          if (futureExpTimeMs >= currentTimeMs) {
            nav.navigate('home');
          }
        } else {
          nav.navigate('login');
        }
      } else {
        nav.navigate('login');
      }
    })
    .catch(err => {
      console.log(err);
    });

  return <></>;
};

export default SwitchScreen;
