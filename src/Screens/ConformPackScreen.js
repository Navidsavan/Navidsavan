import React, {
    useState,
    useEffect,
    useRef
} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Keyboard,
    Dimensions,
    TouchableWithoutFeedback,
    Modal,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Alert,
    FlatList
} from 'react-native';
import { Tooltip } from 'react-native-elements/dist/tooltip/Tooltip';
import {
    RFPercentage as rfp,
    RFValue as rfv
} from "react-native-responsive-fontsize";
import colors from '../Colors/Color';
import { Icon } from 'react-native-elements';
import {
    useSelector,
    useDispatch
} from 'react-redux';
import {
    actions,
    RichEditor,
    RichToolbar
} from "react-native-pell-rich-editor";
import { ConformPacksAction } from '../store/actions/TicketInventoryActions';
import LottieView from 'lottie-react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import SweetAlert from 'react-native-sweet-alert';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import ScannedCodeList from '../Components/ModelComponents/ScannedCodeList';
import EndDayFinalModal from '../Components/ModelComponents/EndDayFinalModal';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const dew_Height = Dimensions.get('window').height
const dew_Width = Dimensions.get('window').width

///// Functional component Start from here as ConformPackScreen //////////////

const ConformPackScreen = props => {
    let dispatch = useDispatch();
    ////////////////// User Credentials from redux ///////////////
    const userCredentials = useSelector(state => state.userCredentials.userdata);


    /////////////////// Component States/////////////
    const [editorNumbers, setEditorNumbers] = useState('');

    const [nullSubmit, setNullSubmit] = useState(false);
    const [isloading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false)
    const [scannerVisible, setScannerVisible] = useState(false);
    const [scannnedBarCode, setScannedBarCode] = useState([]);
    const [startScanning, setStartScanning] = useState(false);
    const [disableEditor, setDisableleEditor] = useState(false);

    const [conformPackModal, setConformPackModal] = useState(false);
    const [responseData, setResponseData] = useState('');
    const [showScannedTickets, setShowScannedTickets] = useState(false);






    richText = React.useRef();



    ///////////////// Input Handler /////////////////
    const inputHandler = (text) => {
        var content = text;
        content = content.replace(/<[^>]*>/g, ',');
        let inputARRAY = content.replace(/,+/g, ',');
        let replaceFirstComma = inputARRAY.replace(/^,/, '')
        let scan_codes = replaceFirstComma.replace(/,\s*$/, "")
        setEditorNumbers(scan_codes)

    }





    /* setTimeout(function () {
         setNullSubmit(false)
         setIsLoading(false)
     }, 600);*/
    /////////////// Api call ////////////////////////
    const conformHandler = async () => {



        if (!editorNumbers) {
            setNullSubmit(true);
            setIsLoading(false);

            return;

        } else {
            setIsLoading(true)
            try {


                let finalScaneCodes = scannnedBarCode.join(",");

                url = userCredentials['confirm_url']
                let scancodes = editorNumbers === 1 ? finalScaneCodes : editorNumbers
                let accessToken = userCredentials['accessToken']

                let response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({
                        "scan_codes": scancodes
                    }),
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': 'Bearer ' + accessToken
                    },
                }).then(response => response.json())


                setResponseData(response);
                setNullSubmit(false);

                if (response.success === 1 || response.success === 0) {

                    setIsLoading(false)
                    setConformPackModal(true)

                    setStartScanning(false)
                }
                if (response.success === 1) {
                    setStartScanning(false)

                }





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




    ///////////////////////////////////////////// ScannerVisibleHandler to Show Scanner ////////////////////////
    function ManualVisibleHandler() {
        setScannerVisible(false);
        setScannedBarCode([]);
        setEditorNumbers('');
        setStartScanning(false);
        setDisableleEditor(false);

    }
    function scannerVisibleHandler() {
        setDisableleEditor(true);


        /////////////// Resolve asyncronus action warning //////////////////////////////////////////////////////////
        setTimeout(function () {
            setScannerVisible(true);
            setEditorNumbers('');
        }, 300);



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
        else {

            SweetAlert.showAlertWithOptions({
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

        }


    }



    ///////////////////////////////////////// Scanned Tickets Delete Handler //////////////////////////////////////////////

    function deleteHandler(item) {
        const result = scannnedBarCode.filter((deleteableCode) => deleteableCode != item);
        setScannedBarCode(result)
    }

    ////////////////////////////////////////// Scanner related functions end here /////////////////////////////////////////

    function okHandler() {
        setModalVisible(false);
        setScannedBarCode([]);
        setEditorNumbers('');
        setStartScanning(false);
        setDisableleEditor(false);
        setResponseData('');
        setConformPackModal(false);
        props.navigation.navigate('Home')


    }
    ////////////////////////////////////////////// Modal close Handler ////////////////////////////////////////
    function modalClossHandler() {
        setResponseData('');
        setEndDayFinalModal(false);

    }

    return (

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[styles.container, { opacity: conformPackModal ? 0.5 : 1 }]}>
                {/*////////////////////////////////////// Alert Modal   //////////////////////////////////////////// */}



                <Modal
                    animationType='fade'
                    transparent={true}

                    backgroundColor={colors.tertiary}
                    visible={conformPackModal}
                    onRequestClose={() => {
                        setConformPackModal(!conformPackModal);


                    }}>
                    <EndDayFinalModal

                        success={responseData.msg ? responseData.msg : responseData.error}
                        onPress={() => okHandler()}
                        onCancelPress={modalClossHandler}
                        onErrorPress={() => setConformPackModal(false)}
                        successStatus={responseData.success}
                    />
                </Modal>
                {/*/////////////////////////  show Scanned tickets Modal   ////////////////*/}
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={showScannedTickets}
                    onRequestClose={() => {
                        setShowScannedTickets(!showScannedTickets);
                    }}>
                    <View style={styles.scanedTicketsContainer}>
                        <View style={styles.ScannedModalHeaderContainer}>
                            <Text style={styles.scanedModalText}>Currently Scaned Tickets</Text>
                            <TouchableOpacity onPress={() => setShowScannedTickets(!showScannedTickets)}>
                                <Icon name='close' color={"red"} size={rfv(30)} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.scannerListContainer}>
                            <Text style={styles.titleText}>No</Text>
                            <Text style={styles.titleText}>Lottery Scane Code</Text>
                            <Text style={styles.titleText}>Action</Text>
                        </View>
                        <FlatList
                            data={scannnedBarCode}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={true}
                            style={{ paddingBottom: 20, height: '100%' }}
                            keyExtractor={(item, index) => item}
                            renderItem={(itemData) =>
                                <ScannedCodeList
                                    indexNumber={itemData.index + 1}
                                    scannnedCode={itemData.item}
                                    delete={() => deleteHandler(itemData.item)}
                                />
                            }
                        />
                    </View>
                </Modal>
                {/*////////////////////////////////////// scanned tickets modal end here ////////////////////////// */}




                {/**************************** model end  ********************************************************************/}


                {/**************************** Header Start from here ********************************************************************/}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('homeTab')}>
                        <Icon name='arrow-back' size={rfv(25)} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.endShiftText}>Confirm Multiple Packs</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.headerTextButtonContainer}>
                        <Text style={styles.modelText}>Scan each lottery packs to confirm delivery
                            and add to the inventory.</Text>
                    </View>


                    {/* <TouchableOpacity
                        onPress={conformHandler}
                        style={[styles.topNextButton,
                        { backgroundColor: '#208EFD', }]}>
                        {isloading ?
                            <ActivityIndicator size="small" color="#0000ff" paddingHorizontal={20} />
                            :
                            <Text style={styles.buttonText}>Confirm</Text>}
                        </TouchableOpacity>*/}

                    {nullSubmit ?
                        <Text style={[styles.errorText, { width: '95%', marginVertical: 20 }]}>
                            Scan Some Ticket For Confirmation
                        </Text> : <Text></Text>}


                    {/*////////////////// Scaneable Lotteries List ///////////////////////////////////////////// */}



                    {/*////////////////// Scaneable Lotteries List End ///////////////////////////////////////////// */}
                    {/*////////////////// Manual and Scanner Button ///////////////////////////////////////////// */}

                    <View style={styles.tabButtonContainer}>

                        <TouchableOpacity onPress={ManualVisibleHandler}
                            style={[styles.manualMutton,
                            {
                                backgroundColor: !scannerVisible ? '#208EFD' : "transparent", width: "50%", borderWidth: scannerVisible ? 1 : 0,
                            }]}>
                            <Text style={
                                [styles.ManualButtonText,
                                { color: scannerVisible ? '#208EFD' : 'white' }]}>Manual</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => scannerVisibleHandler()}
                            style={[styles.manualMutton,
                            { backgroundColor: scannerVisible ? '#208EFD' : "transparent", width: "50%", borderWidth: !scannerVisible ? 1 : 0, }]}>
                            <Text
                                style={[styles.ManualButtonText,
                                { color: !scannerVisible ? '#208EFD' : 'white' }]}>
                                Scanner</Text>
                        </TouchableOpacity>

                    </View>

                    {scannerVisible === true ?
                        /////////////////////////////////////// Model Scanner /////////////////////////////////////////////////
                        <View style={styles.scannerContainer}>
                            {scannnedBarCode.length > 0 ?
                                <TouchableOpacity onPress={() => setShowScannedTickets(true)} style={[styles.topNextButton, { backgroundColor: '#208EFD', marginVertical: 20 }]}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icons name='barcode-scan' size={rfv(20)} color="white" style={{ paddingHorizontal: 15 }} />
                                        <Text style={styles.buttonText}>Show Scaned Tickets</Text>
                                    </View>
                                </TouchableOpacity> : null}


                            {/*<View Style={styles.codesContainer}>
                                {scannnedBarCode.length > 0 ?
                                    <View style={styles.scannerListContainer}>
                                        <Text style={styles.titleText}>No</Text>
                                        <Text style={styles.titleText}>Lottery Scane Code</Text>
                                        <Text style={styles.titleText}>Action</Text>
                                    </View> : <Text></Text>}
                                <View style={{
                                    flex: 1,
                                    width: "100%",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: scannnedBarCode.length > 0 ? 10 : 0, paddingHorizontal: 10
                                }}>

                                    {scannnedBarCode.map((item, index, key) =>
                                        <ScannedCodeList item={item} key={[item]} index={[item]}
                                            indexNumber={index + 1}
                                            scannnedCode={item}
                                            delete={() => deleteHandler(item)}
                                        />)}
                                </View>
                                    </View>*/}
                            {!startScanning ?
                                <View style={styles.LottieViewContainer}>
                                    <TouchableOpacity onPress={() => setStartScanning(true)}>
                                        <Text style={styles.scanneText}>Please Tab To Start Scanning</Text>
                                        {Platform.OS != 'web' ?
                                            <LottieView source={require('../Animations/7242-barcode-scanner.json')}
                                                autoPlay loop
                                                style={styles.lottieStyle} /> : null}
                                    </TouchableOpacity>
                                </View> :
                                <View
                                    style={styles.cameraContainer}>
                                    {/* <RNCamera
                                        ref={ref => {
                                            camera = ref;
                                        }}
                                        defaultTouchToFocus
                                        flashMode={RNCamera.Constants.FlashMode.auto}
                                        mirrorImage={true}
                                        onBarCodeRead={(result) => onBarCodeRead(result)}
                                        onFocusChanged={() => { }}
                                        onZoomChanged={() => { }}
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
                                        containerStyle={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary, width: '99%', height: dew_Height /1.8, paddingVertical:30 }}
                                        cameraContainerStyle={{ justifyContent: 'center', width: '100%', alignItems: 'center', }}

                                    />

                                </View>
                            }
                        </View> :
                        <View style={{ paddingHorizontal: dew_Width > 700 ? rfv(14) : 11 }}>

                            {/**********************************Rich tool bar editor ***************************************/}
                            <RichEditor
                                ref={richText}
                                editorStyle={styles.editorStyle}
                                initialFocus={true}
                                disabled={disableEditor}
                                initialHeight={hp("24.1%")}
                                keyboardDisplayRequiresUserAction={true}
                                initialContentHTML={editorNumbers}
                                placeholder="Enter Your packs Here..."
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




                        </View>}

                    {/*////////////////////////////////// Closs and Next Butoons ////////////////////////////////////////////////// */}


                    <View style={styles.activateButtonContainer}>
                        <View style={styles.ACButtonContainer}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('homeTab')}
                                style={[styles.activateButton,
                                { backgroundColor: 'transparent', }]}>
                                <Text style={styles.buttonText}>Close </Text>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.ACButtonContainer}>
                            <TouchableOpacity onPress={conformHandler}
                                style={[styles.activateButton,
                                { backgroundColor: '#208EFD', }]}>
                                {isloading ?
                                    <ActivityIndicator size="small" color="#0000ff" paddingHorizontal={20} />
                                    :
                                    <Text style={styles.buttonText}>Confirm </Text>}
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

        //  paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.tertiary

    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: dew_Width < 700 ? 5 : 10,
        width: '100%'

    },
    endShiftText: {
        fontSize: rfv(18),
        color: '#98A2BF',
        fontWeight: '900',
        alignSelf: 'center',
        textAlign: 'center',
        width: '90%'
    },
    modelCloss: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10

    },
    modelTitleText: {
        fontSize: rfp(2),
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
        paddingHorizontal: wp("3%"),
        paddingBottom: 15


    },
    tabButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: dew_Width > 700 ? wp(2.5) : wp(3),
        borderBottomWidth: 2,
        borderBottomColor: colors.primary,


    },
    manualMutton: {
        alignItems: 'center',
        height: hp(6),
        textAlign: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderColor: colors.primary




    },
    ManualButtonText: {
        fontSize: rfv(10),
        color: 'gray',
        textAlign: 'center',



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
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20



    },



    headerTextButtonContainer: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 20,

    },

    /////////////////////////////////////////////////

    modelButtons: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: hp(6),
        borderRadius: 5,
    },
    topNextButton: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: "95%",
        height: hp(6),
        borderRadius: 5,
        backgroundColor: 'red',
        borderWidth: 1,
        borderColor: '#98A2BF'

    },



    input: {
        height: 150,
        fontSize: rfv(10),
        marginLeft: 20,
        backgroundColor: 'white'
    },
    editorStyle: {
        backgroundColor: 'white',
        width: "100%"



    },
    errorText: {

        color: '#974220',
        fontSize: rfv(10),

        textAlign: 'center',
        backgroundColor: '#DBBCAF',
        alignSelf: 'center',
        paddingVertical: 10,
        marginTop: 20,
        paddingHorizontal: 5,
        marginHorizontal: dew_Width < 700 ? 10 : 20,
        borderRadius: 10,


    },
    listContainer: {
        borderWidth: 1,
        borderColor: colors.primary,
        flexDirection: 'column',
        marginHorizontal: dew_Width < 700 ? 10 : 20,
        marginVertical: 15,


    },
    listItemContainer: {

        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'black',
        alignContent: "center",
        alignItems: 'center',
        paddingHorizontal: 30,




    },

    /////////////////////////////////// Scanner Styling /////////////////////////////
    scannerContainer: {
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
    },

    cameraContainer: {
        flex: 1,
        // height: "40%",
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',

    },
    preview: {
        justifyContent: 'center',
        alignItems: 'center',
        //height: dew_Width < 700 ? rfv(453) : rfv(500),
        //width: rfv(210),
        width: dew_Height /2.9,
        height: dew_Height /2.4




    },
    codesContainer: {
        width: '100%',


    },

    scannerListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'black',
        alignContent: "center",
        alignItems: 'center',

        borderWidth: 1,
        borderColor: colors.primary,
        marginHorizontal: 10




    },
    titleText: {
        alignSelf: 'center',
        color: '#98A2BF',
        fontSize: rfv(10),
        fontWeight: '800',
        textAlign: 'center',
        backgroundColor: 'black',
        paddingVertical: 20,
        marginHorizontal: 10,
        borderRadius: 2,


    },
    scanneText: {
        fontSize: rfv(10),
        color: 'red',
        alignSelf: 'center',
        textAlign: 'center',
        paddingTop: 10
    },
    LottieViewContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',




    },
    lottieStyle: {
        height: hp("22%"),
        alignSelf: 'center',
        width: wp("100%"),


    },
    /////////////////////////////////// Next and close button ///////////////////
    activateButtonContainer: {
        flex: 2,
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        //paddingHorizontal: 10,


    },

    ACButtonContainer: {
        width: "50%",
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
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



    /////////////////////////////////////// missing and scaned tickets //////////////////////////////////////////////
    ScannedModalHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 10,
        //paddingHorizontal: 10
    },
    scanedModalText: {
        color: 'white',
        textAlign: 'center',
        //width: '100%',
        fontSize: rfv(10),
        fontWeight: '700',
        alignSelf: 'center'
    },
    scanedTicketsContainer: {
        backgroundColor: colors.tertiary,
        height: '100%',
        width: '100%',
        paddingHorizontal: 10,
        marginTop: Platform.OS == "ios" ? 30 : 0,
    },
    scannerListContainer: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'black',
        alignContent: "center",
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.primary,
        //marginHorizontal: 10



    },




})


export default ConformPackScreen;
