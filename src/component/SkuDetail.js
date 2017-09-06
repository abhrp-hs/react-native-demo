import React, { Component } from "react";
import NavBar, { NavTitle } from "react-native-nav";
import Toast from "react-native-simple-toast";
import { Actions, ActionConst } from "react-native-router-flux";
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Alert, Image, ScrollView, ListView } from "react-native";

import skuSearch from './SkuSearch';

export default class SkuDetail extends Component {

    constructor(props) {
        super(props);
        const defectRowArray = [];
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            refreshing: false,
            rowDefectType: "",
            rowDefectQuantity: "",
            arrayOfDefects: [],
            arrayOfQuantity: [],
            defectDictionary: {},
            totalDefectiveQuantity: '',
            totalReplacedQuantity: ''
        };
    }

    componentWillMount() {
        this.defectRowArray = [];
        for (let i = 0; i < 1; i++) {
            this.defectRowArray.push({ keyy: i, data: "row" + i, index: i + "" });
        }
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.defectRowArray)
        });
    }

    addDefectRow() {
        if (this.state.rowDefectType != '' && this.state.rowDefectQuantity != '') {
            let i = this.defectRowArray.length;
            this.defectRowArray.push({ keyy: i, data: "row" + i, index: i + "" });
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(
                this.defectRowArray
              ),
              rowDefectType: '',
              rowDefectQuantity: ''
            });
        } else {
            Alert.alert("Please fill all values.");
        }        
    }

    onDoneClick() {
        defectDictionary = {};
        if (this.props.skudata.hasOwnProperty("vsku")) {
            defectDictionary.vsku = this.props.skudata.vsku;            
        }
        if (this.props.skudata.hasOwnProperty("color")) {
            defectDictionary.color = this.props.skudata.color;
        }
        if (this.props.skudata.hasOwnProperty("image")) {
            defectDictionary.image = this.props.skudata.image;
        }
        if (this.props.skudata.hasOwnProperty("total_quantity")) {
            defectDictionary.total_quantity = this.props.skudata.total_quantity;
        }
        if (this.state.totalDefectiveQuantity == '') {
            Alert.alert("Defective Quantity can't be empty");
            return;
        } else {
            defectDictionary.total_defective_quantity = this.state.totalDefectiveQuantity;
        } 
        if (this.state.totalReplacedQuantity == '') {
            Alert.alert("Replaced Quantity can't be empty");
            return;
        } else {
            defectDictionary.total_replaced_quantity = this.state.totalReplacedQuantity;
        }
        
        let finalArray = [];
        for (let i = 0; i < this.state.arrayOfDefects.length; i++) {
            if (i < this.state.arrayOfQuantity.length) {        
                let obj = {};
                if (this.state.arrayOfDefects[i].hasOwnProperty("defect_type")) {  
                    obj.defect_type = this.state.arrayOfDefects[i].defect_type;      
                } 
                if (this.state.arrayOfQuantity[i].hasOwnProperty("defect_qty")) {
                    obj.defect_qty = this.state.arrayOfQuantity[i].defect_qty;                          
                }                
                finalArray.push(obj);
            } else {
                Alert.alert("Please fill all values");
                return;
            }
        }
        defectDictionary.defect_details = finalArray;
        //Toast.show(JSON.stringify(defectDictionary) + "", Toast.LONG);
        skuSearch.helloWorld(defectDictionary);
        Actions.pop();
    }

    onDefectTypeTextChange(defectText, rowdata) {
        this.setState({rowDefectType : defectText});
        if (defectText != '') {
            // Remove item from array from on going change position ...
            this.state.arrayOfDefects.splice(rowdata.index, 1);
            // Add the changed text at specific position ...
            this.state.arrayOfDefects.splice(rowdata.index, 0, {"defect_type" : defectText});
        }
    }

    onDefectQuantityTextChange(defectQuantity, rowdata) {
        this.setState({rowDefectQuantity : defectQuantity});
        if (defectQuantity != '') {
            // remove item from array from on going chnage position ...
            this.state.arrayOfQuantity.splice(rowdata.index, 1);
            // Add the changed text at specific position ...
            this.state.arrayOfQuantity.splice(rowdata.index, 0, {"defect_qty" : defectQuantity});
        }
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
                        renderRow = {rowdata => <View style = {styles.defectViewContainer}>
                                                        <View style = {styles.defectTypeInputText}>
                                                            <TextInput style = {{marginLeft: 16}}
                                                                placeholder = "Type"
                                                                onChangeText = {(defectText) => this.onDefectTypeTextChange(defectText, rowdata)}                                                
                                                                underlineColorAndroid = "transparent"
                                                            />
                                                        </View>
                                                        <View style = {styles.defectQtyInputText}>
                                                            <TextInput style = {{marginLeft: 16}}
                                                                placeholder = "Qty"
                                                                keyboardType = "numeric"
                                                                onChangeText = {defectQuantity => this.onDefectQuantityTextChange(defectQuantity, rowdata)}
                                                                underlineColorAndroid = "transparent"
                                                            />
                                                        </View>
                                                </View>}
                    />
                    <TouchableHighlight 
                            style = {styles.addDefectButtonView} 
                            underlayColor = "white"
                            onPress = {this.addDefectRow.bind(this)}>
                        <Text style = {styles.addDefectButton}>
                            + ADD DEFECT
                        </Text>
                    </TouchableHighlight>            
                    <View style = {styles.defectiveQuantityContainer}>
                        <Text style = {styles.defectiveQuantityLabel}>Defective quantity *</Text>
                        <View style = {styles.defectiveQuantityInput}>
                            <TextInput style = {{marginLeft: 16}}
                                keyboardType = "numeric"
                                underlineColorAndroid = "transparent"
                                onChangeText = {totalDefectiveQuantity => this.setState({totalDefectiveQuantity})}
                                placeholder = "Qty"
                            />
                        </View>
                    </View>
                    <View style = {styles.replacedQuantityContainer}>
                        <Text style = {styles.replacedQuantityLabel}>Replaced Quantity *</Text>
                        <View style = {styles.replacedQuantityInput}>
                            <TextInput style = {{marginLeft: 16}}
                                keyboardType = "numeric"
                                underlineColorAndroid = "transparent"
                                onChangeText = {totalReplacedQuantity => this.setState({totalReplacedQuantity})}
                                placeholder = "Qty"
                            />
                        </View>
                    </View>
                    <TouchableHighlight 
                            style = {styles.doneButton} 
                            underlayColor = "white"
                            onPress = {this.onDoneClick.bind(this)} >
                        <Text style = {styles.doneButtonText}>Done</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
          </View>;
    }
}

class DefectType extends Component {
    render() {
        return (
            <View style = {styles.defectViewContainer}>
                <View style = {styles.defectTypeInputText}>
                    <TextInput style = {{marginLeft: 16}}
                        placeholder = "Type"
                        onChangeText = {rowDefect => this.setState({rowDefect})}
                        underlineColorAndroid = "transparent"
                    />
                </View>
                <View style = {styles.defectQtyInputText}>
                    <TextInput style = {{marginLeft: 16}}
                        placeholder = "Qty"
                        keyboardType = "numeric"
                        onChangeText = {rowQuantity => this.setState({rowQuantity})}
                        underlineColorAndroid = "transparent"
                    />
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
        flexDirection: "row"
    },
    skuImage: {
        height: 96,
        width: 96
    },
    vskuLable:{
        marginLeft: 16,
        fontSize: 12,
        height: 16,
        color: 'rgba(0,0,0,0.56)'
    },
    vskuText: {
        marginLeft: 16,
        height: 24,
        fontSize: 16,
        color: 'rgba(0,0,0,0.80)'
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
        fontSize: 20,
        color: 'black'
    },
    defectViewContainer: {
        marginLeft: 32,
        marginTop: 24,
        marginRight: 32,
        flexDirection: "row"
    }, 
    defectTypeInputText: {
        height: 56,
        width: 192,
        borderRadius: 4,
        backgroundColor: 'rgba(0,0,0, 0.06)'
    },
    defectQtyInputText: {
        marginLeft: 16,
        height: 56,
        width: 88,
        borderRadius: 4,
        backgroundColor: 'rgba(0,0,0, 0.06)'
    },
    addDefectButtonView: {
        marginLeft: 32,
        marginTop: 32,
        height: 48,
        width: 120
    },
    addDefectButton:{
        height: 20,
        marginTop: 14,
        fontSize: 14,
        color: '#007ac1'
    },
    replacedQuantityContainer: {
        marginLeft: 32,
        marginRight: 32,
        marginTop: 16,
        height: 56,
        flexDirection: "row"
    },
    defectiveQuantityContainer: {
        marginLeft: 32,
        marginRight: 32,
        marginTop: 32,
        height: 56,
        flexDirection: "row"
    },
    defectiveQuantityLabel: {
        height: 24,
        fontSize: 16,
        marginTop: 16,
        color: 'black'
    },
    defectiveQuantityInput: {
        marginLeft: 70,
        height: 56,
        width: 88,
        flex: 1,
        borderRadius: 4,
        backgroundColor: 'rgba(0,0,0, 0.06)'
    },
    replacedQuantityLabel: {
        height: 24,
        fontSize: 16,
        marginTop: 16,
        color: 'black'
    },
    replacedQuantityInput: {
        marginLeft: 70,
        height: 56,
        width: 88,
        flex: 1,
        borderRadius: 4,
        backgroundColor: 'rgba(0,0,0, 0.06)'
    },
    doneButton: {
        height: 40,
        marginLeft: 32,
        marginRight: 32,
        marginTop: 24,
        marginBottom: 32,
        backgroundColor: '#007ac1',
        borderRadius: 4,
        alignItems: "center"
    },
    doneButtonText: {
        textAlign: "center",
        fontSize: 14,
        color: 'white',
        marginTop: 10,
        alignItems: "center"
    }
});

module.exports = SkuDetail;