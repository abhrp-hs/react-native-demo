import React, { Component } from "react";
import {
  ActivityIndicator,
  ListView,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  ToolbarAndroid,
  DatePickerAndroid,
  Button,
  Alert,
  AppRegistry
} from "react-native";

export default class FirstDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesResponse: [],
      isLoading: true
    };
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
  }

  componentDidMount() {
    return fetch("https://facebook.github.io/react-native/movies.json")
      .then(response => response.json())
      .then(responseJson => {
        let ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });

        moviesResponse = [];
        moviesResponse.push(responseJson.movies[0].title);
        console.log(moviesResponse);

        this.setState(
          {
            isLoading: false,
            dataSource: ds.cloneWithRows(responseJson.movies)
          },
          function() {
            // do something with new state
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  onPressDatePicker() {
    try {
      const { action, year, month, day } = DatePickerAndroid.open({
        date: new Date(2017, 8, 20)
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year and month and day.
      }
    } catch ({ code, message }) {
      //console.warn("Can not open date picker", message);
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.alignItemCenter}>
          <Text>It's Loading... Please Wait</Text>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View>
        <ToolbarAndroid
          style={styles.toolbar}
          title="Movies List"
          actions={[{ title: "Logout", show: "never" }]}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={rowData => <MoviesList name={rowData.title} />}
        />
        <Button title="Date Picker" onPress={this.onPressDatePicker} />
      </View>
    );
  }
}

// creating custom component
class MoviesList extends Component {
  render() {
    return (
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 0
        }}
      >
        <Text style={styles.bodyText}>
          {" "}Hello {this.props.name}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bodyText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  toolbar: {
    backgroundColor: "#2196F3",
    height: 56,
    textAlign: "center"
  },
  titleCenter: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center"
  },
  alignItemCenter: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  }
});

AppRegistry.registerComponent("FirstDemo", () => FirstDemo);
