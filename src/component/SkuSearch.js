import React, { Component } from "react";
import NavBar, { NavTitle } from "react-native-nav";
import Toast from "react-native-simple-toast";
import { Actions, ActionConst } from "react-native-router-flux";
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Alert, ListView } from "react-native";

import SkuRow from './SkuRow';

export default class SkuSearch extends Component {

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([ 'row 1', 'row 2'])
        };
    }

    render() {
        return(
            <View style = { styles.searchSkuPage}>
                <NavBar>
                    <NavTitle>
                        {"Batch " + this.props.text.id}
                    </NavTitle>
                </NavBar>
                <View style = {styles.searchSku}>
                    <TextInput 
                        placeholder = " Search VSKU">
                    </TextInput>
                </View>
                <ListView style = {styles.listViewContainer} 
                    dataSource = {this.state.dataSource}
                    renderRow = {(data) => <SkuRow {...this.props.text.vsku_details}/>} />
                <View style = {styles.footer}>
                    <Text style = {styles.noOfSkuText}>
                        0 of 122 VSKUs reported
                    </Text>
                    <TouchableHighlight style = {styles.proceedButton}>
                        <Text style = {styles.proceedButtonText}>
                            PROCEED TO SUMMARY
                        </Text>            
                    </TouchableHighlight>
                </View>
            </View>
        );   
    }
}

const styles = StyleSheet.create({
    searchSkuPage : {
        backgroundColor: '#ffffff',
        flex: 1
    },
    searchSku: {
        marginLeft: 32,
        marginRight: 32,
        marginTop: 24
    },
    listViewContainer: {
        flex: 1,
        marginTop: 24,
        marginBottom: 92
    },
    noOfSkuText: {
        marginLeft: 32,
        marginTop: 12,
        fontSize: 12
    },
    proceedButton: {
        height: 40,
        marginLeft: 32,
        marginRight: 32,
        marginTop: 12,
        marginBottom: 12,
        backgroundColor: '#007ac1',
        borderRadius: 4,
        alignItems: 'center'
    },
    proceedButtonText: {
        textAlign: "center",
        fontSize: 14,
        color: "white",
        marginTop: 10,
        alignItems: "center"
    },
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: '#28000000',
        flex: 0.1,
        height: 93,
        bottom: -1,
        shadowOffset: {width: 0, height: 2},
        elevation: 1
    }
});

module.exports = SkuSearch;