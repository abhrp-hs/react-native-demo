import React, { Component } from "react";
import NavBar, { NavTitle } from "react-native-nav";
import { Actions, ActionConst } from "react-native-router-flux";
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Alert, Image, ScrollView, ListView } from "react-native";

export default class SkuDetail extends Component {

    constructor(props) {
        super(props);
        const arr = [];
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([1])
        };
    }

    onAddDefectPress () {
        Alert.alert("Button Pressed");
    }

    render() {
        return <View style={styles.skuDetailpage}>
            <NavBar>
              <NavTitle>
                VSKU {this.props.skudata.vsku}
              </NavTitle>
            </NavBar>
            <ScrollView>
                <View>
                    <View style={styles.skuImageContainer}>
                        <Image style={styles.skuImage} source={{ uri: this.props.skudata.image }} />
                        <View>
                            <Text style = {styles.vskuLable}>VSKU</Text>    
                            <Text style = {styles.vskuText}>{this.props.skudata.vsku}</Text>
                            <Text style = {styles.quantityLabel}>Quantity</Text>
                            <Text style = {styles.vskuText}>{this.props.skudata.total_quantity}</Text>
                        </View>
                    </View>
                    <Text style = {styles.defectsLabel}>Defects</Text>
                    <ListView
                        dataSource = {this.state.dataSource}
                        renderRow = {rowdata => <DefectType />}
                    />
                    <Text style = {styles.addDefectButton}
                          onPress = {this.onAddDefectPress}>                        
                        + ADD DEFECT
                    </Text>
                </View>
            </ScrollView>
          </View>;
    }
}

class DefectType extends Component {
    render() {
        return (
            <View style = {styles.defectViewContainer}>
                <TextInput style = {styles.defectTypeInputText}
                    placeholder = "Type"
                />
                <TextInput style = {styles.defectQtyInputText}
                    placeholder = "Qty"
                    keyboardType = "numeric"
                />
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
        flexDirection: "row"
    },
    skuImage: {
        height: 150,
        width: 150
    },
    vskuLable:{
        marginLeft: 16,
        fontSize: 12,
        height: 16
    },
    vskuText: {
        marginLeft: 16,
        height: 24,
        fontSize: 16
    },
    quantityLabel: {
        marginLeft: 16,
        height: 16,
        fontSize: 12,
        marginTop: 12
    }, 
    defectsLabel: {
        marginLeft: 32,
        marginTop: 24,
        height: 24,
        fontSize: 20
    },
    defectViewContainer: {
        marginLeft: 32,
        marginTop: 24,
        marginRight: 32,
        flexDirection: "row"
    }, 
    defectTypeInputText: {
        height: 56,
        width: 192
    },
    defectQtyInputText: {
        marginLeft: 16,
        height: 56,
        width: 88
    },
    addDefectButton:{
        height: 20,
        marginLeft: 32,
        marginTop: 24,
        fontSize: 14,
        color: '#007ac1'
    }
});

module.exports = SkuDetail;