import React, { Component } from 'react';
 
import {
  AppRegistry,
  StyleSheet,
  ToastAndroid,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';


import CameraRoll from "@react-native-community/cameraroll";
import RNFS from "react-native-fs"
import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCode from 'react-native-qrcode-svg';
import ButtonX from './src/components/Button';
import { View } from 'native-base';
 
class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
        address:'',
        showLoader: false,
        candidateID:'',
        gender:'',
        modalVisible: false,
        name:'',
        arrayValue:[],
        result: []
    }
    this.svg = null;
}
  onSuccess = (e) => {
    Linking
      .openURL(e.data)
      .catch(err => console.error('An error occured', err));
  }
 
  shareQR = () => {
    console.log("svg value", this.svg)
    this.svg.toDataURL((data) => {
      RNFS.writeFile(RNFS.CachesDirectoryPath+"/some-name.png", data, 'base64')
        .then((success) => {
          return CameraRoll.saveToCameraRoll(RNFS.CachesDirectoryPath+"/some-name.png", 'photo')
        })
        .then((response) => {
          console.log("Response", response)
          // this.setState({ busy: false, imageSaved: true  })
          // ToastAndroid.show('Saved to gallery !!', ToastAndroid.SHORT)
        })
    })
  }
  render() {
    return (
      <View>
      <QRCode
        value="gg motherfucker"
        getRef={(c) => (this.svg = c)}
      />
      <ButtonX title="Save to gallery" onClick={this.shareQR} />
      </View>
    );
  }
}

export default App

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});