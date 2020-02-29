import React, { Component } from 'react';
import { Button } from 'react-native-elements'
export default class ButtonX extends React.Component{
    render(){
        console.log("props value", this.props)
        return(
            <Button
                title={this.props.title}
                type="solid"
                buttonStyle={{
                    backgroundColor:'green',
                    width:'60%',
                    marginLeft:'20%'
                }}
                onPress={this.props.onClick}
            />
        )
    }
}