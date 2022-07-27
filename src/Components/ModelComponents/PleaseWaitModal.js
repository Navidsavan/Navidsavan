import { Prop } from "ionicons/dist/types/stencil-public-runtime";
import React from "react";
import {
    View, 
    Text, 
    TouchableOpacity,
    Platform,
    StyleSheet} from 'react-native';
import colors from "../../Colors/Color";
import {
    RFPercentage as rfp,
    RFValue as rfv
  } from "react-native-responsive-fontsize";
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';
  import  Icon  from "react-native-vector-icons/Entypo";
  import Ionicons from "react-native-vector-icons/Ionicons";

  import LottieView from 'lottie-react-native';



const PleaseWaitModal=(props)=>{
    return(
       
        <View style={styles.modalConatiner}>



        <View style={styles.dataContainer}>
       <View style={styles.LottieViewContainer}>
            {Platform.OS != 'web' ?
              <LottieView source={require('../../Animations/85032-loader-mat.json')}
                autoPlay loop
                style={styles.lottieStyle} /> : null}
               
          </View>
          <Text style={styles.waitText}>Please Wait..</Text>
           
          </View> 
          



              </View>
        
    )
}

const styles=StyleSheet.create({
    modalConatiner:{
        width:'100%', 
        height: '100%', 
        backgroundColor: "transparent", 
        justifyContent:'center',
        alignItems:'center',
       
    },

    LottieViewContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    
    
    
    
      },
     
      lottieStyle: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: hp("20%"),
        width: wp("100%"),
    
    
      },
      waitText:{
          fontSize:rfv(20),
          fontWeight:"900",
          color: 'green'
      }
    

})


export default PleaseWaitModal;