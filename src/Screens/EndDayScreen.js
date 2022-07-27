import
React,
{
    useState
} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Keyboard,
    Dimensions,
    Modal,
    TouchableWithoutFeedback,
    Alert,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    FlatList,
    Platform
} from 'react-native';
import {
    RFPercentage as rfp,
    RFValue as rfv
} from "react-native-responsive-fontsize";
import colors from '../Colors/Color';
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import EndDayModelTicketsList from '../Components/ModelComponents/EndDayModelTicketsList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import { RNCamera } from 'react-native-camera';
import ScannedCodeList from '../Components/ModelComponents/ScannedCodeList';
import SweetAlert from 'react-native-sweet-alert';
import { useFocusEffect } from '@react-navigation/native';
import CustomAlert from '../Components/ModelComponents/CustomAlert';
import EndDayFinalModal from '../Components/ModelComponents/EndDayFinalModal';
import PleaseWaitModal from '../Components/ModelComponents/PleaseWaitModal';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCodeScanner from 'react-native-qrcode-scanner';



const dew_Height = Dimensions.get('window').height
const dew_Width = Dimensions.get('window').width


const EndDayScreen = props => {
    let dispatch = useDispatch();
    const richText = React.useRef();
    ////////////////// User Credentials from redux ////////////////////////
    const userCredentials = useSelector(state => state.userCredentials.userdata);
    /////////////////// Model States////////////////////////////////////
    const [editorNumbers, setEditorNumbers] = useState('');
    const [nullSubmit, setNullSubmit] = useState(false);
    const [missingTicketsData, setMissingTicketsData] = useState('');
    const [scannerVisible, setScannerVisible] = useState(false)
    const [scannnedBarCode, setScannedBarCode] = useState([]);
    const [startScanning, setStartScanning] = useState(false);
    const [disableEditor, setDisableleEditor] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [isloading, setIsLoading] = useState(false);
    const [responseData, setResponseData] = useState('');
    const [endDayFinalModal, setEndDayFinalModal] = useState(false);
    const [waitModalVisible, setWaitModalVisible] = useState(false);


    const [showScannedTickets, setShowScannedTickets] = useState(false);
    const [showMissingTickets, setShowMissingTickets] = useState(false);
    ///////////////// Input Handler ///////////////////////////////////////
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

    }, 12000);
    /////////////// Validation Api call ////////////////////////
    const NextHandler = async () => {
        setModalVisible(false);
        setIsLoading(true);


        if (!editorNumbers) {
            setNullSubmit(true);
            setIsLoading(false);
            return;

        } else {
            setStartScanning(false);

            try {
                let finalScaneCodes = scannnedBarCode.join(",")
                url = userCredentials['end_day_validation_url']

                scan_codes = editorNumbers === 1 ? finalScaneCodes : editorNumbers,
                    accessToken = userCredentials['accessToken']
                setMissingTicketsData('')
                let response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({
                        ed_scan_code: scan_codes
                    }),
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': 'Bearer ' + accessToken
                    },
                }).then(response => response.json())

                setMissingTicketsData(response.missing_html)
                setResponseData(response);
                setIsLoading(false);

                if (response.success === 1 || response.success === 0) {
                    setModalVisible(true);
                    setIsLoading(false)

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




    //////////////////////////Verified End Day Api/////////////////////////

    const endDayaHandler = async () => {
        setModalVisible(false);
        setWaitModalVisible(true);
        setResponseData('');



        if (!editorNumbers) {

            return;

        } else {
            try {
                let finalScaneCodes = scannnedBarCode.join(",")
                url = userCredentials['end_day_url']

                scan_codes = editorNumbers === 1 ? finalScaneCodes : editorNumbers,

                    accessToken = userCredentials['accessToken']
                setMissingTicketsData('')
                let response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({
                        ed_scan_code: scan_codes
                    }),
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': 'Bearer ' + accessToken
                    },
                }).then(response => response.json());


                if (response.success === 1 || response.success === 0) {
                    setResponseData(response);
                    setWaitModalVisible(false);
                    setEndDayFinalModal(true);
                }
                else {
                    Alert.alert(
                        response.msg,
                    )
                }

            } catch (err) {
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
        setMissingTicketsData('');
        setStartScanning(false);
        setDisableleEditor(false);

    }
    function scannerVisibleHandler() {
        setDisableleEditor(true);


        /////////////// Resolve asyncronus action warning //////////////////////////////////////////////////////////
        setTimeout(function () {
            setScannerVisible(true);
            setEditorNumbers('');
            setMissingTicketsData('');

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

        return;


    }



    ///////////////////////////////////////// Scanned Tickets Delete Handler //////////////////////////////////////////////

    function deleteHandler(item) {
        const result = scannnedBarCode.filter((deleteableCode) => deleteableCode != item);
        setScannedBarCode(result)
    }

    ////////////////////////////////////////// Scanner related functions end here /////////////////////////////////////////



    ///////////////////// ON Tab Press set component to initial state ////////////////////////////////////////////////
    useFocusEffect(
        React.useCallback(() => {
            setScannerVisible(false)
            setScannedBarCode([]);
            setEditorNumbers('');
            setMissingTicketsData('');
            setStartScanning(false);
            setDisableleEditor(false);



        }, [])
    );




    //////////////////////////////////////  Return   /////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////// Modal close Handler ////////////////////////////////////////
    function modalClossHandler() {
        setResponseData('');
        setModalVisible(false);
        setEndDayFinalModal(false);

    }
    ////////////////////////////////// Ok to closs end day successfully //////////////////////
    function endDayOkHandler() {
        setModalVisible(false);
        setScannedBarCode([]);
        setEditorNumbers('');
        setMissingTicketsData('');
        setStartScanning(false);
        setDisableleEditor(false);
        setResponseData('');
        setEndDayFinalModal(false);
        props.navigation.navigate('Home');


    }
    return (

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

            <View style={[styles.container, { opacity: modalVisible || waitModalVisible ? 0.5 : 1 }]}>
                {/*////////////////////////////////////// Alert Modal   //////////////////////////////////////////// */}

                <Modal
                    animationType='fade'
                    transparent={true}

                    backgroundColor={colors.tertiary}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);

                    }}>



                    <CustomAlert
                        success={responseData.msg}
                        buttonTitle="End Day"
                        onPress={() => endDayaHandler()}
                        onCancelPress={modalClossHandler}
                        successStatus={responseData.success}
                    />
                </Modal>

                <Modal
                    animationType='fade'
                    transparent={true}

                    backgroundColor={colors.tertiary}
                    visible={endDayFinalModal}
                    onRequestClose={() => {
                        setEndDayFinalModal(!endDayFinalModal);


                    }}>
                    <EndDayFinalModal

                        success={responseData.msg}
                        onPress={() => endDayOkHandler()}
                        onCancelPress={modalClossHandler}
                        onErrorPress={() => setEndDayFinalModal(false)}
                        successStatus={responseData.success}
                    />
                </Modal>

                <Modal
                    animationType='fade'
                    transparent={true}


                    visible={waitModalVisible}
                    onRequestClose={() => {
                        setEndDayFinalModal(!waitModalVisible);


                    }}>
                    <PleaseWaitModal />
                </Modal>

                {/*////////////////////////////////////// Alert Modal end   //////////////////////////////////////////// */}
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

                {/*////////////////////////////////////// Missing Tickets Modal          //////////////////////*/}
                <Modal
                    animationType='fade'
                    transparent={true}


                    visible={showMissingTickets}
                    onRequestClose={() => {
                        setShowMissingTickets(!showMissingTickets);


                    }}>
                    <View style={styles.scanedTicketsContainer}>

                        <View style={styles.ScannedModalHeaderContainer}>

                            <Text style={styles.scanedModalText}>Missing Tickets</Text>
                            <TouchableOpacity onPress={() => setShowMissingTickets(!showMissingTickets)}>

                                <Icon name='close' color={"red"} size={rfv(30)} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.listItemContainer}>

                            <Text style={styles.titleText}>Slot#</Text>
                            <Text style={styles.titleText}>Game#</Text>
                            <Text style={styles.titleText}>Pack#</Text>
                            <Text style={styles.titleText}>Start#</Text>

                        </View>

                        <FlatList
                            data={missingTicketsData}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={true}
                            style={{ paddingBottom: 20, height: '100%' }}

                            keyExtractor={(item, index) => index}
                            removeClippedSubviews={true}
                            initialNumToRender={10}
                            updateCellsBatchingPeriod={100}
                            maxToRenderPerBatch={10}
                            windowSize={10}
                            renderItem={(itemData) =>
                                <EndDayModelTicketsList
                                    key={itemData.index + 1}
                                    slotNo={itemData.item.slot_no}
                                    gameNo={itemData.item.game_no}
                                    packNo={itemData.item.pack_no}
                                    startNo={itemData.item.start_no}

                                />
                            }

                        />


                    </View>

                </Modal>

                {/*////////////////////////////////////// Missing Tickets Modal end here //////////////////////*/}

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
                        <Icon name='arrow-back' size={rfv(25)} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.endShiftText}>End Day</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.headerTextButtonContainer}>
                        <Text style={styles.modelText}>Please Scane All Tickets.Press Next When Finished</Text>
                    </View>




                    {nullSubmit ?
                        <Text style={[styles.errorText, { width: '95%', marginBottom:20 }]}>Scane Some tickets For End Day</Text> : <Text></Text>}


                    {/*////////////////// Scaneable Lotteries List ///////////////////////////////////////////// */}
                    {missingTicketsData ?
                        <View style={styles.missingMsgBtnContainer}>
                            <Text style={styles.errorText}>The Following Slot Have Not Been Scanned,
                                Please Mark Them Sold Out Or Enter Valid End Number Or Scan Missing Ticket.</Text>


                            <TouchableOpacity onPress={() => setShowMissingTickets(true)} style={[styles.missingTicketButton]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.buttonText}>Show Missing Tickets</Text>
                                </View>
                            </TouchableOpacity>
                        </View> : null}



                    {/*////////////////// Scaneable Lotteries List End ///////////////////////////////////////////// */}
                    {/*////////////////// Manual and Scanner Button ///////////////////////////////////////////// */}

                    <View style={styles.tabButtonContainer}>
                        <TouchableOpacity onPress={ManualVisibleHandler} style={[styles.manualMutton,
                        { backgroundColor: !scannerVisible ? '#208EFD' : "transparent", width: "50%", borderWidth: scannerVisible ? 1 : 0, }]}>
                            <Text style={[styles.ManualButtonText, { color: scannerVisible ? '#208EFD' : 'white', }]}>Manual</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={scannerVisibleHandler} style={[styles.manualMutton,
                        { backgroundColor: scannerVisible ? '#208EFD' : "transparent", width: "50%", borderWidth: !scannerVisible ? 1 : 0, }]}>
                            <Text style={[styles.ManualButtonText, { color: !scannerVisible ? '#208EFD' : 'white', }]}>Scanner</Text>
                        </TouchableOpacity>
                    </View>

                    {scannerVisible ?
                        /////////////////////////////////////// Model Scanner /////////////////////////////////////////////////
                        <View style={styles.scannerContainer}>
                            {scannnedBarCode.length > 0 ?
                                <TouchableOpacity onPress={() => setShowScannedTickets(true)} style={[styles.topNextButton, { backgroundColor: '#208EFD', marginVertical: 20 }]}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icons name='barcode-scan' size={rfv(20)} color="white" style={{ paddingHorizontal: 15 }} />
                                        <Text style={styles.buttonText}>Show Scaned Tickets</Text>
                                    </View>
                                </TouchableOpacity> : null}

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
                                <View style={styles.cameraContainer}>
                                    {/*<RNCamera
                                        ref={ref => {
                                            camera = ref;
                                        }}
                                        defaultTouchToFocus
                                        flashMode={RNCamera.Constants.FlashMode.auto}
                                        mirrorImage={true}
                                        onBarCodeRead={(result) => onBarCodeRead(result)}
                                        onFocusChanged={() => { }}
                                        onZoomChanged={() => { }}

                                        //permissionDialogMessage={'We need your permission to use your camera phone'}
                                        style={styles.preview}
                                    //type={RNCamera.Constants.Type.back}
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
                                </View>}


                        </View> :

                        <View style={{ width: '100%', paddingHorizontal: dew_Width > 700 ? rfv(14) : 11 }}>

                            <RichEditor
                                ref={richText}
                                keyboardDisplayRequiresUserAction={true}
                                editorStyle={styles.editorStyle}
                                initialFocus={true}
                                initialHeight={hp("24.1%")}
                                //initialContentHTML={editorNumbers}
                                enterKeyHint="done"
                                disabled={disableEditor}





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



                        </View>}

                    {/*////////////////////////////////// Closs and Next Butoons ////////////////////////////////////////////////// */}


                    <TouchableOpacity 
                    onPress={NextHandler} 
                    style={[styles.topNextButton, { backgroundColor: '#208EFD', marginVertical: 40, opacity: isloading?0.4:1 }]}
                    disabled={isloading?true:false}>
                        {isloading ?

                            <View style={styles.loadingLottieViewContainer}>
                                {Platform.OS != 'web' ?
                                    <LottieView source={require('../Animations/85032-loader-mat.json')}
                                        autoPlay loop
                                        style={styles.loadingLottieStyle} /> : null}

                            </View>
                            :
                            <Text style={styles.buttonText}>Next</Text>}
                    </TouchableOpacity>

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
       // paddingHorizontal: 5,
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
        fontSize: rfv(20),
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
        fontSize: rfv(10),
        color: '#98A2BF',
        marginTop: 10,
        paddingHorizontal: 10,
        marginLeft: 10,

    },
    modelText: {
        fontSize: rfv(10),
        width: "100%",
        color: '#98A2BF',
        paddingHorizontal: wp("3%"),
        paddingBottom: 19


    },
    tabButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: dew_Width > 700 ? wp(2.5) : wp(3),
        borderBottomWidth: 1,
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

    buttonText: {
        color: 'white',
        fontSize: rfv(10),
        fontWeight: '700'
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
        borderWidth: 1,
        borderColor: '#98A2BF'



    },

    missingTicketButton: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: "95%",
        height: hp(6),
        borderRadius: 5,
        backgroundColor: 'red',
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'red',
        marginVertical: 20,
        width: "70%",
        padding: 0
    },


    input: {

        fontSize: rfv(10),
        marginLeft: 20,
        backgroundColor: 'white'
    },
    editorStyle: {
        backgroundColor: 'white',

    },
    missingMsgBtnContainer: {
        backgroundColor: '#DBBCAF',
        paddingHorizontal: 5,
        marginHorizontal: dew_Width < 700 ? 10 : 20,
        borderRadius: 10,
        marginBottom: 15

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
        justifyContent: 'space-between',
        backgroundColor: 'black',
        alignContent: "center",
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.primary,
        paddingHorizontal: 15,




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
    codesContainer: {
        width: '100%',


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

    },
    LottieViewContainer: {
        width: '100%',
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',




    },
    lottieStyle: {
        height: hp("22%"),
        alignSelf: 'center',
        width: wp("100%"),


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
    }




})

export default EndDayScreen;
