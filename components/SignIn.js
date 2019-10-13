import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  NetInfo
} from "react-native";

import axios from "axios";

const apiUrl = "https://tarek.kapilpaul.me/api/";

export class SignIn extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  state = {
    netConnected: true
  };

  _onPressLoginButton = async () => {
    await NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({ netConnected: isConnected });
    });

    if (this.state.netConnected) {
      let loginData = {
        email: this.state.email,
        password: this.state.password
      };

      if (loginData.email !== "" && loginData.password !== "") {
        axios
          .post(apiUrl + "login", loginData)
          .then(response => {
            AsyncStorage.setItem("userToken", response.data.access_token);
            // AsyncStorage.setItem("expiration", response.data.expiration);
            this.props.navigation.navigate("Home");
          })
          .catch(error => {
            console.log(error.data);
          });
      } else {
        alert("Please enter email and password");
      }
    }
  };

  internetCheckElement() {
    if (!this.state.netConnected) {
      return (
        <View style={{ width: "100%", position: "absolute", bottom: 0 }}>
          <Text style={styles.netConnectionText}>
            Please check your internet connection
          </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Login To Explore</Text>
        <View style={{ width: "100%", padding: 15 }}>
          <TextInput
            style={styles.formControl}
            autoCapitalize="none"
            placeholder="email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            autoCorrect={false}
          ></TextInput>

          <TextInput
            style={styles.formControl}
            autoCapitalize="none"
            placeholder="password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            autoCorrect={false}
            secureTextEntry
          ></TextInput>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this._onPressLoginButton}
            >
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        {this.internetCheckElement()}
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
  netConnectionText: {
    fontSize: 12,
    textAlign: "center",
    color: "#eceff1",
    backgroundColor: "#FF5252",
    padding: 6
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
