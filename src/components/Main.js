import React, { Component } from 'react';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';

import HSLogin from "../component/HSLogin";
import EnterBatchId from '../component/EnterBatchId';
import SkuSearch from '../component/SkuSearch';
import SkuDetail from '../component/SkuDetail';
import Summary from '../component/Summary';

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
					<Scene key = "enterBatchId"
						component = {EnterBatchId}
						animation = 'fade'
						hideNavBar = {true}
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