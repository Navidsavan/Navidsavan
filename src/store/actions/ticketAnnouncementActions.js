import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import axios from 'axios';



 export const ticketAnnouncement = (url,accessToken) => {
  
  //return axios.post(ShowTicketurl) //return post request 
    
    return async (dispatch, getState) => {
    
      try {
         await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            
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


