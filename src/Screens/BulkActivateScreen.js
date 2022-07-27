import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, Keyboard, TextInput, Dimensions, TouchableWithoutFeedback, ImageBackground, StyleSheet, SafeAreaView, ScrollView, Platform, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { Tooltip } from 'react-native-elements/dist/tooltip/Tooltip';
import { RFPercentage as rfp, RFValue as rfv } from "react-native-responsive-fontsize";
import colors from '../Colors/Color';
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { ActivePacketAction } from '../store/actions/TicketInventoryActions';
import LottieView from 'lottie-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RNCamera } from 'react-native-camera';
import ScannedCodeList from '../Components/ModelComponents/ScannedCodeList';
import SweetAlert from 'react-native-sweet-alert';


const dew_Height = Dimensions.get('window').height
const dew_Width = Dimensions.get('window').width





const ActivePackScreen = props => {
  let dispatch = useDispatch();
  ////////////////////////////////////////////////////// User Credentials from redux ///////////////
  const userCredentials = useSelector(state => state.userCredentials.userdata);

  ///////////////////////////////////////////////////////////// Model States/////////////////
  const [editorNumbers, setEditorNumbers] = useState('');
  const [scannnedBarCode, setScannedBarCode] = useState([])
  const [nullSubmit, setNullSubmit] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [startSlot, setStartSlot] = useState('');
  const [endtSlot, setEndSlot] = useState('');
  const [nullStartNumber, setNullStartNumber] = useState(false);
  const [nullEndNumber, setNullEndNumber] = useState(false);
  const [scannerVisible, setScannerVisible] = useState(false)
  const [startScanning, setStartScanning]=useState(false);



  const richText = React.useRef();

  ///////////////////////////////////////////////////////slot input Vallidation ////////////////
  function isValidStartSlotNumber(startSlot) {
    const re = /^[-,0-9 ]+$/
    return re.test(String(startSlot))
  }

  //////////////////////////////////////////////////////////scane code Vallidation ///////////
  function isValidEndSlotNumber(endtSlot) {
    const re = /^[-,0-9 ]+$/
    return re.test(String(endtSlot))
  }
  //////////////////////////////////////////////////////////// Input Handler /////////////////
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
    setNullStartNumber(false)
    setNullEndNumber(false)
    setIsLoading(false)
  }, 12000);
  /////////////////////////////////////////////////////////////// Api call ////////////////////////
  const conformHandler = async () => {

    if (!editorNumbers || !startSlot || !endtSlot) {
      !editorNumbers ? setNullSubmit(true) : editorNumbers && !startSlot ? setNullStartNumber(true) : setNullEndNumber(true)


      return;

    } else if (!editorNumbers && !scannnedBarCode) {
      setNullSubmit(false)

    }
    else {
      setIsLoading(true)



      try {
        let finalScaneCodes = scannnedBarCode.join(",")

        const status = await dispatch(ActivePacketAction(
          url = userCredentials['activate_url'],
          slotStartNumber = startSlot,
          slotEndNumber = endtSlot,
          gameCodes = editorNumbers === 1 ? finalScaneCodes : editorNumbers,
          accessToken = userCredentials['accessToken'],


        ),

        );
        setIsLoading(false);


      } catch (err) {
        /* return Alert.alert(
             ' No Internet Connection!',
             err, [
             { text: 'OK' },
         ]);*/
      }
    }
  }
  ///////////////////////////////////////////// ScannerVisibleHandler to Show Scanner ////////////////////////

  function scannerVisibleHandler() {

    setScannerVisible(true);
    setEditorNumbers('');

  }
  ///////////////////////////////////////////// Scanner related Functions and states //////////////////////////

  const onBarCodeRead = (scanResult) => {
    if (!scannnedBarCode.includes(scanResult.data)) {
      var joined = scannnedBarCode.concat(scanResult.data);
      setScannedBarCode(joined)
      // setEditorNumbers(1) just for validation purpose //////////
      setEditorNumbers(1)

      SweetAlert.showAlertWithOptions({
        title: "Scanned Successfully",

        confirmButtonText: 'OK',
        confirmButtonColor: colors.secondary,

        style: 'success',
        cancellable: true,
        showConfirmButton: true,
        showCancelButton: true,
        closeOnConfirm: true,
        closeOnCancel: true,
      })


    }

    /* SweetAlert.showAlertWithOptions({
       title: "This ticket is already scanned!",
      // subTitle: ,
       confirmButtonText: 'OK',
       confirmButtonColor: colors.secondary,
    
       style: 'fail',
       cancellable: true,                      
       showConfirmButton: true,
       showCancelButton: true,
       closeOnConfirm: true,
       closeOnCancel: true,        
   })
   */
    return;


  }



  ///////////////////////////////////////// Scanned Tickets Delete Handler //////////////////////////////////////////////

  function deleteHandler(item) {
    const result = scannnedBarCode.filter((deleteableCode) => deleteableCode != item);
    setScannedBarCode(result)
  }

  ////////////////////////////////////////// Scanner related functions end here /////////////////////////////////////////
 /////////////////////////////////////////// Manual Visible Handler //////////////////////////////////////////////////////
 function manualVisibleHandler(){
  setScannerVisible(false);
  setScannedBarCode([]);
  setStartScanning(false);
 
 }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

      <View style={styles.modalView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
            <Icon name='arrow-back' size={rfv(25)} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Activate Multiple Games</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={styles.headerTextButtonContainer}>
            <Text style={styles.modelText}>Activate packs to display  and sell, All packs must be conformed first before activation. </Text>

          </View>
          <TouchableOpacity onPress={conformHandler} style={[styles.modelButtons, { backgroundColor: '#208EFD', }]}>
            {isloading ?

              <ActivityIndicator size="small" color="#0000ff" paddingHorizontal={20} />
              :
              <Text style={styles.buttonText}>Activate</Text>}
          </TouchableOpacity>

          <View style={styles.slotInputContainer}>
            <View style={{ width: '50%' }}>
              <Text style={styles.inputlebel}>Start Slot #</Text>

              <TextInput
                style={[styles.slotInput, { borderColor: !isValidStartSlotNumber(startSlot) && startSlot ? "red" : '#98A2BF' }]}
                keyboardType='numeric'
                autoFocus={true}
                // placeholder='1,2,3,4,..'
                placeholderTextColor={"gray"}
                autoCapitalize="none"

                onChangeText={(text) => setStartSlot(text)}
              />
              {!isValidStartSlotNumber(startSlot) && startSlot ? (
                <Text style={{ fontSize: 15, color: 'red', paddingLeft: 30 }}>Invalid Start Slot#</Text>
              ) : <Text></Text>}
            </View>
            <View style={{ width: '50%' }}>
              <Text style={styles.inputlebel}>End Slot #</Text>
              <TextInput
                style={[styles.slotInput, { borderColor: !isValidEndSlotNumber(endtSlot) && endtSlot ? "red" : '#98A2BF', }]}
                keyboardType='numeric'
                placeholderTextColor={"gray"}
                autoCapitalize="none"
                onChangeText={(text) => setEndSlot(text)}
              />
              {!isValidEndSlotNumber(endtSlot) && endtSlot ? (
                <Text style={{ fontSize: 15, color: 'red', paddingLeft: 30 }}>Invalid End Slot#</Text>
              ) : <Text></Text>}
            </View>
          </View>
          {nullSubmit ?
            <Text style={styles.errorText}>Scane Some Tickets For Activation</Text> : nullStartNumber ?
              <Text style={styles.errorText}>Please Enter Start Slot Number</Text> : nullEndNumber ?
                <Text style={styles.errorText}>Please Enter End Slot Number</Text> : <Text></Text>}



          {/*////////////////// Manual and Scanner Button ///////////////////////////////////////////// */}

          <View style={styles.tabButtonContainer}>
            <TouchableOpacity onPress={manualVisibleHandler} style={[styles.manualMutton, { backgroundColor: !scannerVisible ? '#E8F0F3' : 'transparent', width: "50%" }]}>
              <Text style={[styles.ManualButtonText, { color: scannerVisible ? '#208EFD' : 'gray' }]}>Manual</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={scannerVisibleHandler} style={[styles.manualMutton, { backgroundColor: scannerVisible ? '#E8F0F3' : 'transparent', width: "50%" }]}>
              <Text style={[styles.ManualButtonText, { color: !scannerVisible ? '#208EFD' : 'gray' }]}>Scanner</Text>
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal:dew_Width>700? 22:11, paddingBottom: 20 }}>

            {scannerVisible ?
              /////////////////////////////////////// Model Scanner /////////////////////////////////////////////////
              <View style={styles.scannerContainer}>
                <View Style={styles.codesContainer}>
                  {scannnedBarCode.length > 0 ?
                    <View style={styles.listItemContainer}>
                      <Text style={styles.titleText}>No</Text>
                      <Text style={styles.titleText}>Lottery Scane Code</Text>
                      <Text style={styles.titleText}>Action</Text>
                    </View> : <Text></Text>}
                  <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center', marginBottom: scannnedBarCode.length>0? 30:0 }}>
                    {scannnedBarCode.map((item, index, key) =>
                      <ScannedCodeList item={item} key={[item]} index={[item]}
                        indexNumber={index + 1}
                        scannnedCode={item}
                        delete={() => deleteHandler(item)}


                      />)}
                  </View>
                </View>
                {!startScanning?
                             <View style={styles.LottieViewContainer}>
                                 <TouchableOpacity onPress={()=>setStartScanning(true)}>
                                  <Text style={styles.scanneText}>Please Tab To Start Scanning</Text>
                             {Platform.OS != 'web' ?
                              
                               <LottieView source={require('../Animations/7242-barcode-scanner.json')}
                                 autoPlay loop
                                 style={styles.lottieStyle} /> : null}
                                 </TouchableOpacity>
                           </View>:
                <View style={{ flex: 1, height: "50%", justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                  <RNCamera
                    ref={ref => {
                      camera = ref;
                    }}
                    defaultTouchToFocus
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    mirrorImage={true}
                   // showMarker={true}
                    onBarCodeRead={(result) => onBarCodeRead(result)}
                    onFocusChanged={() => { }}
                    onZoomChanged={() => { }}
                    // androidCameraPermissionOptions={'Permission to use camera'}
                    //permissionDialogMessage={'We need your permission to use your camera phone'}
                    style={styles.preview}
                  //type={RNCamera.Constants.Type.back}
                  />
                </View>}


              </View> :



              ///////////////////////////////////// Scanner End here ///////////////////////////////////////////////
              <SafeAreaView>
                <ScrollView>

                  <RichEditor
                    ref={richText}
                    editorStyle={styles.editorStyle}
                    initialHeight={hp("22.7%")}
                    scrollEnabled={true}
                    autoFocus={true}
                    initialContentHTML={false}
                    placeholder="Enter Your packs..."
                    onChange={tickets => { inputHandler(tickets) }}
                  />
                  <RichToolbar
                                editor={richText}
                                iconSize={rfv(30)}
                                selectedIconTint="green"
                                disabledIconTint='red'

                                actions={[
                                    actions.insertOrderedList,
                                    actions.keyboard,
                                    
                                   
                                ]}


                            />
                </ScrollView>
              </SafeAreaView>}
          </View>

         {/******************************** Activate Button ************************************************** */}
          <View style={styles.ButtonContainer}>
            <TouchableOpacity onPress={conformHandler} style={[styles.modelButtons, { backgroundColor: '#208EFD' }]}>
              {isloading ?
              <ActivityIndicator size="small" color="#0000ff" paddingHorizontal={20} />
                :
                <Text style={styles.buttonText}>Activate</Text>}
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>

    </TouchableWithoutFeedback>

  )
}

















const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    width: '100%',
    height: '100%',


    backgroundColor: colors.tertiary,


  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: dew_Width < 700 ? 5 : 10,
    width: '100%'

  },
  headerText: {
    fontSize: rfv(18),
    color: '#98A2BF',
    fontWeight: '900',
    alignSelf: 'center',
    textAlign: 'center',
    width: '90%'
  },

  slotInputContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 10,
    paddingHorizontal:dew_Width>700?10:0
    



  },
  slotInput: {
    height: hp("6%"),
    marginVertical: 10,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#98A2BF',
    color: '#98A2BF',
    fontSize: 14,
    marginHorizontal: 10




  },
  inputlebel: {
    fontSize: rfp(1.5),
    fontWeight: '500',
    color: '#98A2BF',
    marginHorizontal: 10
  },
  modelTitleText: {
    fontSize: rfv(13),
    color: '#98A2BF',
    marginTop: 10,
    paddingHorizontal: 10,
    marginLeft: 10,
    fontWeight: 'bold'
  },
  modelText: {
    fontSize: rfv(10),
    width: "100%",
    color: '#98A2BF',
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  manualMutton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp("25%"),
    height: hp("6%"),
    textAlign: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,


  },
  ManualButtonText: {
    fontSize: rfv(16),
    color: 'gray',
    textAlign: 'center',



  },
  tabButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: dew_Width > 700 ? rfv(16) : wp(3),
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,


  },




  inputContainer: {
    marginBottom: 10,
    backgroundColor: 'white',
    marginHorizontal: 30

  },

  ButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',



  },

  buttonText: {
    color: 'white',
    fontSize: rfv(10),
    fontWeight: '700'
  },


 

  /////////////////////////////////////////////////

  modelButtons: {

    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    width: "95%",
    height: hp("6%"),
    borderRadius: 5,
  },




  input: {
    height: 150,
    fontSize: rfp(1.5),
    marginLeft: 20,
    backgroundColor: 'white'
  },
  editorStyle: {
    backgroundColor: 'white',
   
    



  },
  errorText: {
    color: '#974220',
    fontSize: rfv(12),
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: '#DBBCAF',
    paddingHorizontal: 10,
    marginHorizontal: 30,
    width:"95%",
    paddingVertical: 10,
    marginVertical:15,
    borderRadius: 10,
  
  },
  headerTextButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: dew_Width>700?20:0,
    marginBottom: 10
  },
  /////////////////////////////////// Scanner Styling /////////////////////////////
  scannerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  preview: {
    justifyContent: 'center',
    alignItems: 'center',
    height: dew_Width < 700 ? rfv(400) : rfv(500),
    width: rfv(210),


  },
  codesContainer: {
    width: '100%'
  },
  listItemContainer: {

    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'black',
    alignContent: "center",
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: colors.primary




  },
  titleText: {

    color: '#98A2BF',
    fontSize: rfp(2),
    fontWeight: '800',
    backgroundColor: 'black',
    paddingVertical: 20,
    borderRadius: 2,


  },
  scanneText: {
    fontSize: rfv(18),
    color: 'red',
    alignSelf: 'center',
    textAlign: 'center',
  
  },
  LottieViewContainer: {
    width:'100%',
     justifyContent: 'center',
     alignItems: 'center',
 
 
 
 
   },
   lottieStyle: {
     height: hp("22%"),
     alignSelf: 'center',
     width: wp("100%"),
 
 
   },


})

export default ActivePackScreen;