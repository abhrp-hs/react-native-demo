import React, { Component, PropTypes } from "react";
import NavBar, { NavTitle } from "react-native-nav";
import { StyleSheet, View, TextInput, TouchableHighlight} from "react-native";

export default class GetStarted extends Component {

    constructor(props) {
        super(props)
        this.state = {
            batchId: ''
        };
    }

    render() {
        return (
            <View style = {styles.getStartedPage}>
                <NavBar>
                    <NavTitle>
                        {"Get Started"}
                    </NavTitle>
                </NavBar>
                <View style = {styles.batchId}>
                    <TextInput                    
                        placeholder = "Batch ID"                   
                    />
                </View>
                <TouchableHighlight
                    style = {styles.submitButton}>
                    <Text style = {styles.submitButtonText}>
                        SUBMIT
                    </Text>
                </TouchableHighlight>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    getStartedPage: {
        backgroundColor: '#ffffff',
        flex: 1
    },
    batchId: {
        marginLeft: 32,
        marginRight: 32,
        marginTop: 140
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

module.exports = GetStarted;