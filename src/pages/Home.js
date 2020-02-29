import React, { Component } from 'react';
import { View, Container, Text, Content, Body } from 'native-base';
import Navbar from '../components/Navbar';
import ButtonX from '../components/Button';
import { Actions } from 'react-native-router-flux';


export default class Home extends React.Component{
    componentDidMount() {
        console.log("here login")
    }

    information = () =>{
        console.log("information")
    }

    candidate = () =>{
        console.log("candidate")
        Actions.candidates()
    }
    constituency = () =>{
        console.log("constituency")
    }
    render(){
        return(
            <Container>
            <Navbar title="User Dashboard" />
                <Content style={{marginTop:'20%'}}>
                    
                        <ButtonX title="User Dashboard" onClick={this.information} />
                    
                </Content>
                <Content>
                    
                        <ButtonX title="Constituency" onClick={this.constituency} />
                    
                </Content>
                <Content>
                    
                        <ButtonX title="Candidate" onClick={this.candidate} />
                    
                </Content>
            </Container>
        )
    }
}