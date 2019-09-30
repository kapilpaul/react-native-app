import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

import axios from "axios";

export class Home extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null
  };

  _onPressLogoutButton = async () => {
    await AsyncStorage.removeItem("userToken");
    this.props.navigation.navigate("Auth");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome Home Kapil!</Text>

        <View style={{ flexDirection: "row", padding: 25 }}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this._onPressLogoutButton}
          >
            <Text style={styles.loginText}>LogOut</Text>
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
    alignItems: "center",
    backgroundColor: "#4fc3f7",
    alignSelf: "stretch"
  },
  welcome: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
    color: "#eceff1",
    fontWeight: "bold"
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  formControl: {
    width: "100%",
    height: 50,
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 4,
    textAlign: "center"
  },
  buttonContainer: {
    backgroundColor: "#fff176",
    padding: 7,
    borderRadius: 4,
    color: "#000",
    flex: 1
  },
  loginText: {
    textAlign: "center",
    padding: 8,
    fontWeight: "bold"
  }
});
