import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { RFPercentage as rfp, RFValue as rfv } from "react-native-responsive-fontsize";
import { Tooltip } from 'react-native-elements/dist/tooltip/Tooltip';
import { useSelector, useDispatch } from 'react-redux';
import { ticketAnnouncement } from '../../store/actions/ticketAnnouncementActions';
import LottieView from 'lottie-react-native';


const dew_Height = Dimensions.get('window').height
const dew_Width = Dimensions.get('window').width

const TickeAnnouncementComponent = (props) => {
  const [announceLoading, setAnnounceLoading] = useState(false);
  const [incentiveLoading, setincentiveLoading] = useState(false);
  const [vetransLoading, setVetransLoading] = useState(false);
  const [secondChanceLoading, setSecondChanceLoading] = useState(false);

  let dispatch = useDispatch();
  const userCredentials = useSelector(state => state.userCredentials.userdata);


    ////////////////////Loading spinner timeout////////////////////////////////
    setTimeout(() => {
      setAnnounceLoading(false)
      setincentiveLoading(false)
      setVetransLoading(false)
      setSecondChanceLoading(false)
    }, 1200);

  ////////////////////////// Orientation Listner//////////////
  /*const[orientation, setOrientation]=useState(null)
  
  
  const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };
    
    useEffect(() => {
      const callback = () => setOrientation(isPortrait() ? 'portrait' : 'landscape');
    
      Dimensions.addEventListener('change', callback);
    
     /* return () => {
        Dimensions.removeEventListener('change', callback);
      };
    }, []);*/

  /////////////////////////////////////////   SUBMIT HANDLER    //////////////////////////////////////////////
  const AnnounceSubmitHandler = () => {
    setAnnounceLoading(true)
  
    return dispatch(ticketAnnouncement(
      url = userCredentials['jackpot_url'],
      accessToken = userCredentials['accessToken']))
    }

    const IncentiveSubmitHandler = () => {
      setincentiveLoading(true)
        return dispatch(ticketAnnouncement(
        url = userCredentials['incentive_url'],
        accessToken = userCredentials['accessToken']))
       }
    const VeternsSubmitHandler = () => {
        setVetransLoading(true)
        return dispatch(ticketAnnouncement(
        url = userCredentials['veterans_url'],
        accessToken = userCredentials['accessToken']))
        }
      
        const secondChanceSubmitHandler = () => {
          setSecondChanceLoading(true)
         return dispatch(ticketAnnouncement(
        url = userCredentials['2ndChange_url'],
        accessToken = userCredentials['accessToken']))

         }




    
    
 



  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity onPress={AnnounceSubmitHandler}
        style={styles.ticketAnnouncementButtons}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
         { /*<View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItem: 'flex-end', width: '100%', height: '10%' }}>
          {dew_Width>700?
            <View style={styles.smallButtons}>
              <Tooltip
                animated={true}
                width={rfp(30)}
                fontSize={20}
                height={rfp(5)}
                closeOnOutsidePress={true}

                backgroundColor="#0167ea"
                overlayColor={false}

                popover={<Text style={styles.toolTipText}>Announce today draw game jackpots</Text>}>
                <Text style={styles.questionMark}>?</Text>

              </Tooltip>
  </View>:<Text></Text>}
          </View>*/}
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {announceLoading? (
              
              <LottieView source={require('../../Animations/85032-loader-mat.json')}
              autoPlay loop
              style={styles.lottieStyle} /> 
              ) : (
                <><Image source={require('../../Images/dashboardIcons/announceJackpot.png')} style={styles.imageStyle} />
            <Text style={styles.buttonText}>Announce Jackpot</Text></>)}

          </View>

        </View>


      </TouchableOpacity>
      <TouchableOpacity
        onPress={IncentiveSubmitHandler}
        style={styles.ticketAnnouncementButtons}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          {/*<View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItem: 'flex-end', width: '100%', height: '10%' }}>
          {dew_Width>700?
            <View style={styles.smallButtons}>
              <Tooltip
                animated={true}
                width={rfp(30)}
                fontSize={20}
                height={rfp(5)}
                closeOnOutsidePress={true}

                backgroundColor="#0167ea"
                overlayColor={false}

                popover={<Text style={styles.toolTipText}>Animate promotional game packs</Text>}>
                <Text style={styles.questionMark}>?</Text>

              </Tooltip>
              </View>:<Text></Text>}
          </View>*/}
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          {incentiveLoading ? (
              
              <LottieView source={require('../../Animations/85032-loader-mat.json')}
              autoPlay loop
              style={styles.lottieStyle} /> 
              ) : (
               <><Image source={require('../../Images/dashboardIcons/incentive.png')} style={styles.imageStyle} />
                <Text style={styles.buttonText}>Incentive Tickets</Text></>)}

          </View>

        </View>


      </TouchableOpacity>
      <TouchableOpacity
       onPress={VeternsSubmitHandler}
        style={styles.ticketAnnouncementButtons}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
         { /*<View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItem: 'flex-end', width: '100%', height: '10%' }}>
          {dew_Width>700?
            <View style={styles.smallButtons}>
              <Tooltip
                animated={true}
                width={rfp(30)}
                fontSize={20}
                height={rfp(5)}
                closeOnOutsidePress={true}

                backgroundColor="#0167ea"
                overlayColor={false}


                popover={<Text style={styles.toolTipText}>Animate veterans Supported  games</Text>}>
                <Text style={styles.questionMark}>?</Text>

              </Tooltip>
              </View>:<Text></Text>}
          </View>*/}
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          {vetransLoading ? (
              
              <LottieView source={require('../../Animations/85032-loader-mat.json')}
              autoPlay loop
              style={styles.lottieStyle} /> 
              ) : (
              <><Image source={require('../../Images/dashboardIcons/veterans.png')} style={styles.imageStyle} />
            <Text style={styles.buttonText}>Veterans Tickets</Text></>)}

          </View>

        </View>


      </TouchableOpacity>
      <TouchableOpacity
       onPress={secondChanceSubmitHandler}
        style={styles.ticketAnnouncementButtons}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          {/*<View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItem: 'flex-end', width: '100%', height: '10%' }}>
          {dew_Width>700?
            <View style={styles.smallButtons}>
              <Tooltip
                animated={true}
                width={rfp(30)}
                fontSize={20}
                height={rfp(5)}
                closeOnOutsidePress={true}

                backgroundColor="#0167ea"
                overlayColor={false}


                popover={<Text style={styles.toolTipText}>Animate games pack with 2nd chance drawings</Text>}>
                <Text style={styles.questionMark}>?</Text>

              </Tooltip>
              </View>:<Text></Text>}
          </View>*/}
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          {secondChanceLoading ? (
              
              <LottieView source={require('../../Animations/85032-loader-mat.json')}
              autoPlay loop
              style={styles.lottieStyle} /> 
              ) : (
             <><Image source={require('../../Images/dashboardIcons/2ndChance.png')} style={styles.imageStyle} />
            <Text style={styles.buttonText}>2nd Chance Tickets</Text></>)}

          </View>

        </View>


      </TouchableOpacity>
    </View>
  )
}



const styles = StyleSheet.create({
  buttonsContainer: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical:dew_Width>700? 10:5


  },
  ticketAnnouncementButtons: {

    backgroundColor: '#19254a',
    borderRadius: 5,
    width:dew_Width>700?"24%": '23.7%',
    height:"100%",
    paddingVertical: dew_Width>600?20:0,
    paddingHorizontal: dew_Width>600?10:2,




  },
  smallButtons: {
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: '#3F5681',
    width: rfp(3),
    height: rfp(3),
    //marginTop:4,
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',


  },
  toolTipText: {
    position: 'absolute',
    fontSize: rfp(1.5),
    color: 'white',




  },
  questionMark: {
    fontSize: rfp(1.5),
    color: '#0468eb',
    fontWeight: 'bold'
  },

  imageStyle: {
    width: rfp(5),
    height: rfp(5),


  },
  buttonText: {
    fontSize: rfv(10),
   
    color: 'white',
    overflow: 'scroll',
  
    textAlign: 'center'

  },
  lottieStyle: {
   width: rfp(7),
   

  },


})



export default TickeAnnouncementComponent;