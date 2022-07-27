import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import axios from 'axios';



 export const showTicket = (url,ticket_amount, accessToken) => {
  

    return async (dispatch, getState) => {
    
      try {
         await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
          "ticket_amount":ticket_amount
          }),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer '+accessToken
          },
        })
        
       // return true;
      } catch (err) {
        Alert.alert(
          err.message + "!",
               "Check your network and try again", [
               { text: 'OK' },]
       )
      }
    };
  };


