import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Platform,
  Modal,
  Alert
} from 'react-native';
import { Tooltip } from 'react-native-elements/dist/tooltip/Tooltip';
import {
  RFPercentage as rfp,
  RFValue as rfv
} from "react-native-responsive-fontsize";
import colors from '../Colors/Color';
import Icon from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector, useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import SweetAlert from 'react-native-sweet-alert';
import { clockRunning, JumpingTransition } from 'react-native-reanimated';
import AlertModal from '../Components/ModelComponents/AlertModal';
import { RNCamera } from 'react-native-camera';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCodeScanner from 'react-native-qrcode-scanner';


const dew_Height = Dimensions.get('window').height
const dew_Width = Dimensions.get('window').width


const ConformPackScreen = props => {
  let dispatch = useDispatch();
  const userCredentials = useSelector(state => state.userCredentials.userdata);
  let packageId = userCredentials["max_length"];



  let maxLength = userCredentials.scanner_code_length
  let manualLength = userCredentials.manual_code_length

  // const [modalVisible, setModalVisible] = useState(true);
  const [focusButton1, setFocuButton1] = useState('#208EFD');
  const [focusButton2, setFocuButton2] = useState('');
  const [focusButton3, setFocuButton3] = useState('');
  const [slotRequired, setSlotRequired] = useState(true);
  const [isloading, setIsLoading] = useState(false);
  const [nullSubmit, setNullSubmit] = useState(false);
  const [nullSlotNumber, setNullSlotNumber] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [responseData, setResponseData] = useState('');


  const [scannerVisible, setScannerVisible] = useState(false);
  const [scannnedBarCode, setScannedBarCode] = useState([]);

  const [slotNumber, setSlotNumber] = useState('');
  const [scaneCode, setScaneCode] = useState('');
  const [type, setType] = useState(0);


  ///////////////slot input Vallidation ///////////
  function isValidSlotNumber(slotNumber) {
    const re = /^[-,0-9 ]+$/
    return re.test(String(slotNumber))
  }
  /////////////////////////////////////////////////
  ///////////////scane code Vallidation ///////////
  function isValidScaneCode(scaneCode) {
    const re = /^[-,0-9 ]+$/
    return re.test(String(scaneCode))
  }
  /////////////////////////////////////////////////
  const onDisplayFocus = useCallback(() => {
    setFocuButton1('#208EFD');
    setFocuButton2('#0c1128');
    setFocuButton3('#0c1128');
    setSlotRequired(true);
    setSlotNumber('');
    setType(0)
  }, []);


  const onVendingFocus = useCallback(() => {
    setFocuButton1('#0c1128');
    setFocuButton2('#208EFD');
    setFocuButton3('#0c1128');
    setSlotRequired(false);
    setSlotNumber(1);
    setType(1);
  }, []);

  const onSellingFocus = useCallback(() => {
    setFocuButton1('#0c1128');
    setFocuButton2('#0c1128');
    setFocuButton3('#208EFD');
    setSlotRequired(false);
    setSlotNumber(1);
    setType(2);
  }, []);

  ////////////////////////////////Hold error msg for some moments when null submit //////////////////////////
  setTimeout(function () {
    setNullSubmit(false);
    setIsLoading(false);
    setNullSlotNumber(false);
  }, 16000);

  /////////////////////////////////////////////////////////////// Activate Handler ////////////////////////
  const activateHandler = async () => {
    if (!scaneCode || scaneCode.length != maxLength || slotRequired == true && !slotNumber) {
      if (!scaneCode) {
        setNullSubmit(true);
        return;
      }
      else if (!slotNumber) {
        setNullSlotNumber(true);
        return;
      }

      return;

    }
    else {
      try {
        setIsLoading(true);

        url = userCredentials['activate_url']
        accessToken = userCredentials['accessToken']




        let activation = [{ scan_code: scaneCode, slot_number: slotNumber, type: type }];




        let response = await fetch(url, {

          method: 'POST',
          body: JSON.stringify({
            activation: activation
          }),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + accessToken
          },
        }).then(response => response.json())

        setResponseData(response);
        setIsLoading(false);
        setModalVisible(true);




      } catch (err) {
        setIsLoading(false);
        Alert.alert(
          err.message + "!",
          "Check your network and try again", [
          { text: 'OK' },]
        )
      }
    };

  }


  /////////////////////////////////////////////// Modal close Handler ////////////////////////////////////////
  function modalClossHandler() {
    setResponseData('');
    setModalVisible(false);
    if (responseData.success != 0) {
      textInput.clear();
    }

  }
  ///////////////////////////////////////////// On barcode scane /////////////////////////////////////////////
  const onBarCodeRead = (scanResult) => {
    setScaneCode('');
    if (!scannnedBarCode.includes(scanResult.data)) {
      // var joined = scannnedBarCode.concat(scanResult.data);
      setScaneCode(scanResult.data)
      // setEditorNumbers(1) just for validation purpose //////////

      setScannerVisible(false);

    }

    return;


  }

 


  return (

    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[styles.container, { opacity: scannerVisible ? 0.8 : 1 }]}>
        {/*//////////////////////////////////// Alert Modal ///////////////////////////////////////////////*/}

        {responseData ?
          <Modal
            animationType='fade'
            transparent={true}

            backgroundColor={colors.tertiary}
            visible={modalVisible}
            onRequestClose={() => {

              // setModalVisible(!modalVisible);
            }}>

            <AlertModal
              error={responseData.error}
              success={responseData.msg}
              onPress={modalClossHandler}
              onOutsidePress={modalClossHandler}
            />



          </Modal> : null}
        {/* /////////////////////////////////////  Scanner Modal //////////////////////////////////////// */}

        <Modal
          animationType='fade'
          transparent={true}

          backgroundColor={colors.tertiary}
          visible={scannerVisible}
          onRequestClose={() => {

            // setModalVisible(!modalVisible);
          }}>

          <View style={styles.scannerContainer}>
            <View style={styles.scannerSubContainer}>

              <Text style={styles.scannerTitleText}>Please Scan Your Ticket</Text>

              {/* <RNCamera
                ref={ref => {
                  camera = ref;
                }}
                defaultTouchToFocus
                flashMode={RNCamera.Constants.FlashMode.auto}
                mirrorImage={true}
                onBarCodeRead={(result) => onBarCodeRead(result)}

                style={styles.preview}
              />*/}
              <QRCodeScanner
                                        reactivate={true}
                                        reactivateTimeout={3000}
                                        onRead={onBarCodeRead}                                     
                                        fadeIn={true}
                                        flashMode={RNCamera.Constants.FlashMode.auto}
                                        showMarker={true}
                                        markerStyle={{ height: '70%', width: dew_Height / 4 }}
                                        cameraStyle={styles.preview}
                                        containerStyle={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary, width: '90%', height: dew_Height /1.8, paddingVertical:30 }}
                                        cameraContainerStyle={{ justifyContent: 'center', width: '100%', alignItems: 'center', }}
                                    />

              <TouchableOpacity onPress={() => setScannerVisible(false)}
                style={[styles.activateButton,
                { width: '80%', marginVertical: 20 }]}>
                <Text style={styles.buttonText}>Close </Text>
              </TouchableOpacity>
            </View>


          </View>



        </Modal>


        {/*////////////////////////////////// Header  ////////////////////////////////////////////////// */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => props.navigation.navigate('homeTab')}>
            <Ionicons name='arrow-back' size={rfv(25)} color="white" />
          </TouchableOpacity>
          <Text style={styles.activePackText}>Activate Packs</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.textContainer}>
            <Text style={styles.subText}>Activate games here by entering a slot # and scanning
              the game pack, this will activate the ticket for sell and also display it.</Text>
          </View>
          {/*////////////////////////////////// Input and buttons conatiner ////////////////////////////// */}

          <View style={styles.inputAndButtonsContainer}>
            <View style={styles.errorContainer}>
              {nullSubmit || nullSlotNumber ?
                nullSlotNumber ?
                  <Text style={[styles.errorText]}>Enter valid slot number</Text> :
                  <Text style={[styles.errorText]}>Scan code cannot be empty and should
                    be {maxLength} or {maxLength} digit</Text> : <Text></Text>}
            </View>

            <View style={[styles.inputContainer]}>
              {slotRequired ?
                <View style={[styles.slotInputContainer, { width: '30%' }]}>
                  <Text style={styles.inputlebel}>Slot#</Text>
                  <TextInput
                    style={[styles.input, {
                      borderColor: !isValidSlotNumber(slotNumber)
                        && slotNumber || nullSlotNumber ? "red" : '#98A2BF',
                      width: '100%'
                    }]}
                    keyboardType='numeric'
                    autoFocus={true}
                    // placeholder='Enter Slot..'
                    placeholderTextColor={"#98A2BF"}
                    autoCapitalize="none"
                    onChangeText={(text) => setSlotNumber(text)}


                  />

                  {!isValidSlotNumber(slotNumber) && slotNumber ? (
                    <Text style={{ fontSize: 15, color: 'red', paddingLeft: 0 }}>Invalid Slot#</Text>
                  ) : <Text></Text>}
                </View> : <Text></Text>}

              <View style={[styles.scaneCodeContainer, { width: slotRequired ? '70%' : "100%", paddingHorizontal: 20 }]}>

                <Text style={styles.inputlebel}>Scan Code </Text>
                <View style={{ flexDirection: 'column' }}>
                  <View style={[{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                    <TextInput
                      style={[styles.input, { borderColor: scaneCode.length != maxLength && scaneCode ? "red" : '#98A2BF', borderTopRightRadius: 0, borderBottomRightRadius: 0, width: '90%' }]}
                      keyboardType='decimal-pad'
                      autoFocus={true}
                      ref={input => { textInput = input }}
                      //placeholder='Scane Code..'
                      placeholderTextColor={"#98A2BF"}
                      autoCapitalize="none"
                      value={scaneCode}
                      onChangeText={(text) => setScaneCode(text)}

                    />

                    <TouchableOpacity onPress={() => setScannerVisible(true)} style={styles.scannerButton}>

                      <Icons name='barcode-scan' size={rfv(18)} color="white" style={styles.scannerIcon} />
                    </TouchableOpacity>

                  </View>
                  {!isValidScaneCode(scaneCode) && scaneCode ?
                    <Text style={{ fontSize: 15, color: 'red', }}>Invalid Scane Code</Text> :
                    scaneCode.length != maxLength && scaneCode ? <Text style={{ fontSize: 15, color: 'red', }}>
                      Scane Code Lenth should be {maxLength} or {manualLength}</Text>
                      : <Text></Text>}


                </View>
              </View>
            </View>

            {/*//////////////////////////////////Activate Button ////////////////////////////////////////////////// */}
            <View style={styles.actionButtonsContainer}>
              <View style={styles.inputButtonsContainer}>

                <Text style={styles.inputlebel}>Display</Text>
                <TouchableOpacity style={[styles.inputButtons, {
                  backgroundColor: focusButton1,
                  marginTop: dew_Width < 700 ? 10 : 0
                }]}
                  onPress={onDisplayFocus}>
                  <Icon name='tv' size={rfp(3)} color="white" />
                </TouchableOpacity>

              </View>
              {packageId != 1 && packageId != 4 ?
                <View style={styles.inputButtonsContainer}>
                  <Text style={styles.inputlebel}>Vending Machine</Text>
                  <TouchableOpacity style={[styles.inputButtons, { backgroundColor: focusButton2 }]}
                    onPress={onVendingFocus}>
                    <Icon name='shopping-pos-machine' size={rfp(4)} color="white" />
                  </TouchableOpacity>
                </View> : null}

              <View style={styles.inputButtonsContainer}>
                <Text style={styles.inputlebel}>Selling Full Pack </Text>
                <TouchableOpacity style={[styles.inputButtons, { backgroundColor: focusButton3 }]}
                  onPressIn={onSellingFocus} >
                  <Ionicons name='cloud-done' size={rfp(4)} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/*//////////////////////////////////Activate and close Button ////////////////////////////////////////////////// */}

          <View style={styles.activateButtonContainer}>
            <View style={styles.ACButtonContainer}>
              <TouchableOpacity onPress={() => props.navigation.navigate('homeTab')}
                style={[styles.activateButton,
                { backgroundColor: 'transparent', }]}>
                <Text style={styles.buttonText}>Close </Text>
              </TouchableOpacity>

            </View>
            <View style={styles.ACButtonContainer}>
              <TouchableOpacity onPress={activateHandler}
                style={[styles.activateButton,
                { backgroundColor: '#208EFD', }]}>
                {isloading ?
                  <View style={styles.loadingLottieViewContainer}>
                    {Platform.OS != 'web' ?
                      <LottieView source={require('../Animations/85032-loader-mat.json')}
                        autoPlay loop
                        style={styles.loadingLottieStyle} /> : null}

                  </View>
                  :
                  <Text style={styles.buttonText}>Activate </Text>}
              </TouchableOpacity>
            </View>
          </View>

          {/*//////////////////////////////////  Closs and Next Butoons  end////////////////////////////////////////// */}


        </ScrollView>
      </View>
    </TouchableWithoutFeedback>


  )
}

















const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingTop: Platform.OS === "android" ? 20 : 40,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.tertiary

  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'flex-start',

    paddingHorizontal: 5,
    width: '100%'

  },
  activePackText: {
    fontSize: rfv(18),
    color: '#98A2BF',
    fontWeight: '900',
    alignSelf: 'center',
    textAlign: 'center',
    width: '90%'
  },
  inputAndButtonsContainer: {
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 10,
    marginHorizontal: 10,
    paddingBottom: 20,
    borderRadius: 5

  },


  subText: {
    fontSize: rfv(10),
    width: "100%",
    color: '#98A2BF',
    paddingHorizontal: 10,
    paddingBottom: 15


  },


  textContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,

  },





  inputContainer: {
    flex: 2,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',

  },
  slotInputContainer: {
    width: '30%',
    paddingHorizontal: 10,

  },
  scaneCodeContainer: {
    //width: '70%',
    paddingHorizontal: 10,
    // marginHorizontal:10

  },

  input: {
    //width: '0%',
    height: hp(6),
    marginVertical: 10,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    color: '#98A2BF',
    fontSize: rfv(14)




  },

  inputlebel: {
    fontSize: rfv(10),
    paddingVertical: 5,
    color: '#98A2BF'
  },
  actionButtonsContainer: {
    flex: 3,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',



  },
  inputButtonsContainer: {
    flex: 3,
    width: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: 10

  },
  inputButtons: {
    height: hp(6),
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#98A2BF',


  },
  activateButtonContainer: {
    flex: 2,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    //paddingHorizontal: 10,


  },
  ACButtonContainer: {
    width: "50%",
    paddingHorizontal: 10,
    paddingVertical: hp(6)

  },
  activateButton: {
    justifyContent: 'center',
    alignItems: 'center',

    width: "100%",
    height: hp(6),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#98A2BF'



  },
  buttonText: {
    color: 'white',
    fontSize: rfv(10),

  },
  errorContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2


  },
  errorText: {

    color: '#974220',
    fontSize: rfv(12),
    textAlign: 'center',
    backgroundColor: '#DBBCAF',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 10,


  },


  /////////////////////////////////////Scanner container ///////////////////////////////////////////
  scannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  scannerSubContainer: {
    paddingVertical:100,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.tertiary,
    height:'100%',
    width: '100%',
   



  },
  
preview: {
    justifyContent: 'center',
    alignItems: 'center',
    //height: dew_Width < 700 ? rfv(453) : rfv(500),
    //width: rfv(210),
    width: dew_Height /2.9,
    height: dew_Height /2.4




},
  scannerTitleText: {
    fontSize: rfv(10),
    fontWeight: "500",
    color: 'red',
    paddingVertical: 15
  },
  scannerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,

    backgroundColor: colors.primary,
    alignSelf: 'center', alignItems: 'center',
    height: hp(6),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#98A2BF',
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,

  },
  /////////////////////////////// loading lottie spinner  on button press //////////////////////////

  loadingLottieViewContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',




  },

  loadingLottieStyle: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: hp("6%"),
    width: wp("100%"),


  },


})


export default ConformPackScreen;
