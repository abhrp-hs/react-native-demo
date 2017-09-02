import React, { Component } from "react";
import NavBar, { NavTitle } from "react-native-nav";
import Toast from "react-native-simple-toast";
import { Actions, ActionConst } from "react-native-router-flux";
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Alert, ListView, Image, Picker } from "react-native";


export default class Summary extends Component {

    constructor (props){
        super(props);
        this.state = {
            inspectResult: ''
        };
    }

    render() {
        return(
            <View style = {styles.summaryPage}>
                <NavBar>
                    <NavTitle>
                        Summary
                    </NavTitle>
                </NavBar>
                <Picker style = {styles.inspectResultPicker}
                        selectedValue = {this.state.inspectResult}
                        onValueChange = {(itemValue, itemIndex) => this.setState({inspectResult: itemValue})}>
                        <Picker.Item label = "Accept" value = "Accept"/>
                        <Picker.Item label = "Partially Accept" value = "Partially Accept"/>
                        <Picker.Item label = "Reject" value = "Reject"/> 
                </Picker>
                <Text>{this.props.summary}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    summaryPage: {
        backgroundColor: '#ffffff',
        flex: 1
    },
    inspectResultPicker: {
        marginLeft: 32,
        marginTop: 36,
        marginRight: 32,
        height: 56,
        borderRadius: 4,
        backgroundColor: 'rgba(0,0,0, 0.06)'
    }
});