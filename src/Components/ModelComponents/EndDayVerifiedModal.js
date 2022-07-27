import React, { useState,useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback, FlatList,Alert, ImageBackground, StyleSheet, SafeAreaView, ScrollView, Platform, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { Tooltip } from 'react-native-elements/dist/tooltip/Tooltip';
import { RFPercentage as rfp, RFValue as rfv } from "react-native-responsive-fontsize";
import colors from '../../Colors/Color';
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { ConformPacksAction } from '../../store/actions/TicketInventoryActions';
import LottieView from 'lottie-react-native';
import EndDayModelTicketsList from './EndDayModelTicketsList';
import { EndDayActions } from '../../store/actions/EndDayEndShiftActions';
import axios from 'axios';
const EndDayVerifiedModel = props => {
    let dispatch = useDispatch();
    ////////////////// User Credentials from redux ///////////////
    const userCredentials = useSelector(state => state.userCredentials.userdata);
    /////////////////// Model States/////////////
    const [editorNumbers, setEditorNumbers] = useState('');
    const [nullSubmit, setNullSubmit] = useState(false);
    const [isloading, setIsLoading] = useState(false);
    const [missingTicketsData, setMissingTicketsData]=useState('')
   // console.log("Missing Tickets are:", missingTicketsData)
   // console.log("editor numbers:",editorNumbers)
   // console.log(userCredentials['end_day_validation_url'])
    const richText = React.useRef();


    ///////////////// Input Handler /////////////////
    const inputHandler = (text) => {

        var content = text;
        content = content.replace(/<[^>]*>/g, ',');

        let inputARRAY = content.replace(/,+/g, ',');
        let replaceFirstComma = inputARRAY.replace(/^,/, '')
        let scan_codes = replaceFirstComma.replace(/,\s*$/, "")
        setEditorNumbers(scan_codes)

    }




    setTimeout(function () {
        setNullSubmit(false)
        setIsLoading(false)
    }, 12000);
    /////////////// Api call ////////////////////////
    const conformHandler = async () => {

        if (!editorNumbers) {
            setNullSubmit(true)
            console.log("null sublit")
            return;

        } else {
            try {
                url = userCredentials['end_day_validation_url']
                
                scan_codes = editorNumbers
                accessToken = userCredentials['accessToken']
                setMissingTicketsData('')
                let response= await fetch(url, {
                   method: 'POST',
                   body: JSON.stringify({
                   ed_scan_code:scan_codes
                   }),
                   headers: {
                     'Content-Type': 'application/json; charset=UTF-8',
                     'Authorization': 'Bearer '+accessToken
                   },
                 }).then(response => response.json())
                
                 setMissingTicketsData(response.missing_html)
                // setEditorNumbers('')
             
                 console.log("Ed scane code  is:", response.ed_scan_code);
                 console.log("Ed scane code  is:", response);
               
                /* if(response.success===0){
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
                 }*/
                 
               
                
                     
                     
                   
             
                 // return true;
               } catch (err) {
                 throw new Error(err.message);
               }
             };
    }

    
////////////////////////// Api coll /////////////////////////

////////////////////////////////////////////////////////////
    return (
       
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.modalView}>
                <View style={styles.modelCloss}>
                    <TouchableOpacity onPress={props.onClose}>
                        <Icon name="close" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.successIconContainer}>
                   
                        <Icon name="done" size={rfv(50)} color="white" />
                   
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20, marginTop: 20 }}>
                    <Text style={styles.modelText}>{props.msg}</Text>
                    <TouchableOpacity onPress={conformHandler} style={[styles.modelButtons, { backgroundColor: '#208EFD', }]}>
                        {isloading ?

                            <ActivityIndicator size="small" color="#0000ff" paddingHorizontal={20} />
                            :
                            <Text style={styles.buttonText}>Next</Text>}
                    </TouchableOpacity>
                </View>
               
               
            </View>
        </TouchableWithoutFeedback>
               

    )
}

















const styles = StyleSheet.create({
    modalView: {
       flex:1,
        marginHorizontal: 60,
        backgroundColor: "gray",
        zIndex:0
      
        

    },
    modelCloss: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 10

    },
   


    ButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',


    },

    buttonText: {
        color: 'white',
        fontSize: rfv(12),
        fontWeight: '700'
    },


    successIconContainer:{
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        borderWidth:5,
        height: 70,
         width: 70,
         borderColor: 'red',
        borderRadius: 50,

    },


    /////////////////////////////////////////////////

    modelButtons: {
        marginHorizontal: 10,
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 50,
        marginBottom: 20,
        borderRadius: 5,
    },






})

export default EndDayVerifiedModel;