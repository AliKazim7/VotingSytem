import React, { Component } from 'react';
import { View, Container, Text, Content, Body, Right, Left } from 'native-base';
import Navbar from '../components/Navbar';
import ButtonX from '../components/Button';
import Firebase from '../Firebase/firebase';
import CardValue from '../components/Cards'

export default class Candidates extends React.Component{

    constructor(props) {
        super(props);
        this.state= {
            address:'',
            candidateID:'',
            gender:'',
            name:'',
            result: []
        }
    }
    componentDidMount() {
        console.log("candidate section")
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
                result: array
            })  
        })
    }

    castVote = (item) =>{
        console.log("information", item)
    }

    candidate = () =>{
        console.log("candidate")
    }
    constituency = () =>{
        console.log("constituency")
    }
    render(){
        return(
            <Container>
            <Navbar title="Select Candidate" />
                <View>
                    <Left/>
                    <Body />
                    <Right>
                        <Text>UnSafe</Text>
                    </Right>
                </View>   
                <Content style={{marginTop:'20%'}}>
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

// <ButtonX title="User Dashboard" onClick={this.information} />