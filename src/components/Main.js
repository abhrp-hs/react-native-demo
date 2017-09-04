import React, { Component } from 'react';
import Toast from "react-native-simple-toast";
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
import { AsyncStorage } from "react-native";

import HSLogin from "../component/HSLogin";
import EnterBatchId from '../component/EnterBatchId';
import SkuSearch from '../component/SkuSearch';
import SkuDetail from '../component/SkuDetail';
import Summary from '../component/Summary';

export default class Main extends Component {

	constructor(props) {
		super(props)
		this.state = {
				loggedIn: true
		};
	}

	componentWillMount() {
		console.log(this.state.loggedIn);
		this.getStoragedData();
	}

	getStoragedData = async () => {
		try {
				const token = await AsyncStorage.getItem('@AuthToken:key');
				if (token.trim() != "" || token.trim() != '' || token.trim() != null) {		
					this.setState({
						loggedIn: true
					});
				} else {
					this.setState({
						loggedIn: false
					})
				}
		} catch(error) {
			console.log(error);
		}
	}

  render() {
	  return (
	    <Router>
	      <Scene key="root">					
	        <Scene key="loginScreen"
	          component={HSLogin}	        	
	          hideNavBar={true}
	          initial={!this.state.loggedIn}
	        />
					<Scene key = "enterBatchId"
						component = {EnterBatchId}
						animation = 'fade'
						hideNavBar = {true}
						initial = {this.state.loggedIn}
					/>				
					<Scene key = "skuSearch"
						component = {SkuSearch}
						animation = 'fade'
						hideNavBar = {true}
					/>
					<Scene key = "skuDetail"
						component = {SkuDetail}
						animation = 'fade'
						hideNavBar = {true}
					/>
					<Scene key = "summary"
						component = {Summary}
						animation = 'fade'
						hideNavBar = {true}				
					/>
	      </Scene>
	    </Router>
	  );
	}
}

module.export = Main;