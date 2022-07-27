import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { RFPercentage as rfp, RFValue as rfv } from "react-native-responsive-fontsize";
import PriceData from '../../Data/TicketPrice';
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import Pusher from 'pusher-js';


const dew_Height = Dimensions.get('window').height
const dew_Width = Dimensions.get('window').width

const UpdatedSlotComponent = () => {


    /////////////// User credentials from store //////////////////////////
    const userCredentials = useSelector(state => state.userCredentials.userdata);


    //////////////// Component States //////////////////////////////////////
    const [updatedSlots, setUpdatedSlots] = useState('')



    ///////////////////////////////////// Pusher //////////////////////////////////////////////////
    useEffect(() => {
        let updatedslotsArray = updatedSlots

        let pusher = new Pusher(userCredentials['pusher_key'], {
            cluster: userCredentials['pusher_cluster'],
            forceTLS: false,

        });

        let channel = pusher.subscribe(userCredentials['unique_channel']);

        channel.bind('scannerMsgDisplayScreen', function (data) {


            let updatedNewArray = [data.message.console, ...updatedslotsArray];
            setUpdatedSlots(updatedNewArray)


        });
        return () => channel.unbind('scannerMsgDisplayScreen');
    });


    /////////////////// Delet Recent Updated Slots Handler////////////////////////
    const deleteHandler = (value) => {
        const newArray = updatedSlots.filter((item) => item.text !== value)
        setUpdatedSlots(newArray)


    };
    ///////////////////////////////////////////////////////////////////////////////


    return (

        <View style={styles.sectionTitleContainer}>
            {updatedSlots.length > 0 ?
                <View style={{ flexDirection: 'row', marginHorizontal: dew_Width > 700 ? '1%' : '3%' }}>

                    <Image source={require('../../Images/dashboardIcons/recent.png')} style={styles.imageStyle} />
                    <Text style={styles.titleText}>Recent Updated Slot</Text>
                </View> : <Text></Text>}

            <FlatList
                data={updatedSlots}      //{updatedSlots} {PriceData} 

                showsHorizontalScrollIndicator={false}
                //  keyExtractor={(item, index) => item.slot_number}
                //22010040617025

                horizontal={true}
                renderItem={(itemData) =>

                    <View style={[styles.container, { backgroundColor: itemData.item.status === 1 ? '#35B491' : itemData.item.status === 0 ? "red" : '#fdc724', }]}>

                        <View style={styles.contentContainer} >
                            {itemData.item.status === 0 ?
                                <Text style={styles.slotText}>Error</Text>
                                :
                                <Text style={styles.slotText}>{itemData.item.slot_number}</Text>}

                            <Text style={styles.updatedText}> {itemData.item.text}</Text>
                        </View>
                        <View style={styles.removeContainer}>
                            <TouchableOpacity onPress={() => deleteHandler(value = itemData.item.text)} style={styles.crossButton}>
                                <Icon name="close" size={rfv(20)} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>

                }

            />
        </View>


    )

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row',
        //marginHorizontal: dew_Width > 700 ? 10 : 3,
        marginVertical: 10,
        paddingVertical:5,
        justifyContent: 'space-between',
        borderRadius: 5,
        paddingHorizontal: 5,
        width: dew_Width > 700 ? "70%" : "100%",
        marginLeft: 10



    },
    slotText: {
        fontSize: rfv(10),
        fontWeight: '900',
        color: 'white',

    },
    updatedText: {
        fontSize: rfv(10),
        fontWeight: '400',
        marginRight: 20,
        color: 'white',

    },
    removeContainer: {
       



    },
    contentContainer: {
        justifyContent: 'center'

    },
    imageStyle: {
        width: rfp(3.5),
        height: rfp(3.5)

    },
    titleText: {
        fontSize: dew_Width > 500 ? rfp(2) : rfp(1.8),
        color: '#98A2BF',
        marginLeft: 5,


    },
    crossButton: {
    // paddingRight: 3,

   

    }

})

export default UpdatedSlotComponent;
