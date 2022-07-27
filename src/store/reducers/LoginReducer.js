
import {UserVarification} from '../actions/AuthConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation } from '@react-navigation/native';
const intialState = {
  userdata: [],
  
};


const auth = (state = intialState, action) => {
   if (action.type === UserVarification.USER_DATA) {
    return {...state, userdata: action.payload};
  } else if (action.type === 'LOGOUT') {
   
   
    AsyncStorage.removeItem('user_data');
  
   
    
    return  {
      ...state,
      
      //userdata: null
    }
    
      
  }
  return state
 
};

export default auth;