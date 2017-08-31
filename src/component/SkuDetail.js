import React, { Component } from "react";
import NavBar, { NavTitle } from "react-native-nav";
import { Actions, ActionConst } from "react-native-router-flux";
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Alert, Image } from "react-native";

export default class SkuDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return ( 
            <View style = {styles.skuDetailpage}>
                <NavBar>
                    <NavTitle>
                        {"SKU Details"}
                    </NavTitle>
                </NavBar>
                <View style = {styles.skuImageContainer}>
                    <Image style = {styles.skuImage} source = {{uri: this.props.skuImage}}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    skuDetailpage: {
        backgroundColor: '#ffffff',
        flex:1
    },
    skuImageContainer: {
        marginLeft: 32,
        marginTop: 24,
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    skuImage: {
        height: 150,
        width: 150
    }
});

module.exports = SkuDetail;