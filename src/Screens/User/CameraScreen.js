'use strict';
import React, {useRef,useState, Component, useEffect } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  
  FlatList
} from 'react-native';
import {cameraRef, RNCamera, Camera } from 'react-native-camera';
import FramesData from "../../Data/FramesData";
import ImageFrameComponent from '../../Components/DashboardComponents/ImageFrameComponent'
import  Icon  from 'react-native-vector-icons/FontAwesome';
import  Ionicon from 'react-native-vector-icons/MaterialCommunityIcons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { captureScreen } from "react-native-view-shot";
import { captureRef } from "react-native-view-shot"
import ViewShot from 'react-native-view-shot';

const dew_Height = Dimensions.get('window').height
const dew_Width = Dimensions.get('window').width

const CameraScreen =()=>{

  const [selectedFrame, setSelectedFrame]=useState(require('../../Frames/frame1.png'));
  const [winnerImage, setWinnerImage]=useState('');
  console.log(selectedFrame)
  const cameraRef = useRef();


  function  takePicture() {
    let camera=cameraRef
    const options = {
      width:600,
      height: 800,
      quality: 0.5, 
       base64: true,
     
     
  
       pauseAfterCapture:true
    };
   
    const data =   cameraRef.current.takePictureAsync(options)
    .then((data) =>setWinnerImage('data:image/jpeg;base64,' + data.base64),
    )
      
      .catch(err => console.error(err));
  }


  const cameraBackHandler=()=>{
    setWinnerImage('');
    if (cameraRef.current) {
      cameraRef.current.resumePreview();
      
    }
    else{
      return;
    }         
    
  }

//////////////////////////////////////////////// 


const viewShot = useRef();



const onCapture=() => {
    viewShot.current.capture().then(uri => {
      console.log('do something with ', uri);
    })}

/*const viewShortHandler = () => {
  viewShot.current.capture().then((uri) => {
    RNFS.readFile(uri, 'base64').then((res) => {
      let urlString = 'data:image/jpeg;base64,' + res;
      let options = {
        title: 'Share Title',
        message: 'Share Message',
        url: urlString,
        type: 'image/jpeg',
      };
      Share.open(options)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          err && console.log(err);
        });
    });
  });
 }*/




  
    return (
      <View style={styles.container}>
         {winnerImage?
        <View  style={styles.cameraContainer}>
           <Image
        source={{ uri: winnerImage }}
        style={styles.imageStyle}

      />

     
          
        </View>:
       
        <View style={styles.cameraContainer}>
         {!winnerImage?
        <RNCamera
          ref = {cameraRef} 
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
         
          onDoubleTap={()=>takePicture()}
         // aspect={RNCamera.constants.Aspect.fill}
          >
             <Image style={styles.borderImage}  source={selectedFrame}/>
        </RNCamera>: 

      <ViewShot ref={viewShot} options={{format: 'jpg',base64: true, quality: 0.9}}>
          <View>
        <Image
        source={{ uri: winnerImage}}
        tyle={styles.borderImage}

      /></View>
      </ViewShot>}
     
        </View>}


         
        <View style={styles.frameCaptureContainer}>
              
       
             
              {/*/////////////////////////////// Frame List /////////////////////////// */}
              <FlatList
              data={FramesData}
              showsHorizontalScrollIndicator={true}
              style={{ marginHorizontal: 0 }}
              horizontal={true}
              //numColumns={100}

              keyExtractor={(item, index) => item.id}
              
              renderItem={(itemData) =>
                <ImageFrameComponent
                 
                  frameUrl={itemData.item.frameUrl}
                  onPress={() => setSelectedFrame(itemData.item.frameUrl)}

                />
              }
                />
        {/*/////////////////////////////// Frame List /////////////////////////// */}
        <View style={styles.captureButtonContainer}>
       

            <TouchableOpacity onPress={cameraBackHandler} style={styles.captureButton}>
             <Ionicon name='camera-retake' color="silver" size={50}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>takePicture()} style={styles.captureButton}>
             <Icon name='camera' color="silver" size={40}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCapture} style={[styles.captureButton]}>
            <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
            </View>
            </View>
      </View>
    );
 }
 /*
 import React, {useRef, useEffect} from "react";
import {View, Text, Button, StyleSheet} from 'react-native'
import ViewShot from "react-native-view-shot";


export default function CameraScreen() {
  const viewShot = useRef();

const onCapture=() => {
    viewShot.current.capture().then(uri => {
      console.log('do something with ', uri);
    })}

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <ViewShot ref={viewShot} options={{format: 'jpg',base64: true, quality: 0.9}}>
        <View>
          <Text>Hello World</Text>
        </View>
      </ViewShot>

      <View style={styles.footer}>
        <Button title="print" onPress={onCapture} />
      </View>
    </View>
  );
}

const styles=StyleSheet.create({

})
 */
  



const styles = StyleSheet.create({
  container: {
    flex: 6,
    flexDirection: 'column',
    backgroundColor:'black'
  },
cameraContainer:{
  flex:5,
  width:'100%', 
  height:'100%',
  justifyContent:'center', 
  alignItems:'center', 
  alignSelf:'center'
},
  camera: {
    
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
     width: 300,
     height: 400,

     
   
  },
  borderImage:{
      
     
    width: 300,
    height: 400,

},
  frameCaptureContainer:{ 
    flex: 2, 
    flexDirection: "column", 
    justifyContent: 'center'
 },
 captureButtonContainer:{
   width:'100%',
   flexDirection:'row',
   justifyContent:'center',
   alignContent:'center',
   alignItems:'center',
   alignSelf:'center'

 },
 
  captureButton: {
  
    paddingVertical:20,
    paddingHorizontal:10,
    alignSelf: 'center',
  
   
  },
  imageStyle: {
    width: 300,
    height: 400,

    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center'


  },
  nextButtonText:{
    color:"black", 
    fontSize: 20, 
    fontWeight:'bold',  
    backgroundColor:'silver',
    paddingVertical:7,
    paddingHorizontal:10,
    borderRadius:10,
   
  }
});

export default CameraScreen;