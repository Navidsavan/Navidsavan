import React, {useEffect} from 'react';
import { Alert } from 'react-native';
import {TicketsModelData, TicketOnNumberData, RecommendedSlotsData} from './AuthConstants';
import { useSelector } from 'react-redux';
import axios from 'axios';



 export const ticketGame = (url,accessToken) => {
  
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




  export const GamesSlotsNumbers = (url,setting_name, pickage_id, accessToken) => {
  
    //return axios.post(ShowTicketurl) //return post request 
     
      return async (dispatch, getState) => {
        try {
           await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
              setting_name: setting_name,
              pickage_id: pickage_id
              
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
  


    export const RecommendedGamesModel = (url, setting_name, recommended_slot_input, accessToken) => {
  
      //return axios.post(ShowTicketurl) //return post request 
        
        return async (dispatch, getState) => {
          try {
             await fetch(url, {
              method: 'POST',
              body: JSON.stringify({
                setting_name: setting_name,
                recommended_slot_input:  recommended_slot_input
                
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
    

//////////////////////////// Resset Game Numbers /////////////////////////////
      export const ResetGameNumbers = (url, setting_name, accessToken) => {
  
        //return axios.post(ShowTicketurl) //return post request 
          
          return async (dispatch, getState) => {
            try {
               await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                  setting_name: setting_name,
                 
                  
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

////////////////////////////// recommended Game Numbers MODEL DATA /////////////////////////////



export const recommendedGameNumbers = (url, setting_name, accessToken) => {
  return async (dispatch, getState) => {
   

    try {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          setting_name : setting_name
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer '+accessToken
        },
      });
      const data = await res.json();
      let modelData=data.slots
      if (res.status !== 200 && data?.error) {
        throw new Error(data.error);
      } else if (res.status !== 200) {
        throw new Error('Something went wrong!');
        
      }
     
      dispatch({type:  TicketsModelData.MODEL_DATA, payload: modelData});
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


////////////////////////////// Recommended Slots Model Data /////////////////////////////



export const recommendedSlots = (url, setting_name, accessToken) => {
  return async (dispatch, getState) => {
   

    try {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          setting_name : setting_name
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer '+accessToken
        },
      });
      const data = await res.json();
     
      let slotData=data.slots
      if (res.status !== 200 && data?.error) {
        throw new Error(data.error);
      } else if (res.status !== 200) {
        throw new Error('Something went wrong!');
        
      }
     
      dispatch({type:  RecommendedSlotsData.SLOT_DATA, payload: slotData});
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


////////////////////////////// Ticket On Number Model Data /////////////////////////////



export const ticketOnNumbers = (url, setting_name, accessToken) => {
  return async (dispatch, getState) => {
   

    try {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          setting_name : setting_name
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer '+accessToken
        },
      });
      const data = await res.json();
      let numberData=data.slots
      if (res.status !== 200 && data?.error) {
        throw new Error(data.error);
      } else if (res.status !== 200) {
        throw new Error('Something went wrong!');
        
      }
     
      dispatch({type:  TicketOnNumberData.NUMBER_DATA, payload: numberData});
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



