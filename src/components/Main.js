import React, { Component } from 'react';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';

//import LoginScreen from './LoginScreen';
import HSLogin from "../component/HSLogin";
import SecondScreen from './SecondScreen';
import GetStarted from '../component/GetStarted';

export default class Main extends Component {
  render() {
	  return (
	    <Router>
	      <Scene key="root">					
	        <Scene key="loginScreen"
	          component={HSLogin}	        	
	          hideNavBar={true}
	          initial={true}
	        />
					<Scene key = "getStarted"
						component = {GetStarted}
						animation = 'fade'
						hideNavBar = {true}
					/>
	        <Scene key="secondScreen"
	          component={SecondScreen}
	          animation='fade'
	          hideNavBar={true}
	        />					
	      </Scene>
	    </Router>
	  );
	}
}

module.export = Main;