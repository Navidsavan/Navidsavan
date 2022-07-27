import React, {useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView,KeyboardAvoidingView, Modal,Image, Alert,  StyleSheet, Dimensions, Platform } from 'react-native';
//import { Icon } from 'react-native-elements'
import { RFPercentage as rfp, RFValue as rfv } from "react-native-responsive-fontsize";
import { Tooltip } from 'react-native-elements/dist/tooltip/Tooltip';
import Icon from 'react-native-ionicons';
import EndDayScreen from '../ModelComponents/EndDayScreen';
import ConformPacksModel from '../ModelComponents/ConformPacksModel';
import colors from '../../Colors/Color';
import EndDayVerifiedModel from '../ModelComponents/EndDayVerifiedModal';
import EndShiftModal from '../ModelComponents/EndhiftScreen';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';




const dew_Height = Dimensions.get('window').height
const dew_Width = Dimensions.get('window').width

const EndShiftComponent = (props) => {
    const [endDayModelVisible, setEndDayModelVisible]=useState(false)
    const [endShiftModelVisible, setEndShiftModelVisible]=useState(false)
   



    return (
      
        <View style={styles.buttonsContainer}>
            <Modal
                animationType="slide"
                transparent={true}
               
                //backgroundColor={colors.tertiary}
                visible={endDayModelVisible}
                onRequestClose={() => {
                  setEndDayModelVisible(!endDayModelVisible);
                }}>
                  
  

                <EndDayModel onClose={() => setEndDayModelVisible(!endDayModelVisible)} />
              </Modal>


              <Modal
                animationType="slide"
                transparent={true}
               
                //backgroundColor={colors.tertiary}
                visible={endShiftModelVisible}
                onRequestClose={() => {
                  setEndShiftModelVisible(!endShiftModelVisible);
                }}>
                  
  

                <EndShiftModal onClose={() => setEndShiftModelVisible(!endShiftModelVisible)} />
              </Modal>

           
           <TouchableOpacity onPress={props.onAddWinerPress} style={[styles.Buttons,{backgroundColor: '#0E8A79'}]}> 
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center'}}>
                       
                        <Text style={styles.buttonText}>Add Winner</Text>
                          </View>   
           </TouchableOpacity>
            <TouchableOpacity onPress={()=>setEndShiftModelVisible(true)} style={styles.Buttons}>
                        <Text style={styles.buttonText}>End Shift</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>setEndDayModelVisible(true)} style={[styles.Buttons,{backgroundColor: '#CF7871'}]}>    
                        <Text style={styles.buttonText}>End Day</Text>
            </TouchableOpacity>
            
        </View>
           


    )
}


const styles=StyleSheet.create({
    buttonsContainer:{
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
         paddingHorizontal: 10,
        paddingVertical: 5,
        width: wp('100%'),
        height: hp('100%'),
        position: 'absolute'
       
       //backgroundColor: 'red'
      
        

    },
    Buttons: {
        backgroundColor: '#3D9ED5',
        borderRadius: 5,
        justifyContent:'center',

        alignItems: 'center',
        width: dew_Width<=600?wp('30%'):dew_Width<=900 && dew_Width>600 ?wp('32%'):wp('32.2%'),
       
        height: hp('8%'),
        

        
       

      },
     
      
       
      buttonText: {
        fontSize: rfp(1.5),
        alignSelf: 'center',
        color: 'white',
        textAlign: 'center'
      
      },
      //////////////////            Model STYLING              /////////////
      modelView:{
        
           marginTop: 100,
           marginHorizontal: 20,
           backgroundColor: colors.tertiary,
      }

})

export default EndShiftComponent;