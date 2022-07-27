import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';

import { RFPercentage as rfp, RFValue as rfv } from "react-native-responsive-fontsize";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';


const dew_Height = Dimensions.get('window').height
const dew_Width = Dimensions.get('window').width

const ShowTicketComponent = props => {


    return (
        <View style={styles.dolerButtonContainer}>
           
            <TouchableOpacity style={[styles.buttonStyle]}
                onPress={props.onPress}
               // disabled={ props.ticketPrice===props.dolerPress?true:false}
               >
                    {dew_Width<=300?
                    <Text style={styles.dolerText}>${props.ticketPrice}</Text>:
                       props.ticketPrice===props.dolerPress? <LottieView source={require('../../Animations/85032-loader-mat.json')}
                       autoPlay loop
                       style={styles.lottieStyleSaveButton} />:
                    <ImageBackground source={require('../../Images/dashboardIcons/money.png')} style={styles.dolerImage}>
                      
                        <Text style={styles.dolerText}>${props.ticketPrice}</Text>

                    </ImageBackground>}

            </TouchableOpacity>
         

        </View>

    )
}



const styles = StyleSheet.create({
    dolerButtonContainer: {
        flex: dew_Width>600?6:6,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'space-between',
        alignItems: 'flex-start',
        alignSelf:'flex-start',
        height:"100%",
        width: '100%',
        marginHorizontal: dew_Width>700?0:2.5,
        //marginVertical:dew_Width>700?0:2.5,
        paddingVertical  : dew_Width>700?5:3,
        paddingHorizontal: dew_Width>600?4:0,
        //backgroundColor:'red'
  
       
     
        
       


    },
    buttonStyle: {
        backgroundColor: '#19254a',
        borderRadius: 5,
        width:dew_Width>700?wp(15):wp(17),
        maxWidth: '100%',
        width:'100%',
        height:hp("7%"),
        justifyContent: 'center',       
        alignItems: 'center',
        alignSelf:'flex-start',
        alignContent: 'flex-start',      
       // paddingVertical:  dew_Width>700?"10%":"8%",
     
    



    },
    dolerText: {
        color: 'white',
        fontSize: rfv(10),
        alignItems: 'center',
        textAlign: 'center',
        alignSelf: 'center',
       
       // padding: dew_Width>600?rfp(1):rfp(1.5),
        opacity: 0.99



    },
    dolerImage:{
         width: dew_Width>700? rfp(6):  rfp(7),
         height: dew_Width>700? rfp(4):  rfp(5),
         alignSelf:'center',
         alignItems:'center',
         justifyContent:'center'
        
        
        
        
         
    }
})

export default ShowTicketComponent;