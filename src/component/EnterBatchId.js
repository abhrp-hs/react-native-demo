import React, { Component } from "react";
import NavBar, { NavTitle } from "react-native-nav";
import Toast from "react-native-simple-toast";
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Alert, AsyncStorage } from "react-native";

export default class EnterBatchId extends Component {

    constructor(props) {
        super(props)
        this.state = {
            batchId : ''
        };
    }
    
    onSubmitPress = () => {
        const {batchId} = this.state;
        console.log(authToken);
        if (batchId == '') {
            Alert.alert("Please Enter Batch ID")
        } else {
            fetch('https://internals.hopscotch.in/ops_api/quality_control/batch/details/399', {
                method : 'GET',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json',               
                    'Auth-Token' : this.props.text
                }
            })
            .then((response) => response.json())
            .then((responseData) => {
                try {
                    Toast.show("Response " + responseData.payload.vendor_id, Toast.LONG);
                    //Alert.alert(JSON.stringify(responseData));
                } catch (error) {
                    console.error(error);
                }
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
                        placeholder = "Batch ID"
                        keyboardType = "numeric"
                        onChangeText = {batchId => this.setState({batchId})}
                    />
                </View>     
                <TouchableHighlight
                    style = {styles.submitButton}
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
        marginTop: 180
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