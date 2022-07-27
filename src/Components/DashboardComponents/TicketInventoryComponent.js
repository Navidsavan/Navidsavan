import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
  Modal,
  Alert,
  TextInput,
  ScrollView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { Tooltip } from 'react-native-elements/dist/tooltip/Tooltip';
import { RFPercentage as rfp, RFValue as rfv } from "react-native-responsive-fontsize";
import colors from '../../Colors/Color';
import { Icon } from 'react-native-elements';
import ConformPackScreen from '../../Screens/ConformPackScreen';
import ActivePacksModel from '../../Screens/ActivePackScreen';
import { useSelector, useDispatch } from 'react-redux';
import { TicketInventory } from '../../store/actions/TicketInventoryActions';
import LottieView from 'lottie-react-native';


//import Repeater from 'react-simple-repeater';



const dew_Height = Dimensions.get('window').height
const dew_Width = Dimensions.get('window').width

const TicketInventoryComponent = (props) => {
  let dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const userCredentials = useSelector(state => state.userCredentials.userdata);
  const [activePackmodalVisible, setActivePackModalVisible] = useState(false);
  const [conformPackmodalVisible, setConformPackModalVisible] = useState(false);


  ////////////////////Loading spinner timeout////////////////////////////////
  setTimeout(() => {
    setLoading(false)
  }, 1200);
  ////////////////////////// Orientation Listner//////////////
  /* const [orientation, setOrientation] = useState(null)
 
 
   const isPortrait = () => {
     const dim = Dimensions.get('screen');
     return dim.height >= dim.width;
   };
 
   useEffect(() => {
      const callback = () => setOrientation(isPortrait() ? 'portrait' : 'landscape');
    
      Dimensions.addEventListener('change', callback);
    
     // return () => {
       // Dimensions.remove('change', callback);
     // };
    }, []);*/

  ///////////////////////////////////////////////////////////////////////////////////////

  const submitHandler = () => {
    setLoading(true)
    return dispatch(TicketInventory(
      url = userCredentials['refresh_url'],
      accessToken = userCredentials['accessToken']))
  };

  return (

    <View style={styles.TiButtonsContainer}>


      <TouchableOpacity style={[styles.button]} onPress={props.onActivePackPress} >
        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center',alignItems:'center', alignSelf:'center'}}>
          <View style={{ display: 'flex', flexDirection:  "column", justifyContent: 'center', alignItems: 'center',width:dew_Width<600?'100%':'80%' }}>
            <Image source={require('../../Images/dashboardIcons/activePacket.png')} style={styles.imageStyle} />
            <Text style={styles.buttonsText}>Activate Packs</Text>

          </View>
          <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            {/*dew_Width > 700 ?
              <View style={styles.smallButtons}>
                <Tooltip
                  animated={true}
                  width={rfp(30)}
                  fontSize={20}
                  height={rfp(5)}
                  closeOnOutsidePress={true}
                  backgroundColor="#0167ea"
                  overlayColor={false}




                  popover={<Text style={styles.toolTipText}>Active game pack to sell</Text>}>
                  <Text style={styles.questionMark}>?</Text>

                </Tooltip>
  </View> : <Text></Text>*/}
          </View>
        </View>


      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={props.onConformPress}>
        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between', }}>
          <View style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center',width: dew_Width<600?'100%':'80%'}}>
            <Image source={require('../../Images/dashboardIcons/conform.png')} style={styles.imageStyle} />
            <Text style={styles.buttonsText}>Confirm Packs</Text>

          </View>
          <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            {/*dew_Width > 700 ?
              <View style={styles.smallButtons}>
                <Tooltip
                  animated={true}
                  width={rfp(30)}
                  fontSize={20}
                  height={rfp(5)}
                  closeOnOutsidePress={true}

                  backgroundColor="#0167ea"
                  overlayColor={false}
                  position='absolute'
                  //displayInsets={ top= 24, bottom= 24, left=24, right= 24 }
                  popover={<Text style={styles.toolTipText}>Refresh display if missing slots are display alignment issue</Text>}>
                  <Text style={styles.questionMark}>?</Text>

                </Tooltip>
</View> : <Text></Text>*/}
          </View>
        </View>


      </TouchableOpacity>
      <TouchableOpacity
        onPress={submitHandler}
        style={styles.button}>
        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between', }}>
          <View style={{ display: 'flex', flexDirection:"column", justifyContent: 'center', alignItems: 'center', width:dew_Width<600?'100%':'80%' }}>
            {loading ? (

              <LottieView source={require('../../Animations/85032-loader-mat.json')}
                autoPlay loop
                style={styles.lottieStyle} />
            ) : (
              <><Image source={require('../../Images/dashboardIcons/refresh.png')} style={styles.imageStyle} />
                <Text style={styles.buttonsText}>Refresh Display</Text></>
            )}
          </View>
          <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            {/*dew_Width >700 ?
              <View style={styles.smallButtons}>
                <Tooltip
                  animated={true}
                  width={rfp(30)}
                  fontSize={20}
                  height={rfp(5)}
                  closeOnOutsidePress={true}

                  backgroundColor="#0167ea"
                  overlayColor={false}


                  popover={<Text style={styles.toolTipText}>Refresh display if missing slots are display alignment issue</Text>}>

                  <Text style={styles.questionMark}>?</Text>
                </Tooltip>
            </View> : <Text></Text>*/}
          </View>
        </View>


      </TouchableOpacity>
    </View>
  )
}



const styles = StyleSheet.create({
  TiButtonsContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: dew_Height > 700 ? 10 : 5



  },


  button: {
    alignItems: dew_Width <= 600 ? 'center' : 'stretch',
    paddingHorizontal: 8,
    width: dew_Width > 700 ? '32.5%' : '32.2%',
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#19254a'


  },
  imageStyle: {
    width: rfp(5),
    height: rfp(5),
   // marginRight: 10,




  },

  buttonsText: {
    fontSize: rfv(10),
    color: 'white',
    marginLeft: 5,
    alignSelf:'center',
    textAlign: 'center',


  },
  smallButtons: {
    borderRadius: 1000,
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#3F5681',
    width: rfp(3),
    height: rfp(3),
    justifyContent: 'center',
    alignItems: 'center',

  },
  toolTipText: {
    position: 'absolute',
    fontSize: rfp(1.5),
    color: 'white',
    padding: 20

  },
  questionMark: {
    alignSelf: 'center',
    fontSize: rfp(1.5),
    color: '#0468eb',
    fontWeight: 'bold',


  },

  lottieStyle: {
    marginLeft:dew_Width>700? 10:0,
    width: rfp(7),


  },


 



})

export default TicketInventoryComponent;