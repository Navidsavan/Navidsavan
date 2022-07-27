import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, Platform, Alert, Dimensions, ActivityIndicator } from 'react-native';
//import { Ionicons  as Icon } from 'react-native-ionicons'
import { Icon } from 'react-native-elements';
import { RFPercentage as rfp, RFValue as rfv } from "react-native-responsive-fontsize";
import { Tooltip } from 'react-native-elements/dist/tooltip/Tooltip';
import colors from '../../Colors/Color';
//import MovableView from 'react-native-movable-view'
import { useSelector, useDispatch } from 'react-redux';
import { GamesSlotsNumbers, ticketGame, recommendedGameNumbers, ticketOnNumbers, recommendedSlots } from '../../store/actions/TicketGameActions';
const dew_Height = Dimensions.get('window').height
const dew_Width = Dimensions.get('window').width
import LottieView from 'lottie-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';





const TicketGameMobileComponent = (props) => {
  const navigation = useNavigation();
  let dispatch = useDispatch();
  let endingTickets = null
  const userCredentials = useSelector(state => state.userCredentials.userdata);

  endingTickets = userCredentials ? userCredentials.ending_ticket_url : null



  /////////////////// Loading Spinners States  ///////////////////
  const [newTicketLoading, setNewTicketLoading] = useState(false);
  const [luckyTicketLoading, setLuckyTicketLoading] = useState(false);
  const [endingTicketLoading, setEndingTicketLoading] = useState(false);
  const [reommendedGameLoading, setRecommendedGameLoading] = useState(false);
  const [recommendedSlotLoading, setRecommendedSlotLoading] = useState(false);
  const [ticketOnNumberLoading, setTicketOnNumberLoading] = useState(false);
  const [gameVertLoading, setGameVerLoading] = useState(false);
  const [slotVertLoading, setSlotVerLoading] = useState(false);
  const [onNumberVetLoading, setOnNumberVerLoading] = useState(false);
  ////////////////////Loading spinner timeout///////////////////
  setTimeout(() => {
    setNewTicketLoading(false)
    setLuckyTicketLoading(false)
    setEndingTicketLoading(false)
    setRecommendedGameLoading(false)
    setRecommendedSlotLoading(false)
    setTicketOnNumberLoading(false)
  }, 1200);

  /////////////////////////////////////////   SUBMIT HANDLER    //////////////////////////////////////////////
  const newTicketHandler = () => {
    setNewTicketLoading(true)

    return dispatch(ticketGame(
      url = userCredentials['new_ticket_url'],
      accessToken = userCredentials['accessToken']))
  }

  const luckeyTicketHandler = () => {
    setLuckyTicketLoading(true)
    return dispatch(ticketGame(
      url = userCredentials['lucky_ticket_url'],
      accessToken = userCredentials['accessToken']))
  }
  const endingTicketHandler = () => {
    setEndingTicketLoading(true)
    return dispatch(ticketGame(
      url = userCredentials['ending_ticket_url'],
      accessToken = userCredentials['accessToken']))
  }

  const recommendedGameHandler = () => {
    setRecommendedGameLoading(true)
    return dispatch(GamesSlotsNumbers(
      url = userCredentials['recommended_game_url'],
      setting_name = "recommended_ticket_event",
      pickage_id = userCredentials.pickage_id,
      accessToken = userCredentials['accessToken']))

  }
  const recommendedSlotHandler = () => {
    setRecommendedSlotLoading(true)
    return dispatch(GamesSlotsNumbers(
      url = userCredentials['recommended_slot_url'],
      setting_name = "recommended_slot_event",
      pickage_id = userCredentials.pickage_id,
      accessToken = userCredentials['accessToken']))
  }

  const ticketOnNumberHandler = () => {
    setTicketOnNumberLoading(true)
    return dispatch(GamesSlotsNumbers(
      url = userCredentials['recommended_number_url'],
      setting_name = "recommended_number_event",
      pickage_id = userCredentials.pickage_id,
      accessToken = userCredentials['accessToken']))

  }

  //////////////////////////////////////// recommendedGamesVertPressHandler ////////////////////////////////////////



  const recommendedGamesVertPressHandler = async () => {

    setGameVerLoading(true)
    try {
      let url = userCredentials['recommended_fetch_url']
      let setting_name = "recommended_ticket_event"
      let accessToken = userCredentials['accessToken']
      let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          setting_name: setting_name
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer ' + accessToken
        },
      }).then(response => response.json()).then(res =>

        navigation.navigate('recommendedGame', {
          currentNumbers: res.slots
        }, setGameVerLoading(false))
      )





    } catch (err) {
      setGameVerLoading(false);
      Alert.alert(
        err.message + "!",
        "Check your network and try again", [
        { text: 'OK' },]
      )
    }

  }



  //////////////////////////////////////// recommendedSlotsVertPressHandler ////////////////////////////////////////



  const recommendedSlotsVertPressHandler = async () => {

    setSlotVerLoading(true)
    try {
      let url = userCredentials['recommended_fetch_url']
      let setting_name = "recommended_slot_event"
      let accessToken = userCredentials['accessToken']
      let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          setting_name: setting_name
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer ' + accessToken
        },
      }).then(response => response.json()).then(res =>

        navigation.navigate('recommendedSlot', {
          currentNumbers: res.slots
        }, setSlotVerLoading(false))
      )





    } catch (err) {
      setSlotVerLoading(false);
      Alert.alert(
        err.message + "!",
        "Check your network and try again", [
        { text: 'OK' },]
      )
    }

  }

  //////////////////////////////////////// ticketOnNumberVertPressHandler ////////////////////////////////////////



  const ticketOnNumberVertPressHandler = async () => {

    setOnNumberVerLoading(true)
    try {
      let url = userCredentials['recommended_fetch_url']
      let setting_name = "recommended_number_event"
      let accessToken = userCredentials['accessToken']

      let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          setting_name: setting_name
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer ' + accessToken
        },
      }).then(response => response.json()).then(res =>

        navigation.navigate('onNumber', {
          currentNumbers: res.slots
        }, setOnNumberVerLoading(false))
      )





    } catch (err) {
      setOnNumberVerLoading(false);
      Alert.alert(
        err.message + "!",
        "Check your network and try again", [
        { text: 'OK' },]
      )
    }

  }



  return (
    <View style={styles.buttonsContainer}>
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={newTicketHandler}
          style={[styles.ticketGamebuttons, { width: !endingTickets ? '47.5%' : "32%", margin: dew_Width > 700 ? 4 : 3 }]}>
          <View style={{ flex: 1, flexDirection: 'column' }}
          >

            {/*  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItem: 'flex-end', width: '100%', paddingRight: 10 }}>
              {dew_Width > 700 ?
                <View style={styles.smallButtons}>
                  <Tooltip
                    animated={true}
                    width={rfp(30)}
                    fontSize={20}
                    height={rfp(5)}
                    closeOnOutsidePress={true}

                    backgroundColor="#0167ea"
                    overlayColor={false}



                    popover={<Text style={styles.toolTipText}>Animate New Games</Text>}>
                    <Text style={styles.questionMark}>?</Text>

                  </Tooltip>
                </View> : <Text></Text>}
              </View>*/}
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              {newTicketLoading ? (

                <LottieView source={require('../../Animations/85032-loader-mat.json')}
                  autoPlay loop
                  style={styles.lottieStyle} />
              ) : (
                <><Image source={require('../../Images/dashboardIcons/newTickets.png')} style={styles.imageStyle} />
                  <Text style={styles.buttonsText}>New Tickets</Text></>)}

            </View>

          </View>


        </TouchableOpacity>
        <TouchableOpacity onPress={luckeyTicketHandler}
          style={[styles.ticketGamebuttons, { width: !endingTickets ? '47.5%' : "32%", margin: dew_Width > 700 ? 4 : 3 }]}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            {/*  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItem: 'flex-end', width: '100%', paddingRight: 10 }}>
              {dew_Width > 700 ?
                <View style={styles.smallButtons}>
                  <Tooltip
                    animated={true}
                    width={rfp(30)}
                    fontSize={20}
                    height={rfp(5)}
                    closeOnOutsidePress={true}

                    backgroundColor="#0167ea"
                    overlayColor={false}


                    popover={<Text style={styles.toolTipText}>Animate 3 Random Slots</Text>}>
                    <Text style={styles.questionMark}>?</Text>

                  </Tooltip>
                </View> : <Text></Text>}


              </View>*/}
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              {luckyTicketLoading ? (

                <LottieView source={require('../../Animations/85032-loader-mat.json')}
                  autoPlay loop
                  style={styles.lottieStyle} />
              ) : (
                <><Image source={require('../../Images/dashboardIcons/luckeyTicket.png')} style={styles.imageStyle} />
                  <Text style={styles.buttonsText}>Lucky Tickets</Text></>)}

            </View>

          </View>


        </TouchableOpacity>



        {!endingTickets ? <Text></Text> :
          <TouchableOpacity onPress={endingTicketHandler}
            style={[styles.ticketGamebuttons, { width: !endingTickets ? '31%' : "32%", margin: dew_Width > 700 ? 4 : 3 }]}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
              {/*<View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItem: 'flex-end', width: '100%', paddingRight: 10 }}>
                {dew_Width > 700 ?
                  <View style={styles.smallButtons}>
                    <Tooltip
                      animated={true}
                      width={rfp(30)}
                      fontSize={20}
                      height={rfp(5)}
                      closeOnOutsidePress={true}

                      backgroundColor="#0167ea"
                      overlayColor={false}



                      popover={<Text style={styles.toolTipText}>Animate ended tickes</Text>}>
                      <Text style={styles.questionMark}>?</Text>

                    </Tooltip>
                  </View> : <Text></Text>}
                </View>*/}
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {endingTicketLoading ? (

                  <LottieView source={require('../../Animations/85032-loader-mat.json')}
                    autoPlay loop
                    style={styles.lottieStyle} />
                ) : (
                  <><Image source={require('../../Images/dashboardIcons/ending.png')} style={styles.imageStyle} />
                    <Text style={styles.buttonsText}>Ending Tickets</Text></>)}

              </View>

            </View>


          </TouchableOpacity>}

      </View >
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={recommendedGameHandler}
          style={[styles.ticketGamebuttons, { width: !endingTickets ? '31%' : "32%", margin: dew_Width > 700 ? 4 : 3 }]}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItem: 'flex-end', width: '100%' }}>

              <View style={styles.moreVertButton}>
                {/*dew_Width > 700 ?
                  <View style={[styles.smallButtons, { marginRight: 15 }]}>
                    <Tooltip
                      animated={true}
                      width={rfp(30)}
                      fontSize={20}
                      height={rfp(5)}
                      closeOnOutsidePress={true}
                      backgroundColor="#0167ea"
                      overlayColor={false}
                      popover={<Text style={styles.toolTipText}>Animate 3 random games, unless store choice has been set</Text>}>
                      <Text style={styles.questionMark}>?</Text>

                    </Tooltip>
                </View> : <Text></Text>*/}
                <TouchableOpacity style={styles.smallButtons} onPress={recommendedGamesVertPressHandler}>
                  {gameVertLoading ?
                    <View style={styles.loadingLottieViewContainer}>
                      {Platform.OS != 'web' ?
                        <LottieView source={require('../../Animations/85032-loader-mat.json')}
                          autoPlay loop
                          style={styles.loadingLottieStyle} /> : null}

                    </View> :
                    <Icon name='more-vert' size={rfp(1.5)} color="#0468eb" />}

                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'column',alignItems:'center'  }}>
              {reommendedGameLoading ? (

                <LottieView source={require('../../Animations/85032-loader-mat.json')}
                  autoPlay loop
                  style={styles.lottieStyle} />
              ) : (
                <><Image source={require('../../Images/dashboardIcons/recommendedGame.png')} style={styles.imageStyle} />
                  <Text style={styles.buttonsText}>Recommended Game</Text></>)}

            </View>

          </View>


        </TouchableOpacity>
        <TouchableOpacity onPress={recommendedSlotHandler}
          style={[styles.ticketGamebuttons, { width: !endingTickets ? '31%' : "32%", margin: dew_Width > 700 ? 4 : 3 }]}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItem: 'flex-end', width: '100%' }}>
              <View style={styles.moreVertButton}>
                {/*dew_Width > 700 ?
                  <View style={[styles.smallButtons, { marginRight: 15 }]}>
                    <Tooltip
                      // animated={true}
                      width={rfp(30)}
                      fontSize={20}
                      height={rfp(5)}
                      closeOnOutsidePress={true}

                      backgroundColor="#0167ea"
                      overlayColor={false}



                      popover={<Text style={styles.toolTipText}>Animate 3 random slots, unless store choice has been set</Text>}>
                      <Text style={styles.questionMark}>?</Text>

                    </Tooltip>
              </View> : <Text></Text>*/}
                <TouchableOpacity style={styles.smallButtons} onPress={recommendedSlotsVertPressHandler} >
                  {slotVertLoading ?
                    <View style={styles.loadingLottieViewContainer}>
                      {Platform.OS != 'web' ?
                        <LottieView source={require('../../Animations/85032-loader-mat.json')}
                          autoPlay loop
                          style={styles.loadingLottieStyle} /> : null}

                    </View> :
                    <Icon name='more-vert' size={rfp(1.5)} color="#0468eb" />}

                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'column',alignItems:'center'  }}>
              {recommendedSlotLoading ? (

                <LottieView source={require('../../Animations/85032-loader-mat.json')}
                  autoPlay loop
                  style={styles.lottieStyle} />
              ) : (
                <><Image source={require('../../Images/dashboardIcons/recommendedSlot.png')} style={styles.imageStyle} />
                  <Text style={styles.buttonsText}>Recommended Slots</Text></>)}

            </View>

          </View>


        </TouchableOpacity>
        <TouchableOpacity onPress={ticketOnNumberHandler}
          style={[styles.ticketGamebuttons, { width: !endingTickets ? '31%' : "32%", margin: dew_Width > 700 ? 4 : 3 }]}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={styles.moreVertButton}>
              {/*dew_Width > 700 ?
                <View style={[styles.smallButtons, { marginRight: 10 }]}>
                  <Tooltip
                    animated={true}
                    width={rfp(30)}
                    fontSize={20}
                    height={rfp(5)}
                    closeOnOutsidePress={true}

                    backgroundColor="#0167ea"
                    overlayColor={false}



                    popover={<Text style={styles.toolTipText}>Animate 3 random games, unless store choice has been set</Text>}>


                    <Text style={styles.questionMark}>?</Text>

                  </Tooltip>
              </View> : <Text></Text>*/}
              <View>
                <TouchableOpacity style={styles.smallButtons} onPress={ticketOnNumberVertPressHandler}
                disabled={ticketOnNumberLoading?true:false} >
                  {onNumberVetLoading ?
                    <View style={styles.loadingLottieViewContainer}>
                      {Platform.OS != 'web' ?
                        <LottieView source={require('../../Animations/85032-loader-mat.json')}
                          autoPlay loop
                          style={styles.loadingLottieStyle} /> : null}

                    </View> :
                    <Icon name='more-vert' size={rfp(1.5)} color="#0468eb" />}

                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'column',alignItems:'center'  }}>
              {ticketOnNumberLoading ? (

                <LottieView source={require('../../Animations/85032-loader-mat.json')}
                  autoPlay loop
                  style={styles.lottieStyle} />
              ) : (
                <><Image source={require('../../Images/dashboardIcons/ticketNumber.png')} style={styles.imageStyle} />
                  <Text style={styles.buttonsText}>Ticket On Number</Text></>)}

            </View>

          </View>


        </TouchableOpacity>
      </View>

    </View>



  )
}


const styles = StyleSheet.create({
  buttonsContainer: {
    flex: 2,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    marginHorizontal: dew_Width < 700 ? 5 : 0,
    height: '100%',
    paddingVertical: 3




  },
  ticketGamebuttons: {
    backgroundColor: '#19254a',
    borderRadius: 5,
    paddingTop: 5,
   






  },

  smallButtons: {
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: '#3F5681',
    width: rfp(3),
    height: rfp(3),
    justifyContent: 'center',
    alignItems: 'center',

  },
  questionMark: {
    fontSize: rfp(1.5),
    color: '#0468eb',
    fontWeight: 'bold'
  },


  button: {
    padding: 5,
    width: '32.5%',
    borderRadius: 5,
    backgroundColor: '#19254a'

  },
  toolTipText: {
    position: 'absolute',
    fontSize: rfp(1.5),
    color: 'white',

  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 3,
    justifyContent: 'space-between',


  },


  imageStyle: {
    alignSelf: 'center',
    width: rfp(5),
    height: rfp(5),




  },

  buttonsText: {
    fontSize: rfv(10),
    color: 'white',
    textAlign: 'center'

  },
  lottieStyle: {
    width: rfp(7),


  },
  moreVertButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItem: 'flex-end',
    width: '100%',
    paddingRight: 5,

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
    height: hp("4%"),
    width: wp("100%"),


  },



})

export default TicketGameMobileComponent;
