import React, { Component } from 'react';
import { View, Container, Text } from 'native-base';


export default class Login extends React.Component{
    componentDidMount() {
        console.log("here login")
    }
    render(){
        return(
            <Container>
            <View>
                <Text>dads</Text>
            </View>
            </Container>
        )
    }
}