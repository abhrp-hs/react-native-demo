import React, { Component } from "react";
import NavBar, { NavTitle } from "react-native-nav";
import { Actions, ActionConst } from "react-native-router-flux";
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Alert, AsyncStorage } from "react-native";

export default class SkuDetail extends Component {

    render() {
        return ( 
            <View>
                <NavBar>
                    <NavTitle>
                        {"SKU Details"}
                    </NavTitle>
                </NavBar>
            </View>
        );
    }
}

module.exports = SkuDetail;