import { from } from "core-js/core/array";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { RFPercentage as rfp, RFValue as rfv } from "react-native-responsive-fontsize";
import colors from '../../Colors/Color';


const EndDayModelTicketsList = props => {
    return (

        <ScrollView>
            <View style={styles.ListViewContainer}>
                <View style={styles.listItemContainer}>


                    <Text style={[styles.lotteryNumbers]}>{props.slotNo}</Text>

                </View>
                <View style={styles.listItemContainer}>


                    <Text style={styles.lotteryNumbers}>{props.gameNo}</Text>

                </View>
                <View style={styles.listItemContainer}>


                    <Text style={styles.lotteryNumbers}>{props.packNo}</Text>

                </View>
                <View style={styles.listItemContainer}>


                    <Text style={styles.lotteryNumbers}>{props.startNo}</Text>

                </View>

            </View>
        </ScrollView>

    )
}


const styles = StyleSheet.create({

    ListViewContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: colors.primary,


    },
    listItemContainer: {
        flex: 4,
        flexDirection: 'column',

    },

    lotteryNumbers: {
        color: '#98A2BF',
        fontSize: rfv(10),
        
        paddingVertical: 20,
        marginHorizontal: 30,
        width: '100%',
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: colors.tertiary


    }


})

export default EndDayModelTicketsList;
