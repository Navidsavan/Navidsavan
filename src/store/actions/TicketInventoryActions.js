import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Alert, Modal, Text, View, Button, Dimensions} from 'react-native';
import {UserVarification} from './AuthConstants';





///////////////////// Active Packets Action////////////////
export const ActivePacketAction=(url,  slotStartNumber,   slotEndNumber,  gameCodes, accessToken )=>{
  


 return async (dispatch, getState) => {
   

  try {

  let activation = [
    {
      slotStartNumber:slotStartNumber,
      slotEndNumber: slotEndNumber,
      gameCodes:gameCodes
    },
  ]


   let response= await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        slotStartNumber:slotStartNumber,
        slotEndNumber: slotEndNumber,
        gameCodes:gameCodes
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer '+accessToken
      },
    }).then(response => response.json())
   
   
    if(response.success===0){
      Alert.alert(
        response.success===0? "Activation Failed!" :response.errors,
        //response.errors
        !response.errors?response.msg:response.errors, [
        { text: 'OK' },
    ]);
    }
      else{
        Alert.alert(
          response.msg,
        response.errors, [
        { text: 'OK' },
    ])
  }
    
  
   
        
        
      

    // return true;
  } catch (err) {
  
    Alert.alert(
      err.message + "!",
           "Check your network and try again", [
           { text: 'OK' },]
   )
  }
};
}

///////////////////// conform packs Packets Action////////////////
export const ConformPacksAction=(url,   scan_codes, accessToken )=>{


 return async (dispatch, getState) => {
  try {
   let response= await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        "scan_codes": scan_codes
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer '+accessToken
      },
    }).then(response =>response.json())
   
    
    if(response.success===0){
      Alert.alert(
        'Invalid Scane Code!',
        response.error, [
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
    
  } catch (err) {
    Alert.alert(
      err.message + "!",
           "Check your network and try again", [
           { text: 'OK' },]
   )
  }
};
}






//////////////////// refresh //////////////////////////
 export const TicketInventory = (url,accessToken) => {
  
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


