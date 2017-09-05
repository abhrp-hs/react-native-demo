import React, { Component } from "react";
import NavBar, { NavTitle } from "react-native-nav";
import Toast from "react-native-simple-toast";
import { Actions, ActionConst } from "react-native-router-flux";
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Alert, AsyncStorage, Keyboard } from "react-native";

export default class EnterBatchId extends Component {

    constructor(props) {
        super(props)
        this.state = {
            batchId : '',
            storedAuthToken : ''
        };
    }

    componentWillMount() {
        this.getStorageData();
    }

    getStorageData = async () => {
        try {
            const token = await AsyncStorage.getItem('@AuthToken:key');
            this.setState({storedAuthToken: token});
            console.log(token);
        } catch (error){
            console.log(error);
        }
    }
    
    onSubmitPress = () => {
        const {batchId} = this.state;
        if (batchId == '') {
            Alert.alert("Please Enter Batch ID")
        } else {
            Keyboard.dismiss();
            debugGetBatch = 'http://rubydev.hopscotch.in/ops_api/quality_control/batch/';
            releaseGetBatch = "https://internals.hopscotch.in/ops_api/quality_control/batch/";
            fetch(debugGetBatch + batchId, {
                method : 'GET',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json',               
                    'Auth-Token' : this.state.storedAuthToken
                }
            })
            .then((response) => response.json())
            .then((responseData) => {
                try {
                    //Toast.show("Response " + responseData.payload.vendor_id, Toast.LONG);
                    //Alert.alert(JSON.stringify(responseData));
                    if ( responseData.hasOwnProperty("payload")) {                        
                        if (responseData.payload.hasOwnProperty("vsku_details")) {
                            Actions.skuSearch({payload : responseData.payload, id : batchId});
                        } else {
                            Alert.alert("There is no inspection pending for this batch");
                        }
                    } else {
                        Alert.alert("There is no inspection pending for this batch");
                    }
                } catch (error) {
                    Toast.show("Auth Token Expired", Toast.LONG);
                    Actions.loginScreen();
                }
            })
            .catch((error) => {
                Toast.show("Auth Token Expired.. Please log in again", Toast.SHORT);
                Actions.loginScreen();
            })
            .done();
        }
    }

    render() {
        return (
            <View style = {styles.batchIdPage}>
                <NavBar>
                    <NavTitle>
                        {"Get Started"}
                    </NavTitle>
                </NavBar>    
                <View style = {styles.inputBatchId}>
                    <TextInput
                        style = {{marginLeft : 16}}
                        placeholder = "Batch ID"
                        keyboardType = "numeric"
                        underlineColorAndroid = "transparent"
                        onChangeText = {batchId => this.setState({batchId})}
                    />
                </View>     
                <TouchableHighlight
                    style = {styles.submitButton}
                    underlayColor = "#007ac1"
                    onPress = {this.onSubmitPress}>
                    <Text style = {styles.submitButtonText} >
                        SUBMIT
                    </Text>
                </TouchableHighlight>   
            </View>
        );
    }
}

const styles = StyleSheet.create({
    batchIdPage: {
        backgroundColor: '#ffffff',
        flex: 1
    },
    inputBatchId: {
        marginLeft: 32,
        marginRight: 32,
        marginTop: 180,
        borderRadius: 4,
        backgroundColor: 'rgba(0,0,0, 0.06)'
    },
    submitButton: {
        width: 88,
        height: 44,
        marginTop: 24,
        alignSelf: "flex-end",
        marginRight: 32,
        backgroundColor: "#007ac1",
        borderRadius: 4,
        alignItems: "center"
    },
    submitButtonText: {
        textAlign: "center",
        fontSize: 14,
        color: "white",
        marginTop: 12,
        alignItems: "center"
    }
});

module.exports = EnterBatchId;