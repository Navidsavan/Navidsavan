import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity,TouchableWithoutFeedback, Keyboard, Dimensions, TextInput, Alert, FlatList } from 'react-native';
import colors from '../Colors/Color';
import { RFPercentage as rfp, RFPercentage, RFValue as rfv } from "react-native-responsive-fontsize";
import { Icon } from 'react-native-elements';
import { RecommendedGamesModel, ResetGameNumbers } from '../store/actions/TicketGameActions';
import { useSelector, useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const dew_Height = Dimensions.get('window').height
const dew_Width = Dimensions.get('window').width

const TicketOnNumberScreen = props => {
    let  current_numbers=props.route.params.currentNumbers;

    let dispatch = useDispatch();
    const [gameNumber, setGameNumber] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [restLoading, setResetLoading] = useState(false)
    const [recommendedGameNumbers, setRecommendedGameNumbers] = useState(true);
    const [temNumbers, setTempNumbers]=useState('');




    const userCredentials = useSelector(state => state.userCredentials.userdata);
  

    /////////////////////////////////////////// Game Number Vallidation ////////////////////////////////////////
    function isValidGameNumber(gameNumber) {
        const re = /^[-,0-9 ]+$/
        return re.test(String(gameNumber))
    }
    
  


    ////////////////////////////////////////////// Save Handler ////////////////////////////////////////////////
    const saveHandler = async () => {
        if (!isValidGameNumber(gameNumber)) {
            return setGameNumber("..")
        } else {
            try {
                setRecommendedGameNumbers(false);
                setIsLoading(true);
                // dispatch(login(email, password));
                let temnums=gameNumber.split(',');
                setTempNumbers(temnums);
                const status = await dispatch(RecommendedGamesModel(

                    url = userCredentials['recommended_save_url'],
                    setting_name = 'recommended_number_event',
                    recommended_slot_input = gameNumber,
                    accessToken = userCredentials['accessToken']
                ));
                setIsSubmitted(true)
                setIsLoading(false);
                setGameNumber(null)
                textInput.clear()

               /* setTimeout(function () {
                    setIsSubmitted(false)
                }, 6000);*/


            } catch (err) {
                // setLoading(false);
                return Alert.alert(
                    ' No Internet Connection!',
                    " Check your network and try again", [
                    { text: 'OK' },
                ]);
            }
        }
    };


    ///////////////////// Reset Handler ///////////////////////////
    const resetHandler = async () => {

        setResetLoading(true),
        setTempNumbers('');

            await dispatch(ResetGameNumbers(
                url = userCredentials['recommended_reset_url'],
                setting_name = "recommended_number_event",
                accessToken = userCredentials['accessToken'])),
            setRecommendedGameNumbers(false);
            setResetLoading(false);

         

    }
    /////////////////////////////////////////////////// Return //////////////////////////////////////////////////////

    return (
        <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}>
        <View style={styles.modalView}>
            {/********************** Header Back Arrow******************************* */}
            <View style={styles.modelCloss}>

                <TouchableOpacity onPress={()=>props.navigation.navigate('homeTab')}
                    style={{ justifyContent: 'flex-start', alignItems: 'flex-start'}}
                >
                    <Icon name="arrow-back" size={rfv(25)} color="white" />
                </TouchableOpacity>
                 {/********************** Title with image ******************************* */}
                <View>

                <Image source={require('../Images/dashboardIcons/ticketNumber.png')} style={styles.modelImageStyle} />
                    <Text style={styles.modelTitleText}>Show Ticket On Number</Text>
                    {isSubmitted ?
                        <Text style={styles.updattedText}>Updated!</Text>
                        : <Text></Text>}
                </View>
            </View>

           {/********************** Input Container   ******************************* */}
            <View style={styles.inputView}>

                <View style={styles.gameInputContainer}>
                <Text style={styles.inputlebel}>Enter Current Number</Text>
                    <TextInput

                        style={[styles.input, { borderColor: !isValidGameNumber(gameNumber) && gameNumber ? "red" : '#98A2BF', height: dew_Width <= 600 ? 40 : 60, }]}
                        keyboardType='numeric'
                        autoFocus={true}
                        placeholder={'1,2,3..'}
                        placeholderTextColor={"#98A2BF"}
                        autoCapitalize="none"
                        initialValue=""
                        ref={input => { textInput = input }}

                        onChangeText={(text) => setGameNumber(text)}

                    />
                </View>
            </View>
           

             {/********************** current number s and reset button container ******************************* */}
            <View style={styles.addButtonContainer}>

                <View>
                    <Text style={[styles.inputlebel]}>Current Numbers</Text>
                   
                        <FlatList
                            data={recommendedGameNumbers? current_numbers: temNumbers}
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            // horizontal={dew_Width<600?true:false}
                            scrollEnabled={true}
                            style={{maxHeight:dew_Width>700?400: 200}}
                            numColumns={4}
                            keyExtractor={(item, index) => item}

                            renderItem={(itemData) =>
                                <Text style={styles.recommendedNumbers}>{itemData.item}</Text>
                            }

                        /> 


                </View>



                <TouchableOpacity
                    onPress={resetHandler}
                    style={[styles.resetButton, { width: wp("30%") }]}>
                    <View style={{ flexDirection: 'row' }}>

                        {restLoading ? (

                            <LottieView source={require('../Animations/85032-loader-mat.json')}
                                autoPlay loop
                                style={styles.lottieStyle} />
                        ) : (
                            <><Text style={styles.buttonText}>Reset</Text>
                                <Icon name='reset-tv' size={rfp(3)} color="white" marginLeft={5} /></>)}
                    </View>
                </TouchableOpacity>
            </View>
           
            {/********************** Save button conatiner ******************************* */}

            <View style={styles.activateButtonContainer}>
                <View style={styles.ACButtonContainer}>
                    <TouchableOpacity onPress={()=>props.navigation.navigate('homeTab')}
                        style={[styles.activateButton,
                        { backgroundColor: 'transparent', }]}>
                        <Text style={styles.buttonText}>Close </Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.ACButtonContainer}>
                    <TouchableOpacity onPress={saveHandler}
                        style={[styles.activateButton,
                        { backgroundColor: '#208EFD', }]}>
                        {isLoading ? (

                            <LottieView source={require('../Animations/85032-loader-mat.json')}
                                autoPlay loop
                                style={styles.lottieStyle} />
                        ) : (
                            <Text style={styles.buttonText}>Save </Text>)}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </TouchableWithoutFeedback>
    )

}



styles = StyleSheet.create({
    modalView: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingTop:Platform.OS==="android"? 20:40,
        backgroundColor: colors.tertiary,
       
    },
    modelCloss: {
        flexDirection: 'column',
        justifyContent: 'space-between',


    },
    modelTitleText: {
        fontSize: rfv(13),
        color: '#98A2BF',
        marginTop: 10,
        textAlign: 'center',
        alignSelf: 'center',
        paddingHorizontal: 10,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    modelText: {
        fontSize: rfv(10),
        marginHorizontal: 20,
        color: '#98A2BF',
        paddingHorizontal: 10


    },
    input: {
        width: '100%',
        height: dew_Width <= 600 ? 40 : 60,
        marginVertical: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: colors.primary,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: rfv(10),
        borderColor: '#98A2BF',
        color: '#98A2BF'




    },
    inputView: {
        flexDirection: 'row',
        paddingTop: 25,
        justifyContent: 'space-between'
    },
    inputlebel: {

        fontSize: rfv(10),
        alignSelf: 'flex-start',
        fontWeight: '500',
        color: '#98A2BF'
    },

    gameInputContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'

    },

    
    addButtonContainer: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingBottom: 30,
    },

    resetButton: {
        height: dew_Width <= 600 ? 40 : 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderWidth: 1,
        borderColor: '#98A2BF',
        borderRadius: 5

    },
    modelImageStyle: {
        width: rfp(6),
        alignSelf: 'center',
        marginTop: 20,
        height: rfp(6),

    },
    updattedText: {
        fontSize: rfv(10),
        color: 'green',
        borderRadius: 5,
        alignSelf: 'center',
        backgroundColor: '#c6ede0',
        marginTop: 20,
        padding: 10,
        width: '50%',
        textAlign: 'center'

    },
    lottieStyle: {

        width: rfp(5)

    },
    recommendedNumbers: {
        fontSize: rfv(10),
        borderWidth: 2,
        borderColor: colors.primary,
        padding: 10,
        margin: 4,
        borderRadius: 4,
        marginVertical: 10,
        color: '#98A2BF'

    },
    /////////////////////////////////// Next and close button ///////////////////
    activateButtonContainer: {
        flex: 2,
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        justifyContent: 'space-around'
        //paddingHorizontal: 10,


    },

    ACButtonContainer: {
        width: "50%",
        // paddingHorizontal: 10,
        paddingVertical: hp(6),
        padding: 5

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






})

export default TicketOnNumberScreen;