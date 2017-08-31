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
            dataSource: ds.cloneWithRows(dataResponse)
        };
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
                    <TextInput 
                        placeholder = " Search VSKU">
                    </TextInput>
                </View>
                <ListView style = {styles.listViewContainer} 
                    dataSource = {this.state.dataSource}
                    renderRow={rowData => <RowSku image={rowData.image} vsku ={rowData.vsku}/>}/>
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

class RowSku extends Component {
    onImageClick(text) {
        Actions.skuDetail({skuImage : this.props.image});
        console.log(text);
    }
    render () {
        return (
            <View style={styles.skuRowContainer}>
                <TouchableHighlight onPress={() => this.onImageClick(this.props.image)}>
                    <Image source={{ uri: this.props.image }} style={styles.skuPhoto} />
                </TouchableHighlight>
                <TouchableHighlight onPress={this.onImageClick}>
                    <Text style={styles.vskuText}>
                        {this.props.vsku}
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
  skuRowContainer: {
    flex: 1,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center"
  },
  vskuText: {
    marginLeft: 24,
    fontSize: 16
  },
  skuPhoto: {
    marginLeft: 32,
    height: 72,
    width: 72
  }
});

module.exports = SkuSearch;