import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  FlatList
} from "react-native";

import axios from "axios";
const apiUrl = "https://tarek.kapilpaul.me/api/";

export class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  state = { customers: [] };

  static navigationOptions = {
    title: "Home",
    headerStyle: {
      backgroundColor: "#2196F3"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      textAlign: "center"
    }
  };

  componentDidMount = async () => {
    let token = await this.__getHeader();

    axios
      .get(apiUrl + "customer", token)
      .then(response => {
        this.setState({ customers: response.data.customers.data });
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  __getHeader = async () => {
    const tokenData = await AsyncStorage.getItem("userToken");
    return {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + tokenData
      }
    };
  };

  _onPressAddButton = async () => {
    // await AsyncStorage.removeItem("userToken");
    this.props.navigation.navigate("CustomerCreate");
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.customers}
          renderItem={({ item, index }) => (
            <Text style={styles.singlePost}>
              {index + 1}. {item.name} - {item.mobile}
            </Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={styles.floatingAddBtn}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this._onPressAddButton}
          >
            <Text style={styles.floatingAddBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    alignSelf: "stretch",
    padding: 15,
    paddingRight: 0
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    color: "#212121",
    fontWeight: "bold",
    marginBottom: 20
  },
  buttonContainer: {
    backgroundColor: "#448AFF",
    padding: 7,
    borderRadius: 500,
    color: "#000",
    // flex: 1,
    width: 60,
    height: 60
  },
  floatingAddBtnText: {
    textAlign: "center",
    padding: 3,
    fontWeight: "bold",
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff"
  },
  singlePost: {
    color: "#757575",
    marginBottom: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    paddingBottom: 15,
    borderColor: "#BDBDBD",
    lineHeight: 25,
    marginRight: 15,
    width: "100%"
  },
  floatingAddBtn: {
    flexDirection: "row",
    position: "absolute",
    right: 10,
    bottom: 10
  }
});
