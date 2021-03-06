import React, { Component, PropTypes } from "react";
import NavBar, { NavTitle } from "react-native-nav";
import Toast from "react-native-simple-toast";
import { Actions, ActionConst } from "react-native-router-flux";
import { StyleSheet, TextInput, View, TouchableHighlight, Text, Alert, AsyncStorage, Keyboard } from "react-native";

export default class HSLogin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userEmail: '',
            password: ''
        };
    }

    getStorageData = async () => {
        try {
            const token = await AsyncStorage.getItem('@AuthToken:key');
            const email = await AsyncStorage.getItem('@Email:key');
            //Toast.show(token);
            //Toast.show(email);
        } catch (error) {
            Alert.alert("Error in Retrieving Data");
        }
    }

    onLoginPress = () => {        
        const {userEmail} = this.state;
        const {password} = this.state;
        if (userEmail == '' || password == '') {
            Alert.alert("Please Enter All Field")
        } else if (!this.validateEmail(userEmail)) {
            Alert.alert("Please Enter Correct Email");
        } else {
            Keyboard.dismiss();
            debugLoginUrl = 'http://rubydev.hopscotch.in/ops_api/login';
            releaseLoginUrl = 'https://internals.hopscotch.in/ops_api/login';
            fetch(debugLoginUrl, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                email: userEmail,
                password: password
              })
            })
              .then(response => response.json())
              .then(async responseData => {
                try {
                  Toast.show("Logged in successfully with " + responseData.email, Toast.LONG);
                  await AsyncStorage.setItem("@AuthToken:key", responseData.auth_token);
                  await AsyncStorage.setItem("@Email:key", responseData.email);
                  //Actions.enterBatchId({text : responseData.auth_token});
                  Actions.enterBatchId();
                } catch (error) {
                  Toast.show("Error While Saving Token", Toast.LONG);
                }
              })
              .catch(error => {
                Toast.show("Hello Request Failed", Toast.SHORT);
              })
              .done();
        }
    }

    validateEmail = (email) => {
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
    };

    render() {
        return (
            <View style = {styles.loginPage}>
                <NavBar>
                    <NavTitle>
                        {"Hopscotch QC"}
                    </NavTitle>
                </NavBar>
                <View style = {styles.inputEmail}>
                    <TextInput style = {{marginLeft: 16}}                    
                        placeholder = "Enter Email"
                        defaultValue = "anilc@hopscotch.in"
                        underlineColorAndroid = "transparent"
                        onChangeText = {userEmail => this.setState({userEmail})}
                    />
                </View>
                <View style = {styles.inputPassword}>
                    <TextInput
                        style = {{marginLeft: 16}}
                        placeholder = "Password"
                        secureTextEntry = {true}       
                        defaultValue = "anil11"   
                        underlineColorAndroid = "transparent"      
                        onChangeText = {password => this.setState({password})}
                    />
                </View>
                <TouchableHighlight 
                    style = {styles.loginButton}
                    underlayColor = "#007ac1"
                    onPress = {this.onLoginPress}>
                    <Text style = {styles.loginButtonText}>
                        LOGIN
                    </Text>
                </TouchableHighlight> 
                <TouchableHighlight
                    style = {styles.loginButton}
                    underlayColor = "#007ac1"
                    onPress = {this.getStorageData}>
                    <Text style = {styles.loginButtonText}>
                        VALUE
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  loginPage: {
    backgroundColor: '#ffffff',
    flex: 1
  },
  inputEmail: {
    marginLeft: 32,
    marginRight: 32,
    marginTop: 140,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0, 0.06)'
  },
  inputPassword: {
    marginLeft: 32,
    marginRight: 32,
    marginTop: 24,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0, 0.06)'
  },
  loginButton: {
    width: 88,
    height: 44,
    marginTop: 24,
    alignSelf: "flex-end",
    marginRight: 32,
    backgroundColor: "#007ac1",
    borderRadius: 4,
    alignItems: "center"
  },
  loginButtonText: {
    textAlign: "center",
    fontSize: 14,
    color: "white",
    marginTop: 12,
    alignItems: "center"
  },
  inputView: {
    backgroundColor: "#0f000000",
    marginLeft: 32,
    marginRight: 32,
    marginTop: 140
  }
});

module.export = HSLogin;