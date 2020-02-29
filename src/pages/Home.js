import React, { Component } from 'react';
import { View, Container, Text } from 'native-base';
import Navbar from '../components/Navbar';


export default class Login extends React.Component{
    componentDidMount() {
        console.log("here login")
    }
    render(){
        return(
            <Container>
            <Navbar title="Voting System" />
                <View>
                    <Text>dasdsa</Text>
                </View>
            </Container>
        )
    }
}