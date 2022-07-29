
import React, { useState, } from 'react';
import { StyleSheet, Text, View, Dimensions, ActionSheetIOS, TouchableOpacity, Platform, Modal, FlatList, Button, ScrollView, TextInput, Image, ImageEditor, Alert } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import colors from '../Colors/Color';
import LottieView from 'lottie-react-native';
import { RFPercentage as rfp, RFValue as rfv } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Picker } from '@react-native-picker/picker';
import { useSelector, useDispatch } from 'react-redux';
import SweetAlert from 'react-native-sweet-alert';
import { RNCamera } from 'react-native-camera';
import RNFS from 'react-native-fs';
import { useFocusEffect } from '@react-navigation/native';
import ImageFrameComponent from '../Components/DashboardComponents/ImageFrameComponent';
import FramesData from '../Data/FramesData';
import ImagePicker from 'react-native-image-crop-picker';
import AlertModal from '../Components/ModelComponents/EndDayFinalModal'
import { set } from 'react-native-reanimated';
import LotteryNameModal from '../Components/ModelComponents/LotteryNameModal';

//import base64 from 'react-native-base64'
//import ImgToBase64 from 'react-native-image-base64';



//import Icon  from 'react-native-ionicons'
const dew_Height = Dimensions.get('window').height
const dew_Width = Dimensions.get('window').width



const AddWinnerScreen = (props) => {

  const userCredentials = useSelector(state => state.userCredentials.userdata);
  const LotteryNames = userCredentials.winner_lotteries
  const addWinnerUrl = userCredentials.add_winner



  //////////////////////////////// Component States ////////////////////////////////////////////
  const [resourcePath, setResourcePath] = useState(null);
  const [finalBase64image, setFinalBase64image] = useState(null);
  const [title, setTitle] = useState('');
  const [selectedLotteryName, setSelectedLotteryName] = useState("Select");
  const [lotteryName, setLotteryName] = useState('');
  const [winningAmount, setWinningAmout] = useState('');
  const [formSubmit, setFormSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [responseData, setResponseData] = useState('');
  const [responceAlert, setResponceAlert] = useState(false);
  const [lotteryNamesVisible, setlTotteryNamesVisible] = useState(false)



  ////////////////////////////////////// Input Validation ///////////////////////////////////////
  function isValidTitle(title) {
    const re = /[^\n]+/
    return re.test(String(title))
  }
  function isValidWinningAmount(winningAmount) {
    const re = /^(?!0\d)\d*(\.\d+)?$/
    return re.test(String(winningAmount))
  }




  //////////////////////////////////// Launch Camera //////////////////////////////////////////


  const cameraLaunch = (croping, mediaType = 'photo') => {
    console.log("camera called")
    ImagePicker.openCamera({
      cropping: croping,
      width: 600,
      height: 800,
      includeBase64: true,
      maxWidth: 600,
      imageType: 'png',
      maxHeight: 800,
      includeExif: true,

      mediaType,
     
    })
      .then((image) => {
        if (image && image != "undefined") {
          setResourcePath(image.path);
          setFinalBase64image('data:image/jpeg;base64,' + image.data);
          setModalVisible(true);

        }

      })
      .catch((e) => setResponceAlert(false));
  }

  ///////////////////////////// Image combine ////////////////////////////////////////
  /*function framePressHandler(url, capturedImgUri) {
     //file:///data/user/0/com.dashboard/cache/rn_image_picker_lib_temp_3d538d70-0ac0-4ceb-a6d6-c290e1e9653b.jpg
     let image1 = url
     //console.log(capturedImgUri)
     let image2 = capturedImgUri
    
    console.log(finalBase64image);
   
   
   
     
    ImagesCombineLibrary.combineImages([
     Image.resolveAssetSource(image1),
     { uri: image2 },
      Image.resolveAssetSource(image1),
 
   ]).then(base64 => {   
     setFinalBase64image('data:image/jpeg;base64,' + base64)
 
   })
 }
 
   
   /*console.log(resourcePath)
   ImgToBase64.getBase64String(resourcePath)
   .then(base64String => image2=base64String)
     
     
   .catch(err => console.log(err));
  
  
  /* ImagesMerge.mergeImages([{
     uri: finalBase64image,
 }, { uri: 'data:image/png;base64,' }],
  (result) => {
     console.log(result);
     setFinalBase64image('data:image/jpeg;base64,' + result)
 })
 };*/



  ////////////////////////////////// Save Handler and call API inside component ////////////////////////////
  const saveHandler = async () => {
    setLoading(true);
    setFormSubmit(true);

    if (!isValidTitle(title) || !title || !isValidWinningAmount(winningAmount) || !winningAmount || !lotteryName || lotteryName === "Select" || resourcePath === null || resourcePath === '') {
      !isValidTitle(title)
        ?
        setTitle(false) :
        !isValidWinningAmount(winningAmount) || !winningAmount
          ?
          !setWinningAmout("abc")
          :
          !lotteryName || lotteryName === "Select" ? setLotteryName(null)
            :
            resourcePath === null ? setResourcePath('') : ''

      setLoading(false);
    }
    else {
      try {
        setLoading(true);
        url = addWinnerUrl
        accessToken = userCredentials['accessToken']

        let response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            lottery_name: lotteryName,
            winning_amount: winningAmount,
            title: title,
            status: "on",
            picture: finalBase64image
          }),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + accessToken
          },
        }).then(response => response.json());
        setResponseData(response);
        setLoading(false);

        if (response.success === 1) {
          setResponceAlert(true);




        }
        else {
          setLoading(false);
          Alert.alert(
            response.msg,
            response.msg, [
            { text: 'OK' },
          ])
        }

        // return true;
      } catch (err) {
        setLoading(false);
        Alert.alert(
          err.message + "!",
          "Check your network and try again", [
          { text: 'OK' },]
        )
      }
    };

  }

  ///////////////////// ON Tab Press set component to initial state ////////////////////////////////////////////////
  useFocusEffect(
    React.useCallback(() => {
      cameraLaunch(true);

      setFinalBase64image(null);
      setLotteryName('');
      setSelectedLotteryName("Select")
      setResourcePath('');
      isValidWinningAmount(true);




      setFormSubmit(false);

      if (title) {
        textInput.clear();
        setTitle('');

      }

      if (winningAmount) {
        titleInput.clear();
        setWinningAmout('')
      }







    }, [])
  );




  /////////////////////////////// On Back Button Press lounch camera //////////////////////////////////
  const frameBackHandler = () => {
    cameraLaunch(true);

  }


  const alertOkHandler = () => {


    setFinalBase64image(null);
    setLotteryName('');
    setResourcePath('');
    setTitle('');
    setWinningAmout('');
    setFormSubmit(false);
    textInput.clear();
    titleInput.clear();
    setResponseData('');
    setResponceAlert(false);
    props.navigation.navigate('Home');
  }

  const updateLotteryNameHandler = (name, id) => {
    setSelectedLotteryName(name);
    setLotteryName(id);
    setlTotteryNamesVisible(!LotteryNameModal)
  }





  return (




    <View style={[styles.container, { opacity: responseData ? 0.5 : 1 }]}>
      {/************************************* Image Editing Modal *******************************/}
      {/*  <View>
        {Platform.OS != 'web' ?
          <Modal
            animationType="slide"
            transparent={true}
            // backgroundColor={colors.tertiary}
            visible={modalVisible}
            onRequestClose={() => {

              setModalVisible(!modalVisible);
            }}>

            <View style={styles.modalContainer}>
              <View style={styles.winnerImgContainer}>
                <Image
                  source={{ uri: finalBase64image }}
                  style={styles.winnerImage}
                />
              </View>

              <View style={styles.frameContainer}>
                {finalBase64image?
                <FlatList
                  data={FramesData}
                  showsHorizontalScrollIndicator={true}
                  style={{ marginHorizontal: 0 }}
                  horizontal={true}
                  //numColumns={100}

                  keyExtractor={(item, index) => item.id}

                  renderItem={(itemData) =>
                    <ImageFrameComponent
                      frameUrl={itemData.item.frameUrl}
                      onPress={() => framePressHandler(itemData.item.frameUrl , resourcePath)}

                    />
                  }

                />: <Text></Text>}

              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.modalButtonStyle} onPress={frameBackHandler}>
                  <View style={{ flexDirection: 'row' }}>

                    <Icon name="arrow-left" color="white" size={rfv(25)} />
                    <Text style={styles.modalButtonText}>Back</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.modalButtonStyle} onPress={() => setModalVisible(!modalVisible)}>
                  <View style={{ flexDirection: 'row' }}>

                    <Text style={styles.modalButtonText}>Next</Text>
                    <Icon name="arrow-right" color="white" size={rfv(25)} />
                  </View>
                </TouchableOpacity>
              </View>



            </View>

          </Modal> : null}
                </View>*/}
      {/*/////////////////////////// Conformation Alert successfully added winner ////////////////////// */}
      <Modal
        animationType='fade'
        transparent={true}

        backgroundColor={colors.tertiary}
        visible={responceAlert}
        onRequestClose={() => {
          setResponceAlert(!responceAlert);


        }}>
        <AlertModal

          success={responseData.msg}
          onPress={alertOkHandler}

          onErrorPress={() => setResponceAlert(false)}
          successStatus={responseData.success}
        />
      </Modal>
      {/************************************* Image Editing Modal end *******************************/}
      {/*/////////////////////////// Lottery name bottom up Modal ///////////////////////////////////// */}
      <Modal
        animationType="slide"
        transparent={true}

        backgroundColor={colors.tertiary}
        visible={lotteryNamesVisible}
        onRequestClose={() => {
          setlTotteryNamesVisible(!lotteryNamesVisible);


        }}>
        <View style={{ height: '100%', width: '100%', justifyContent: 'flex-end', }}>
          <View
            style={{
              height: '50%', justifyContent: 'center',
              alignItems: 'center', width: '100%', borderTopLeftRadius: 15, borderTopRightRadius: 15, backgroundColor: colors.tertiary
            }}>
            {/* <LotteryNameModal 
                    onClosePress={()=>setlTotteryNamesVisible(!lotteryNamesVisible)}
                    
                  />*/}
            <FlatList
              data={LotteryNames}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={true}
              nestedScrollEnabled={true}
              removeClippedSubviews
              initialNumToRender={100}
              updateCellsBatchingPeriod={10}
              maxToRenderPerBatch={10}
              windowSize={10}
              style={{ width: "95%", backgroundColor: "#294F9E", 
              borderTopLeftRadius: 20, borderTopRightRadius: 20, 
              borderRadius: 20, marginBottom: 15, borderColor: '#98A2BF', 
              borderWidth: 1, paddingBottom: 30 }}

              keyExtractor={(item, index) => item.lottery_id}

              renderItem={(itemData) =>
                <LotteryNameModal
                  lotteryName={itemData.item.lottery_name}
                  onLotteryPress={() => updateLotteryNameHandler(itemData.item.lottery_name, itemData.item.lottery_id)}

                />
              }

            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity onPress={() => setlTotteryNamesVisible(!lotteryNamesVisible)} style={styles.closeButton}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </Modal>
      {/************************************* Image Editing Modal end *******************************/}

      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>


          <Icon name='arrow-left' size={rfv(25)} color="white" />
        </TouchableOpacity>
        <Text style={styles.addWinnerText}>Add Winners</Text>
      </View>
      <ScrollView style={{ alignSelf: 'center', width: '100%', paddingHorizontal: dew_Width > 700 ? 10 : 6 }} showsVerticalScrollIndicator={false}>
        {finalBase64image != null ?
          <View style={[styles.imageContainer, { justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }]}>
            <Image
              source={{ uri: finalBase64image }}
              style={styles.imageStyle}

            /></View> :
          <View style={[styles.imageContainer, { borderColor: resourcePath === '' && formSubmit ? 'red' : '#98A2BF' }]}>
            <TouchableOpacity onPress={() => cameraLaunch(true)} style={{ justifyContent: 'center', alignItems: 'center' }}>

              <View style={styles.LottieViewContainer}>
                {Platform.OS != 'web' ?
                  <LottieView source={require('../Animations/60265-digital-camera.json')}
                    autoPlay loop
                    style={styles.lottieStyle} /> : null}
              </View>



            </TouchableOpacity>
          </View>}


        <TouchableOpacity onPress={() => cameraLaunch(true)} style={styles.cameraButton}  >
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

            <Icon name='camera' size={rfv(20)} color='white' />
            <Text style={styles.photoButtonText}>Take Photo</Text>
          </View>
        </TouchableOpacity>

        {/********************************* Input Fields************************************************** */}

        <View style={styles.inputView}>
          <Text style={styles.inputlebel}>Title</Text>


          <TextInput
            style={[styles.input, { borderColor: !isValidTitle(title) && title || title === false ? "red" : '#98A2BF' }]}
            keyboardType='default'
            placeholder='Title'
            placeholderTextColor={'#98A2BF'}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            initialValue=""
            ref={input => { titleInput = input }}

            onChangeText={(text) => setTitle(text)}
          />

        </View>

        <View style={styles.inputView}>
          <Text style={styles.inputlebel}>Lottery Name</Text>

          <View style={[styles.input, { borderColor: lotteryName === null ? 'red' : '#98A2BF', justifyContent: 'center' }]}>

            {/*<Picker
              selectedValue={lotteryName}
             mode="dropdown"
              dropdownIconColor='#98A2BF'
              dropdownIconRippleColor='#E1E1F5'
             
             
              style={styles.dropdownStyle}
              onValueChange={(itemValue, itemIndex) =>
                setLotteryName(itemValue)
              }>
              <Picker.Item label="Select" value="Select" style={styles.popupStyle} />
              {LotteryNames.map((item, key) =>
                <Picker.Item item={item} key={[item.lottery_id]} index={[item]}



                  label={item.lottery_name}
                  value={item.lottery_id}
                  style={styles.popupStyle}


                />)}

              </Picker>*/}
            <TouchableOpacity onPress={() => setlTotteryNamesVisible(!lotteryNamesVisible)} style={{ height: '100%', width: '100%' }}>
              <View style={{ height: '100%', flexDirection: "row", justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>

                <Text style={styles.inputlebel}>{selectedLotteryName}</Text>
                <Icon name='arrow-down-drop-circle' size={rfv(16)} color='#98A2BF' />
              </View>

            </TouchableOpacity>
          </View>


          <View style={styles.inputView}>
            <Text style={styles.inputlebel}>Winning Amount</Text>
            <View style={[styles.dollerAmountContainer, { borderColor: !isValidWinningAmount(winningAmount) && winningAmount ? 'red' : '#98A2BF' }]}>
              <Text style={styles.dollerSign}>$</Text>
              <View style={styles.VeiticalLine}></View>

              <TextInput
                style={{ color: '#98A2BF', borderColor: '#98A2BF', fontSize: dew_Width < 700 ? rfv(12) : rfv(15), paddingLeft: 10, height: dew_Width <= 600 ? 40 : 60, }}
                keyboardType='numeric'
                placeholder='Amount'
                placeholderTextColor={'#98A2BF'}
                autoCapitalize="none"
                initialValue=""
                ref={input => { textInput = input }}
                underlineColorAndroid="transparent"
                onChangeText={(text) => setWinningAmout(text)}

              />
            </View>


          </View>
        </View>



        <TouchableOpacity onPress={saveHandler} style={[styles.buttonStyle, { backgroundColor: '#208EFD', }]}>
          {loading ? (

            <LottieView source={require('../Animations/85032-loader-mat.json')}
              autoPlay loop
              style={styles.lottieStyleSaveButton} />
          ) : (

            <Text style={styles.buttonText}>Save</Text>)}
        </TouchableOpacity>




      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingTop: Platform.OS === "android" ? 20 : 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.tertiary,
    paddingHorizontal: 5
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 5


  },
  imageContainer: {
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.primary,
    borderWidth: 1,
    marginVertical: dew_Height / 40,
    borderStyle: 'dashed',
    borderColor: '#98A2BF',
    height: hp(20)



  },
  imageText: {
    color: '#98A2BF',
    fontSize: rfv(10),

  },
  imageStyle: {
    width: dew_Width > 700 ? wp(18) : wp(26),
    height: "95%",


  },
  addWinnerText: {
    fontSize: rfv(20),
    color: '#98A2BF',
    fontWeight: '900',
    alignSelf: 'center',
    textAlign: 'center',
    width: '90%'
  },
  cameraButton: {
    width: "100%",
    height: dew_Width <= 600 ? 40 : 60,
    alignSelf: 'center',
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 12,

    borderWidth: 1,
    borderColor: '#98A2BF',
  },
  photoButtonText: {
    textAlign: 'center',
    fontSize: rfv(12),
    marginHorizontal: 10,
    borderRadius: 20,
    color: '#98A2BF',
    fontWeight: '600'
  },

  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 20



  },
  inputView: {
    width: '100%',
    paddingVertical: 10,

  },
  input: {
    height: dew_Width <= 600 ? 40 : 60,
    marginVertical: 10,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#98A2BF',
    color: '#98A2BF',
    fontSize: rfv(10),
    //marginHorizontal: 10,
    paddingHorizontal: 10,







  },
  inputlebel: {
    fontSize: rfv(10),
    color: '#98A2BF',
    //marginHorizontal: 10
  },



  buttonText: {
    color: "white",
    fontSize: rfv(12),

  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    marginVertical: 20,
    alignSelf: 'center',
    height: dew_Width <= 600 ? 40 : 60,
    borderWidth: 1,
    borderColor: '#98A2BF',
    borderRadius: 5,
  },
  dollerAmountContainer: {
    flexDirection: 'row',
    height: dew_Width <= 600 ? 40 : 60,
    marginVertical: 10,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#98A2BF',
    color: '#98A2BF',
    fontSize: rfv(10),
    paddingHorizontal: 10,

  },
  dollerSign: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: rfv(10),
    paddingRight: 5

  },
  VeiticalLine: {
    borderLeftWidth: 1,
    borderColor: '#98A2BF',
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
  dropdownStyle: {
    width: "100%",
    color: '#98A2BF',
    size: 10,
    alignSelf: 'auto',

  },
  popupStyle: {
    color: colors.primary,
    fontSize: rfv(10),

  },
  lottieStyleSaveButton: {
    width: rfp(7),


  },
  //////////////////////////////////////////////// Modal Style Stat from here //////////////////////////////
  modalContainer: {
    flex: 8,
    height: '100%',
    width: '100%',
    backgroundColor: colors.tertiary,

  },
  winnerImgContainer: {
    flex: 6,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: dew_Width > 700 ? 20 : 15



  },
  winnerImage: {
    width: rfv(370),
    height: "100%",
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',



  },
  frameContainer: {
    flex: 1,
    width: '100%',
    height: "100%",
    justifyContent: 'center',
    alignSelf: "center",
    alignContent: "center",
    alignItems: 'center',




  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row'

  },


  modalButtonStyle: {
    backgroundColor: '#208EFD',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: "48%",
    height: hp(6),
    borderRadius: 5,

  },
  modalButtonText: {
    color: 'white',
    fontSize: rfv(10),

  },

  modalButtonContainer: {

    width: '100%',

    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: colors.primary,
    //paddingBottom:30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderTopColor: '#98A2BF',
    borderLeftColor: '#98A2BF',
    borderRightColor: '#98A2BF',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',


  },
  closeButton: {
    backgroundColor: '#208EFD',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    height: dew_Width <= 600 ? 40 : 60,
    marginBottom: 20

  },



});

export default AddWinnerScreen;