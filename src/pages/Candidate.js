import React, { Component } from 'react';
import { View, Container, Text, Content, Body, Right, Left, Toast, Spinner } from 'native-base';
import { Overlay } from 'react-native-elements';
import Navbar from '../components/Navbar';
import ButtonX from '../components/Button';
import Firebase from '../Firebase/firebase';
import CardValue from '../components/Cards'
import { Modal, Alert } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class Candidates extends React.Component{

    constructor(props) {
        super(props);
        this.state= {
            address:'',
            showLoader: false,
            candidateID:'',
            gender:'',
            modalVisible: false,
            name:'',
            result: []
        }
    }
    componentDidMount() {
        console.log("candidate section")
        this.setState({
            showLoader: true
        })
        var array = []
        const userData = Firebase.firestore();
        userData.collection('candidates').get().then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            for(var i = 0 ;i < data.length; i++){
                array.push({
                    address: data[i].address,
                    candidateID: data[i].candidateID,
                    gender: data[i].gender,
                    name: data[i].name
                })
            }
            this.setState({
                result: array,
                showLoader: false
            })  
        })
    }

    castVote = (item) =>{
        console.log("information", item)
        this.setState({
            modalVisible: this.state.modalVisible
        })
        // Toast.show({
        //     text:'Are you sure',
        //     buttonText:'Okay',
        //     position:'top'
        // })
        Alert.alert(
            'Cast your vote',
            'Are you sure you want to cast vote?',
            [
              {text: 'UnSafe', onPress: () => this.addVote('unsafe',item)},
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Yes', onPress: () => this.addVote('safe',item)},
            ],
            { cancelable: false }
          )
    }
    
    addVote = (value, item) =>{
        console.log("candidate", value, item.candidateID)
        var ID = item.candidateID
        const userData = Firebase.firestore();
        userData.collection('votes').where('candidateID',"==", ID).get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        })
    }
    render(){
        if(this.state.showLoader === true){
            return(
                <Spinner />
            )
        } else if(this.state.showLoader === false){
            return(
                <Container>
                <Navbar title="Select Candidate" />
                    <Overlay
                        isVisible={this.state.modalVisible}
                        windowBackgroundColor="rgba(255, 255, 255, .5)"
                        overlayBackgroundColor="red"
                        width="auto"
                        height="auto"
                        >
                        <Text>Hello from Overlay!</Text>
                    </Overlay>
                    <Content>
                        {this.state.result.map((item,index)=>
                            <Content>
                                <CardValue
                                    key={item.candidateID}
                                    name={item.name}
                                    onClick={() =>this.castVote(item)}
                                />
                            </Content>    
                        )}
                    </Content>
                </Container>
            )
        }
    }
}

// <ButtonX title="User Dashboard" onClick={this.information} />