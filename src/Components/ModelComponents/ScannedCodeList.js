import { from } from "core-js/core/array";
import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { RFPercentage as rfp, RFValue as rfv } from "react-native-responsive-fontsize";
import colors from '../../Colors/Color';
import { Icon } from 'react-native-elements';


const ScannedCodeList = props => {
    return (



        <View style={[styles.listItemContainer]}>
            <View >

                <Text style={styles.lotteryNumbers}>{props.indexNumber}</Text>
            </View>
            <View>

                <Text style={styles.lotteryNumbers}>{props.scannnedCode}</Text>
            </View>
            <View>
                <TouchableOpacity onPress={props.delete}>

                    <Icon name="close" size={rfv(20)} color="red" />
                </TouchableOpacity>
            </View>


        </View>




    )
}


const styles = StyleSheet.create({

    ListViewContainer: {
        //flex: 1,
        flexDirection: 'column',
        borderBottomWidth: 1,
        height: '100%',
        width: '100%',
        marginVertical: 30,
        paddingVertical: 30






    },
    listItemContainer: {
        flex: 3,
        height: '100%',
        width: '100%',
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: colors.primary



    },

    lotteryNumbers: {
        width: '100%',
        color: '#98A2BF',
        fontSize: rfv(10),


    }


})

export default ScannedCodeList;
