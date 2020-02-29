import React, { Component } from 'react';
import { Card, CardItem, Body, Text, Left } from 'native-base';
import ButtonX from './Button';
import { Icon } from 'react-native-vector-icons/FontAwesome';
export default class CardValue extends React.Component{
    render(){
        console.log("props value", this.props)
        return(
            <Card key={this.props.key}>
                <CardItem header >
                    <Body style={{marginLeft:'30%'}}>
                        <Text>image here</Text>
                    </Body>
                </CardItem>
                <CardItem cardBody>
                    <Body style={{marginLeft:'35%',}}>
                        <Text>{this.props.name}</Text>
                    </Body>
                </CardItem>
                <CardItem footer>
                    <ButtonX full="full" title="Vote" onClick={this.props.onClick} />
                </CardItem>
            </Card>
        )
    }
}