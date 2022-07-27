import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, StatusBar, Dimensions, TouchableOpacity, Alert, ActivityIndicator, BackHandler, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { Icon as Ionicon } from 'react-native-elements'
import ShowTicketComponent from '../Components/DashboardComponents/ShowTicketComponent';
import TicketInventoryComponent from '../Components/DashboardComponents/TicketInventoryComponent';
import TickeAnnouncementComponent from '../Components/DashboardComponents/TicketAnnouncementComponent';
import { RFPercentage as rfp, RFValue as rfv } from "react-native-responsive-fontsize";
import colors from '../Colors/Color';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/LoginActions';
import { useNavigation } from '@react-navigation/native';
import { showTicket } from '../store/actions/ShowTicketActions';
import { useBackHandler, exitApp } from '@react-native-community/hooks'
import TicketGameComponent from '../Components/DashboardComponents/TicketGameComponent';
import { OrientationLocker, PORTRAIT, LANDSCAPE, } from "react-native-orientation-locker";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import UpdatedSlotComponent from '../Components/DashboardComponents/UpdatedSlotComponent'
import { LogBox } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'








////////////////////////// Ignore log notification by message  ////////////////////////////////////
LogBox.ignoreLogs(['Warning: ...']);
////////////////////////Ignore all log notifications //////////////////////////////////////////////
LogBox.ignoreAllLogs();

///////////////////////////////////////////////////////////////////////////////////////////////////
const dew_Height = Dimensions.get('window').height
const dew_Width = Dimensions.get('window').width




const HomeScreen = props => {
    const [dolerPress, setDolerPress] = useState('');
    const [loading, setLoading] = useState(false);
    //const [orientation, setOrientation]=useState(PORTRAIT)

    const userCredentials = useSelector(state => state.userCredentials.userdata);
    let TicketAmount = [null]
    TicketAmount = [...userCredentials != null ? userCredentials['amount'] : '']
    const nav = useNavigation();
    const dispatch = useDispatch();




    /////////////////////////// Logout Handler //////////////////////////////////////////////
    const logoutHandler = async () => {
        await dispatch(logout());
        nav.navigate('login');

    };



    //////////////////////////  Back handler to handler back button press  //////////////////////
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
    ////////////////////////////////// Lock Orientation //////////////////////////////////////
    /*  <OrientationLocker
                  orientation={dew_Width < 600 ? PORTRAIT :orientation}
  
              />
  
      let initial = Orientation.getInitialOrientation();
      const isPortrait = () => {
          const dim = Dimensions.get('screen');
          return dim.height >= dim.width;
       
      };
  
      useEffect(() => {
          const callback = () => setOrientation(isPortrait() ? PORTRAIT : LANDSCAPE);
  
          Dimensions.addEventListener('change', callback);
  
          return () => {
              // Dimensions.remove('change', callback);
          };
      }, []);*/


    /////////////////////////////////////// Monet button press handler ///////////////////////
    const dolerButtonHandler = (ticket_amount) => {
        setDolerPress(ticket_amount);
        setLoading(true);
        return dispatch(showTicket(
            url = userCredentials['amount_url'],
            ticket_amount = ticket_amount,
            accessToken = userCredentials['accessToken']))

    }
    ////////////////////////////////////// loading animation handler //////////////////////////
    setTimeout(function () {
        setDolerPress('');
    }, 1200);

    //////////////////////////////////////// ////////////////////////////////////////////////////




    return (

        <SafeAreaView style={styles.container}>

            <OrientationLocker
                orientation={PORTRAIT}

            />

            {/************************************  Recent Updated Slot ******************************************/}
            <View style={styles.recentUSContainer}>
                <StatusBar backgroundColor={colors.tertiary} />
                {/**************************************    header menu and logo container ************************* */}
                <View style={styles.headerContainer}>
                    {/* <TouchableOpacity style={styles.menuButton} >
                            <Ionicon name="menu" size={rfv(16)} color="white"  />
                </TouchableOpacity>*/}
                    <View style={{ justifyContent: 'center', alignContent: 'center', flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>

                        <Image source={require('../Images/dashboardIcons/logo.png')} style={styles.logoStyle} />
                        <Text style={styles.logoControllerText}>Lottery Display Controller</Text>
                    </View>
                    <TouchableOpacity style={styles.logoutButton} onPress={logoutHandler}>
                        <Icon name="logout" size={rfv(14)} color="white" />
                    </TouchableOpacity>
                </View>
                {/*****************************************************************************************************/}
                <UpdatedSlotComponent />
            </View>







            {/************************************ Ticket Inventory **************************************************/}
            <View style={styles.subContainer}>
                <View style={styles.inventoryContainer}>
                    <View style={styles.sectionTitleContainer}>
                        <Image source={require('../Images/dashboardIcons/recent.png')} style={styles.imageStyle} />
                        <Text style={styles.titleText}>Ticket Inventory</Text>
                    </View>

                    <TicketInventoryComponent
                        onActivePackPress={() => props.navigation.navigate("activePack")}
                        onConformPress={() => props.navigation.navigate('conformPack')} />

                </View>



                {/************************************ Show Tickets On Screen ******************************************/}
                <View style={styles.showTOSContainer}>
                    <View style={[styles.sectionTitleContainer, { marginHorizontal: dew_Width > 700 ? wp('1%') : wp('3%') }]}>

                        <Image source={require('../Images/dashboardIcons/showTicket.png')} style={styles.imageStyle} />
                        <Text style={styles.titleText}>Show Tickets On Screen</Text>
                    </View>


                    <FlatList
                        data={TicketAmount}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={true}
                        scrollEnabled={false}
                        nestedScrollEnabled={true}

                        style={styles.priceList}
                        numColumns={dew_Width > 700 ? 8 : 6}
                        keyExtractor={(item, index) => item}

                        renderItem={(itemData) =>
                            <ShowTicketComponent
                                ticketPrice={itemData.item}
                                ///// 'dolerPress' this variable is just passing press button value back to child to triger loader /////
                                dolerPress={dolerPress}
                                onPress={() => dolerButtonHandler(itemData.item)}
                            />
                        }

                    />
                </View>


                {/************************************ Ticket Announcement ****************************************/}
                <View style={styles.ticketGameContainer} >

                    <TicketGameComponent />

                </View>


                <View style={styles.ticketAncContainer}>
                    <View style={[styles.sectionTitleContainer, { marginHorizontal: dew_Width > 700 ? wp('1%') : wp('3%') }]}>
                        <Image source={require('../Images/dashboardIcons/ticketAnnounce.png')} style={styles.imageStyle} />
                        <Text style={styles.titleText}>Ticket Announcement </Text>
                    </View>

                    <TickeAnnouncementComponent />
                </View>
                {/** 
                <View style={styles.endShiftContainer} >
                    <EndShiftComponent onAddWinerPress={()=>props.navigation.navigate('camra')} />
                </View>
                */}
            </View>

        </SafeAreaView>




    )
}



const styles = StyleSheet.create({
    container: {
        flex: 7,
        backgroundColor: colors.tertiary,
        width: "100%",
        height: "100%",
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,




    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingBottom: 5,
        justifyContent: 'space-between',
        alignItems: 'center',




    },
    menuButton: {
        borderWidth: 1,
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        borderRadius: 5,
        borderColor: colors.primary,
        backgroundColor: colors.tertiary


    },
    logoStyle: {

        /* alignSelf: 'center',
         width:dew_Width<700? 156: 250,
         height:dew_Width<700? 21: 35,*/
        width: dew_Width > 700 ? 36 : 24,
        height: dew_Width > 700 ? 30 : 20,




    },
    sectiontitleView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: "100%",
        height: "100%",
        position: 'absolute',


    },
    recentUSContainer: {
        marginTop: hp("1%"),
        position: 'relative',




    },
    recentAndLogoutContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-start',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,


    },


    subContainer: {
        flex: 6,
        backgroundColor: colors.tertiary,
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: "100%",
        height: "100%",




    },
    sectionTitleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',



    },




    inventoryContainer: {
        flex: dew_Width > 700 ? 1 : 0.9,
        borderBottomWidth: 2,
        borderBottomColor: '#252d48',
        justifyContent: 'center',
        alignContent: 'center',
        paddingVertical: dew_Width > 700 ? 10 : 5,
        paddingHorizontal: 10,
        width: '100%',



    },


    showTOSContainer: {
       // borderBottomWidth: 2,
        borderBottomColor: '#252d48',
        width: '100%'




    },
    priceList: {
        marginHorizontal: 7,
        paddingBottom: dew_Width > 700 ? 5 : 3

    },
    ticketGameContainer: {
        flex: dew_Width > 700 ? 2 : 1.8,
        borderBottomWidth: 2,
        borderBottomColor: '#252d48',
        flexDirection: 'row',
        width: '100%'

    },
    ticketAncContainer: {
        flex: dew_Height > 700 ? 1.2 : 1.2,
        borderBottomColor: '#252d48',
        justifyContent: 'center',
        alignContent: 'center',
        flexWrap: 'nowrap',
        width: '100%'






    },


    imageStyle: {
        width: rfp(3.5),
        height: rfp(3.5)

    },
    titleText: {
        fontSize: dew_Width > 500 ? rfp(2) : rfp(1.8),
        color: '#98A2BF',
        marginLeft: 5,
        textAlign: 'center',

    },
    logoutButton: {
        borderWidth: 1,
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        borderRadius: 5,
        borderColor: colors.primary,
        backgroundColor: colors.tertiary

    },
    logoControllerText: {
        fontSize: dew_Width > 700 ? rfv(18) : rfv(14),
        color: 'white',
        fontWeight: 'bold',
        paddingLeft: 4,
        paddingBottom: 4,

    }





})


export default HomeScreen;
