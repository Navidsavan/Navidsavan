import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Alert, Modal, Text, View, Button} from 'react-native';






///////////////////// Active Packets Action////////////////
export const EndDayActions=(url, scan_codes, accessToken )=>{
  


 return async (dispatch, getState) => {
   

  try {
   let response= await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
      ed_scane_code:scan_codes
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer '+accessToken
      },
    }).then(response => response.json())
   
    console.log(response.success)
  
    if(response.success===0){
        Alert.alert(
          'Please Conform!',
          response.msg, [
          { text: 'OK' },
      ]);
      }
        else{
          Alert.alert(
          ' Packs Conformed!',
          response.msg, [
          { text: 'OK' },
      ])
    }
    
  
   
        
        
      

    // return true;
  } catch (err) {
    throw new Error(err.message);
  }
};
}

