import React, { Component } from "react";
import NavBar, { NavTitle } from "react-native-nav";
import { Actions, ActionConst } from "react-native-router-flux";
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Alert, Image, ScrollView, ListView } from "react-native";

export default class SkuDetail extends Component {

    constructor(props) {
        super(props);
        const defectRowArray = [];
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            refreshing: false
        };
    }

    componentWillMount() {
        this.defectRowArray = [];
        for (let i = 0; i < 1; i++) {
            this.defectRowArray.push({ keyy: i, data: "row" + i });
        }
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.defectRowArray)
        });
    }

    addDefectRow() {
        let i = this.defectRowArray.length;
        this.defectRowArray.push({ keyy: i, data: "row" + i });
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.defectRowArray)
        });
    }

    onDoneClick() {
        Actions.summary({summary :  "This is summary page"});
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
                    <TouchableHighlight style = {styles.addDefectButtonView} 
                            onPress = {this.addDefectRow.bind(this)}>
                        <Text style = {styles.addDefectButton}>
                            + ADD DEFECT
                        </Text>
                    </TouchableHighlight>            
                    <View style = {styles.defectiveQuantityContainer}>
                        <Text style = {styles.defectiveQuantityLabel}>Defective quantity</Text>
                        <TextInput style = {styles.defectiveQuantityInput}
                            keyboardType = "numeric"
                            underlineColorAndroid = "transparent"
                            placeholder = "Qty"
                        />
                    </View>
                    <View style = {styles.replacedQuantityContainer}>
                        <Text style = {styles.replacedQuantityLabel}>Replaced Quantity</Text>
                        <TextInput style = {styles.replacedQuantityInput}
                            keyboardType = "numeric"
                            underlineColorAndroid = "transparent"
                            placeholder = "Qty"
                        />
                    </View>
                    <TouchableHighlight style = {styles.doneButton} onPress = {this.onDoneClick.bind(this)} >
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
                <TextInput style = {styles.defectTypeInputText}
                    placeholder = "Type"
                    underlineColorAndroid = "transparent"
                />
                <TextInput style = {styles.defectQtyInputText}
                    placeholder = "Qty"
                    keyboardType = "numeric"
                    underlineColorAndroid = "transparent"
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
        height: 96,
        width: 96
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
        marginTop: 16
    },
    defectiveQuantityInput: {
        marginLeft: 70,
        height: 56,
        width: 88,
        borderRadius: 4,
        backgroundColor: 'rgba(0,0,0, 0.06)'
    },
    replacedQuantityLabel: {
        height: 24,
        fontSize: 16,
        marginTop: 16
    },
    replacedQuantityInput: {
        marginLeft: 70,
        height: 56,
        width: 88,
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