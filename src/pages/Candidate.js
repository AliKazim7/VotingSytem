import React, { Component } from 'react';
import { View, Container, Text, Content, Body, Right, Left, Toast, Spinner, Footer } from 'native-base';
import { Overlay } from 'react-native-elements';
import Navbar from '../components/Navbar';
import ButtonX from '../components/Button';
import Firebase from '../Firebase/firebase';
import CardValue from '../components/Cards'
import { Modal, Alert } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';

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
            arrayValue:[],
            result: []
        }
    }
    componentDidMount() {
        console.log("candidate section")
        console.disableYellowBox = true;
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
            { cancelable: true }
          )
    }
    
    addVote = (value, item) =>{
        console.log("candidate", value, item.candidateID)
        var ID = item.candidateID
        this.setState({
            showLoader: true
        })
        var array = []
        const userData = Firebase.firestore();
        userData.collection('votes').where('candidateID',"==", ID).get()
        .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());        // doc.data() is never undefined for query doc snapshots
            console.log("data value", data)
            array.push({
                voteID: data[0].voteID,
                count: data[0].count,
                name: data[0].candidateName,
                candidateID: data[0].candidateID
            })
            console.log("array value", array)
            let voteID = data[0].voteID
            console.log("data[0", data[0].count + 1)
            userData.collection("votes").doc(voteID).update({
                count: data[0].count + 1,
                safe: value
            }).then(response =>{
                this.setState({
                    showLoader: false,
                    arrayValue: array,
                    modalVisible: true
                })
            })
        })
    }

    closeModal = () =>{
        console.log("close modal")
        this.setState({
            modalVisible: false
        })
        Actions.home()
    }

    render(){
        console.log("close", this.state.arrayValue)
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
                        windowBackgroundColor="rgba(0,0,0,.5)"
                        overlayBackgroundColor="white"
                        width="auto"
                        height="30%"
                        >
                        <Content>
                            <Text style={{marginLeft:'30%'}}>{this.state.arrayValue.length > 0 ?  this.state.arrayValue[0].name : null}</Text>
                        </Content>
                        <ButtonX title="Close" onClick={() => this.closeModal() } />
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