import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  TouchableNativeFeedback,
  BackHandler,
  StatusBar,


} from 'react-native'
//import { Ionicon as Icon } from 'react-native-ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5'
//import Icon  from 'react-native-ionicons'
import { Icon as Ionicon } from "react-native-elements";
import LottieView from 'lottie-react-native';
import axios from "axios";
import { RFPercentage as rfp, RFValue as rfv } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions/LoginActions';
import { useNavigation } from '@react-navigation/native';
import { createNativeWrapper } from "react-native-gesture-handler";
import { useBackHandler, exitApp } from '@react-native-community/hooks'
import { OrientationLocker, PORTRAIT, LANDSCAPE, } from "react-native-orientation-locker";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Picker } from '@react-native-picker/picker';
import colors from '../../Colors/Color';
import CheckBox from '@react-native-community/checkbox';
import { SolidIcons } from "react-native-fontawesome";
//import VectorImage from 'react-native-vector-image';




const dew_Height = Dimensions.get('screen').height;
const dew_Width = Dimensions.get('window').width;

const LoginScreen = props => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordSecured, setPasswordSecured] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedServer, setSelectedServer] = useState("live");
  const [rememberMe, setRememberMe] = useState(false)




  const nav = useNavigation();


  function isEmailValid(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLocaleLowerCase())
  }



  const submitHandler = async () => {
    if (!isEmailValid(email) || password.length < 5) {
      return Alert.alert(
        'Invalid Login Credentials',
        'Enter a valid Email & password &  try again',
        [{ text: 'OK' }],
      );
    } else {
      try {
        setLoading(true);
        // dispatch(login(email, password));
        const status = await dispatch(login(email, password, selectedServer, rememberMe));


        if (!status) {
          setLoading(false);
        }
        if (status) {
          nav.navigate('home');
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        return Alert.alert(
          ' No Internet Connection!',
          " Check your network and try again", [
          { text: 'OK' },
        ]);
      }
    }
  };





  ///////////////////////Back handler to handler back button press///////////////////
  const backActionHandler = () => {
    Alert.alert('Are You Sure!', 'Do you want to exit app?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };
  useBackHandler(backActionHandler);
  ///////////////////////////////////Get User login info from local storage /////////////////////////////////////



  const getAsyncStorageUserData = async () => {


    let userEmail = await AsyncStorage.getItem("userInfo");
    let userLoginInfo = JSON.parse(userEmail);
    if (userLoginInfo != null && userLoginInfo != undefined) {    
      setEmail(userLoginInfo.email);
      setPassword(userLoginInfo.password)
      setRememberMe(userLoginInfo.rememberMe)
    }
    return;

  }

//AsyncStorage.clear()

  useEffect(() => {
    getAsyncStorageUserData()


  }, [])

  return (

    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>


      <View style={styles.container} >
        <StatusBar backgroundColor={'#007bff'} />
        <OrientationLocker
          orientation={PORTRAIT}

        />

        <View style={styles.formContainer}>
          {/*<View style={styles.pickerContainer}>
            <Icon name="globe" size={wp(4)} color="#007bff" marginLeft={wp("3")}/>
          <Picker
                 selectedValue={selectedServer}
                 mode='dropdown'
                 dropdownIconColor="#007bff"
                 dropdownIconRippleColor='#E1E1F5'
                 style={{width:"100%", justifyContent: 'center', }}
                 onValueChange={(itemValue, itemIndex) =>
                  setSelectedServer(itemValue)
                 }>
              <Picker.Item label="Live" value="live"/>
              <Picker.Item label="Staging" value="staging" />
              <Picker.Item label="Beta" value="beta" />
        </Picker>
          
                </View>*/}

          <View style={styles.LottieViewContainer}>
            {Platform.OS != 'web' ?
              <LottieView source={require('../../Animations/42879-lottery-display-logo.json')}
                autoPlay loop
                style={styles.lottieStyle} /> : null}
          </View>


          <Text style={{ fontSize: rfv(12), fontWeight: 'bold', color: colors.tertiary, paddingVertical: 20 }}>Sign In To Your Account</Text>



          <View style={styles.UsernameContainer}>
            <Text style={styles.lebel}>Email</Text>
            <View style={[styles.emailInputView, { borderColor: !isEmailValid(email) && email.length > 0 ? 'red' : 'white', borderWidth: 1 }]}>
           
              <Ionicon name="mail" color={colors.tertiary} size={rfv(20)} />
            
              

              <TextInput

                style={[styles.input,]}
                keyboardType='email-address'
                textContentType='emailAddress'
                autoFocus={true}
                underlineColorAndroid="transparent"
                placeholder='Email Address...'
                autoCapitalize="none"
                require={true}
                value={email}
                initialValue=""
                onChangeText={(text) => setEmail(text)}


              />
            </View>
            {/*!isEmailValid(email) && email.length > 0 && (
              <Text style={{ fontSize: 15, color: 'red' }}>Email Address is not valid</Text>
            )*/}
          </View>
          <View style={styles.passwordContainer}>
            <Text style={styles.lebel}>Password</Text>

            <View style={[styles.inputView, { borderColor: password.length > 0 && password.length < 5 ? 'red' : 'white', borderWidth: 1 }]}>
          
              <Icon color={colors.tertiary} name='lock' size={rfv(20)} marginRight={10} />
              

              <TextInput
                style={[styles.PasswordInput, { paddingLeft: dew_Width < 700 ? 15 : 15 }]}
                secureTextEntry={passwordSecured}
                placeholder='Password...'
                textContentType='password'
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                initialValue=""
                value={password}
                onChangeText={(text) => setPassword(text)}

              />
              <TouchableOpacity
                style={{ padding: 4, }}
                onPress={() => {
                  setPasswordSecured(!passwordSecured);
                }}>
               
                <Icon name='eye'  size={rfv(20)} color={colors.tertiary} />
                
                

              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.checkBoxContainer}>
          
          <CheckBox
            disabled={false}
            value={rememberMe}
           // boxType={Platform.OS=="ios"? "circle": null}
            //onAnimationType="bounce"
            
            
            tintColors={{false: colors.primary, true: '#007bff'}}
           
            //style={{borderWidth:2, backgroundColor:'red',width:10 }}
            onValueChange={(newValue) => setRememberMe(newValue)}
          />
          <Text style={styles.rememberText}>Remember me</Text>
         </View>

          <TouchableOpacity 
          disabled={loading?true:false}
          style={styles.signInButton} onPress={() => submitHandler()}>
            {loading ? (

              <View style={styles.loaderContainer}>
                {Platform.OS != 'web' ?
                  <LottieView source={require('../../Animations/85032-loader-mat.json')}
                    autoPlay loop
                    style={styles.loaderLottieStyle} /> : null}

              </View>
            ) : (
              <Text style={styles.signInText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.versionText}>Version 1.0.4</Text>



        </View>

      </View>


    </TouchableWithoutFeedback>


  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',






  },
  pickerContainer: {
    flex: 1,
    alignSelf: 'center',
    borderColor: 'white',
    shadowOpacity: 0.45,
    shadowRadius: 0.44,
    elevation: 4,
    flexDirection: 'row',
    marginHorizontal: dew_Width > 700 ? wp("10%") : wp("8%"),
    height: hp("6%"),
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 5




  },
  formContainer: {
    width: wp("90%"),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: hp("5%"),
    borderRadius: 10,

    shadowOffset: {
      width: 0,
      height: 1

    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
    alignSelf: 'center',

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
    height: hp("8%"),
    width: wp("100%"),


  },
  UsernameContainer: {
    width: wp("70%"),
    height: hp("10%"),
    justifyContent: 'center',



  },


  input: {
    width: '100%',
    height: hp("100%"),
    color: colors.tertiary,
    paddingHorizontal: wp("4%"),
    borderRadius: 5,
    fontSize: rfv(10),




  },
  passwordContainer: {
    width: wp("70%"),
    height: hp("10%"),
    marginTop: 10,
    justifyContent: 'center',

  },

  PasswordInput: {
    width: '80%',
    height: "100%",
    color: colors.tertiary,
    paddingLeft: dew_Width <= 600 ? 10 : 0,
    backgroundColor: '#E1E1F5',
    paddingVertical: 5,
    fontSize: rfv(10),




  },
  emailInputView: {
    width: wp("70%"),
    height: dew_Width > 700 ? hp("5") : hp("6"),
    backgroundColor: '#E1E1F5',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 5,




  },

  inputView: {
    width: wp("70%"),
    height: dew_Width > 700 ? hp("5") : hp("6"),
    backgroundColor: '#E1E1F5',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 5,



  },
  lebel: {
    fontSize: rfv(10),
    fontWeight: 'bold',
    textAlign: 'left',
    color: colors.tertiary

  },
  signInButton: {
    width: wp("70%"),
    height: dew_Width > 700 ? hp("5") : hp("6"),
    marginVertical: 20,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,


  },
  signInText: {
    fontSize: rfv(10),
    fontWeight: 'bold',
    color: 'white'
  },
  forgetPasswordButton: {
    alignSelf: 'center',
    paddingBottom: 40
  },
  forgetText: {
    fontSize: rfv(10),
    fontWeight: '800'
  },
  versionText: {
    fontSize: rfv(10),
    color: colors.tertiary
  },
  loaderContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',




  },
  loaderLottieStyle: {
    height: rfv(40),
    alignSelf: 'center',
    width: wp("100%"),


  },
  checkBoxContainer:{
    flexDirection:'row',
    justifyContent:'flex-start',
   
    width: wp("72%"),
    alignContent:'center',
   marginTop:10,
    alignItems:'center'
  },
  rememberText:{
    fontSize: rfv(10),
    
    paddingHorizontal: Platform.OS==="ios"?15:0,
    textAlign: 'left',
    color: colors.tertiary
  }

})


export default LoginScreen;