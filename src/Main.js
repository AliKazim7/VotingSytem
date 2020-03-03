import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux'
import { BackHandler } from 'react-native';
import { Root } from 'native-base';
import Login from './pages/Login'
import Home from './pages/Home'
import Candidate from './pages/Candidate'

export default class Main extends React.Component{
    // componentWillMount = () => {
    //     BackHandler.addEventListener('hardwareBackPress', () => Actions.pop());
    //     console.disableYellowBox = true;
    //   };
componentDidMount() {
    console.log("here")
}
    render(){
        return(
            <Root>
                <Router>              
                    <Scene key="root">
                        <Scene key="login" component={Login} hideNavBar />
                        <Scene key="candidates" component={Candidate} hideNavBar />
                        <Scene initial key="home" component={Home} hideNavBar />
                    </Scene>
                </Router>
            </Root>
        )
    }
}