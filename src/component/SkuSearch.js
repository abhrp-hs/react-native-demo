import React, { Component } from "react";
import NavBar, { NavTitle } from "react-native-nav";
import Toast from "react-native-simple-toast";
import { Actions, ActionConst } from "react-native-router-flux";
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Alert, ListView, Image } from "react-native";

export default class SkuSearch extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const dataResponse = this.props.payload.vsku_details;
        this.state = {
            dataSource: ds.cloneWithRows(dataResponse),
            totalNoOfSku: dataResponse.length,
            totalNoOfReportedSku: 0,
        };
        this.callBackParent = this.callBackParent.bind(this);
    }

    static helloWorld(skuDefectData) {
        Toast.show(JSON.stringify(skuDefectData) + "", Toast.LONG);
    }

    onProceedToSummary() {
        Actions.summary({summary: "This is summary page"});
    }

    callBackParent = (jsondata) => {
        Toast.show(JSON.stringify(jsondata) + "", Toast.LONG);
    }

    onImageClick(rowData) {
        Actions.skuDetail({skudata : rowData});
    }

    componentWillReceiveProps(data) {
        Toast.show(JSON.stringify(this.props.data) + "hh", Toast.LONG);
    }

    render() {
        return(
            <View style = { styles.searchSkuPage}>
                <NavBar>
                    <NavTitle>
                        {"Batch " + this.props.id}
                    </NavTitle>
                </NavBar>
                <View style = {styles.searchSku}>
                    <TextInput style = {{marginLeft: 16}}
                        placeholder = " Search VSKU"
                        underlineColorAndroid = "transparent">
                    </TextInput>
                </View>
                <ListView style = {styles.listViewContainer} 
                    dataSource = {this.state.dataSource}

                    renderRow = {rowData => <View style={styles.skuRowContainer}>
                                                <TouchableHighlight 
                                                    onPress={() => this.onImageClick(rowData)}
                                                    underlayColor = "white">
                                                    <Image source={{ uri: rowData.image }} style={styles.skuPhoto} />
                                                </TouchableHighlight>
                                                <TouchableHighlight 
                                                    style = {{height: 72}}
                                                    underlayColor = "white"
                                                    onPress={() => this.onImageClick(rowData)}>
                                                    <Text style={styles.vskuText}>
                                                        {rowData.vsku}
                                                    </Text>
                                                </TouchableHighlight>
                                            </View>} />
                <View style = {styles.footer}>
                    <View style = {styles.reportedSkuLabel}>
                        <Text style = {{fontSize: 12, color: 'rgba(0,0,0,0.56)'}}>{this.state.totalNoOfReportedSku} </Text>
                        <Text style = {{fontSize: 12, color: 'rgba(0,0,0, 0.56)'}}>of {this.state.totalNoOfSku} VSKUs Reported </Text>
                    </View>
                    <TouchableHighlight 
                        style = {styles.proceedButton}
                        onPress = {this.onProceedToSummary.bind(this)}
                        underlayColor = "#007ac1">
                        <Text style = {styles.proceedButtonText}>
                            PROCEED TO SUMMARY
                        </Text>            
                    </TouchableHighlight>
                </View>
            </View>
        );   
    }
}



class RowSku extends Component {
    onImageClick(text) {
        Actions.skuDetail({skudata : this.props.skudata, });
        console.log(text);
    }
    render () {
        return (
            <View style={styles.skuRowContainer}>
                <TouchableHighlight
                    onPress={() => this.onImageClick(this.props.skudata)}
                    underlayColor = "white">
                    <Image source={{ uri: this.props.image }} style={styles.skuPhoto} />
                </TouchableHighlight>
                <TouchableHighlight 
                    style = {{height: 72}}
                    underlayColor = "white"
                    onPress={() => this.onImageClick(this.props.skudata)}>
                    <Text style={styles.vskuText}>
                        {this.props.skudata.vsku}
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  searchSkuPage: {
    backgroundColor: "#ffffff",
    flex: 1
  },
  searchSku: {
    marginLeft: 32,
    marginRight: 32,
    marginTop: 24,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0, 0.06)'
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
    backgroundColor: "#007ac1",
    borderRadius: 4,
    alignItems: "center"
  },
  proceedButtonText: {
    textAlign: "center",
    fontSize: 14,
    color: "white",
    marginTop: 10,
    alignItems: "center"
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "#28000000",
    flex: 0.1,
    height: 93,
    bottom: -1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1
  },
  reportedSkuLabel: {
    marginLeft: 32,
    marginTop: 12,
    flexDirection: "row"
  },
  skuRowContainer: {
    flex: 1,
    marginBottom: 16,
    marginLeft: 32,
    flexDirection: "row",
    alignItems: "center"
  },
  vskuText: {
    marginLeft: 24,
    marginTop: 24,
    fontSize: 16,
    color: 'black'
  },
  skuPhoto: {
    height: 72,
    width: 72
  }
});

module.exports = SkuSearch;