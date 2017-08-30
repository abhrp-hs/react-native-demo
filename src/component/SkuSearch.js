import React, { Component } from "react";
import NavBar, { NavTitle } from "react-native-nav";
import Toast from "react-native-simple-toast";
import { Actions, ActionConst } from "react-native-router-flux";
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Alert, AsyncStorage } from "react-native";

export default class SkuSearch extends Component {

    constructor(props) {
        super(props)
        this.state = {};
    }

    render() {
        return(
            <View style = { styles.searchSkuPage}>
                <NavBar>
                    <NavTitle>
                        {"Batch " + this.props.text.id}
                    </NavTitle>
                </NavBar>
                <Text>{this.props.text.id}</Text>
            </View>
        );   
    }
}

const styles = StyleSheet.create({
    searchSkuPage : {
        backgroundColor: '#ffffff',
        flex: 1
    }
});

module.exports = SkuSearch;