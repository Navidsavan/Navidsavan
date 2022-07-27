import {UserVarification} from './AuthConstants';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';





export const login = (email, password, selectedServer, rememberMe) => {
  return async (dispatch, getState) => {
   
      let url='';
      if(selectedServer==="live")
      {
        url='https://stage.lotteryscreen.app/api/user/login';
      }
      else if(selectedServer==="beta")
      {
        url='https://beta.lotterydisplay.app/api/user/login';
      }
      else if(selectedServer==="staging")
      {
        url='https://staging.lotterydisplay.app/api/user/login';
      }
      
  
    try {
      
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      const data = await res.json();
      if (res.status !== 200 && data?.error) {
        throw new Error(data.error);
      } else if (res.status !== 200) {
        throw new Error('Something went wrong!');
      } else if(data.success!=1){
        return Alert.alert(
            'Invalid Email or Password',
            'Enter a valid Email & password &  try again',
            [{text: 'OK'}],
           
          );
        
      }
      storeData(data);
      if(rememberMe){
      let userLoginData={
        email: email,
        password:password,
        rememberMe:rememberMe
      }
      await AsyncStorage.setItem("userInfo", JSON.stringify(userLoginData));
    }
    else{
      await AsyncStorage.setItem("userInfo", "null");
     

    }
      dispatch({type: UserVarification.USER_DATA, payload: data});
      
      return true;
    } catch (err) {
      Alert.alert(
        err.message + "!",
             "Check your network and try again", [
             { text: 'OK' },]
     )
    }
  };
};

const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('user_data', jsonValue);

  } catch (e) {
    throw new Error(e.message);
  }
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};
