import React from "react";
import { View, Text, StyleSheet, Image, Alert, TouchableHighlight } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    marginLeft: 24,
    fontSize: 16
  },
  photo: {
    marginLeft: 32,
    height: 72,
    width: 72
  }
});

function onImageClick() {
  Alert.alert("Image Button Clicked");
};

const SkuRow = props =>
  <View style={styles.container}>
    <TouchableHighlight onPress = {onImageClick}>
      <Image source={{ uri: props.image }} style={styles.photo} />
    </TouchableHighlight>
    <Text style={styles.text}>
      {`${props.vsku}`}
    </Text>
  </View>;

export default SkuRow;
