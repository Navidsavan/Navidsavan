import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../../Colors/Color";
import { RFPercentage as rfp, RFValue as rfv } from "react-native-responsive-fontsize";




const dew_Height = Dimensions.get('window').height
const dew_Width = Dimensions.get('window').width


const LotteryNameModal=(props)=>{
    return(
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onLotteryPress} style={styles.lotteryNameButton}>
      <Text style={styles.lotteryNameStyle}>{props.lotteryName}</Text>
      </TouchableOpacity>      
       
    </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
       paddingVertical:10,
        
    },
    lotteryNameButton:{
        backgroundColor:colors.primary,
       width:'95%', 
       justifyContent:'center',
       alignItems:'center',
       alignSelf:'center',
      // marginVertical:10,
      borderWidth:1,
      borderColor: "white",      //'#98A2BF',
       borderRadius:5,
       height: dew_Width <= 600 ? 40 : 60,
    },
    lotteryNameStyle:{
        color:  "white",   //'#98A2BF',
        fontSize:rfv(10)
    }
   

})

export default LotteryNameModal;