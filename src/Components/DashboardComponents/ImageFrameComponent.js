import React from "react";
import { View, Text, StyleSheet, Image,TouchableOpacity, FlatList } from "react-native";
import colors from '../../Colors/Color';
import FramesData from "../../Data/FramesData";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from "react-native-gesture-handler";
import { RFPercentage as rfp, RFValue as rfv } from "react-native-responsive-fontsize";

const ImageFrameComponent = (props) => {
    return (
        <View style={styles.container}>                 
               <TouchableOpacity onPress={props.onPress} style={styles.frameButton}>

                <Image
                    source={props.frameUrl}
                    style={styles.frameStyle}
                    />
              </TouchableOpacity>
              
            
    
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //width:"100%",
        //height:"100%",
        justifyContent:'flex-end',
        alignContent:'flex-end',
        alignSelf:'flex-end',
       // backgroundColor:colors.tertiary,
        
        
        
        
    },
   
    frameStyle: {
        width: rfv(60),
        height:rfv(80),
        marginHorizontal:10,
        //backgroundColor:"white"
      

    },
  
})


export default ImageFrameComponent;