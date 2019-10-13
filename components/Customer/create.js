import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  StatusBar
} from "react-native";

import axios from "axios";
const apiUrl = "https://tarek.kapilpaul.me/api/";

export class CustomerCreate extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    name: "",
    email: "",
    mobile: 0,
    address: "",
    previous_purchase_amount: 0,
    balance: 0
  };

  static navigationOptions = {
    title: "Customer Create",
    headerStyle: {
      backgroundColor: "#2196F3"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      textAlign: "center"
    }
  };

  _onPressLogOutButton = async () => {
    await AsyncStorage.removeItem("userToken");
    this.props.navigation.navigate("Auth");
  };

  _onPressCreateButton = async () => {
    var data = {
      name: this.state.name,
      mobile: this.state.mobile,
      email: this.state.email,
      address: this.state.address,
      balance: this.state.balance,
      previous_purchase_amount: this.state.previous_purchase_amount
    };

    let token = await this.__getHeader();

    axios
      .post(apiUrl + "customer", data, token)
      .then(response => {
        alert("Created Successfully");
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

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2196F3" animated={true} />
        <View style={{ width: "100%", padding: 15 }}>
          <TextInput
            style={styles.formControl}
            placeholder="Name"
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
            autoCorrect={false}
          ></TextInput>

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
            placeholder="Mobile"
            onChangeText={mobile => this.setState({ mobile })}
            value={`${this.state.mobile}`}
            keyboardType={"number-pad"}
          ></TextInput>

          <TextInput
            style={styles.formControl}
            autoCapitalize="none"
            placeholder="address"
            onChangeText={address => this.setState({ address })}
            value={this.state.address}
            autoCorrect={false}
          ></TextInput>

          <TextInput
            style={styles.formControl}
            autoCapitalize="none"
            placeholder="previous purchase amount"
            onChangeText={previous_purchase_amount =>
              this.setState({ previous_purchase_amount })
            }
            value={`${this.state.previous_purchase_amount}`}
            autoCorrect={false}
            keyboardType={"number-pad"}
          ></TextInput>

          <TextInput
            style={styles.formControl}
            autoCapitalize="none"
            placeholder="Balance"
            onChangeText={balance => this.setState({ balance })}
            value={`${this.state.balance}`}
            autoCorrect={false}
            keyboardType={"number-pad"}
          ></TextInput>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this._onPressCreateButton}
            >
              <Text style={styles.loginText}>Create</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this._onPressLogOutButton}
            >
              <Text style={styles.loginText}>LogOut</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    alignSelf: "stretch",
    padding: 5
  },
  formControl: {
    width: "100%",
    height: 50,
    padding: 5,
    marginBottom: 15,
    borderRadius: 4,
    textAlign: "left",
    borderColor: "#BDBDBD",
    borderBottomWidth: 1
  },
  buttonContainer: {
    backgroundColor: "#448AFF",
    padding: 7,
    borderRadius: 4,
    color: "#000",
    flex: 1,
    marginTop: 20
  },
  loginText: {
    textAlign: "center",
    padding: 8,
    fontWeight: "bold",
    color: "#fff"
  }
});
