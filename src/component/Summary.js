import React, { Component } from "react";
import NavBar, { NavTitle } from "react-native-nav";
import Toast from "react-native-simple-toast";
import { Actions, ActionConst } from "react-native-router-flux";
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Alert, ScrollView, Image, Picker } from "react-native";

import eyeImag from '../images/eye_black.png';


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
                <ScrollView>
                    <View style = {styles.inspectResultPicker}>
                        <Picker style = {{marginLeft: 16}}
                            selectedValue = {this.state.inspectResult}
                            onValueChange = {(itemValue, itemIndex) => this.setState({inspectResult: itemValue})}>
                            <Picker.Item label = "Accept" value = "Accept"/>
                            <Picker.Item label = "Partially Accept" value = "Partially Accept"/>
                            <Picker.Item label = "Reject" value = "Reject"/> 
                        </Picker>
                    </View>
                    <View style = {styles.inspectionDate}>
                    </View>
                    <View style = {styles.inspectedPiecesContainer}>
                        <Text style = {styles.inspectedPiecesLabel}>
                            No. of inspected pieces 
                        </Text>
                        <View style = {styles.inspectedPiecesInput}>
                            <TextInput style = {{marginLeft: 16}}
                                placeholder = "Qty"
                                keyboardType = "numeric"
                            />
                        </View>
                    </View>
                    <View style = {styles.inspectedPiecesContainer}>
                        <Text style = {styles.inspectedPiecesLabel}>
                            No. of rejected pieces
                        </Text>
                        <View style = {styles.inspectedPiecesInput}>
                            <TextInput style = {{marginLeft: 16}}
                                placeholder = "Qty"
                                keyboardType = "numeric"
                            />
                        </View>
                    </View>
                    <View style = {styles.remarkContainer}>
                        <TextInput style = {{marginLeft: 16}} placeholder = "Remarks"/>
                    </View>
                    <View style = {styles.uploadCOntainer}> 
                        <Image source = {eyeImag} style = {styles.uploadIcon} />
                        <Text style = {styles.uploadButtonText}>Upload images</Text>
                    </View>
                    <TouchableHighlight style = {styles.submitButton} >
                        <Text style = {styles.submitButtonText}>SUBMIT</Text>
                    </TouchableHighlight>
                </ScrollView>
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
    },
    inspectionDate: {
        marginLeft: 32,
        marginRight: 32,
        marginTop: 24,
        height: 56,
        borderRadius: 4,
        backgroundColor: 'rgba(0,0,0, 0.06)'
    },
    inspectedPiecesContainer: {
        marginLeft: 32,
        marginRight: 32,
        marginTop: 24,
        height: 56,
        flexDirection: "row"
    },
    inspectedPiecesLabel: {
        marginTop: 16,
        height: 20,
        width: 176,
        fontSize: 16,
        color: 'black'
    },
    inspectedPiecesInput: {
        marginLeft: 30,
        height: 56,
        width: 88,
        flex: 1,
        borderRadius: 4,
        backgroundColor: 'rgba(0,0,0,0.06)'
    },
    remarkContainer: {
        marginLeft: 32,
        marginRight: 32,
        marginTop: 24,
        height: 96,
        borderRadius: 4,
        backgroundColor: 'rgba(0,0,0,0.06)'
    },
    uploadCOntainer: {
        marginLeft: 32,
        marginRight: 32,
        marginTop: 24,
        height: 56,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#007ac1',
        flexDirection : "row"
    },
    uploadIcon: {
        height: 24,
        width: 24,
        marginLeft: 75,
        marginTop: 16
    }, 
    uploadButtonText: {
        marginLeft: 8,
        marginTop: 16,
        height: 24,
        fontSize: 16,
        color: '#007ac1'
    },
    submitButton: {
        height: 40,
        marginLeft: 32,
        marginRight: 32,
        marginTop: 24,
        marginBottom: 32,
        backgroundColor: '#007ac1',
        borderRadius: 4,
        alignItems: "center"
    },
    submitButtonText: {
        textAlign: "center",
        fontSize: 14,
        color: 'white',
        marginTop: 10,
        alignItems: "center"
    }
});