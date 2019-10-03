import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  Alert,
  Linking
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

    // axios
    //   .get("https://jsonplaceholder.typicode.com/posts")
    //   .then(response => {
    //     console.log(response.data);
    //     this.setState({ customers: response.data });
    //   })
    //   .catch(error => {
    //     console.log(error.response.data);
    //   });
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

  _onLongPressListItem(mobile) {
    console.log(mobile);
    // alert(name);
    Alert.alert(
      "Actions",
      "",
      [
        {
          text: "Call",
          onPress: () => {
            let phoneNumber = mobile; //"01711545454";
            console.log("inside", mobile);
            if (Platform.OS !== "android") {
              phoneNumber = `telprompt:${mobile}`;
            } else {
              phoneNumber = `tel:${mobile}`;
            }
            Linking.canOpenURL(phoneNumber)
              .then(supported => {
                if (!supported) {
                  Alert.alert("Phone number is not available");
                } else {
                  return Linking.openURL(phoneNumber);
                }
              })
              .catch(err => console.log(err));
          }
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ],
      { cancelable: true }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ width: "100%" }}>
          <FlatList
            data={this.state.customers}
            renderItem={({ item, index }) => (
              <View style={styles.singlePostArea}>
                <TouchableOpacity
                  style={styles.listTouchContainer}
                  onLongPress={() => this._onLongPressListItem(item.mobile)}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <Text style={styles.singlePost}>
                      {index + 1}. {item.name}
                    </Text>
                    <Text style={styles.singlePost}>{item.balance}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

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
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#ddd",
    alignSelf: "stretch",
    padding: 0,
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
  singlePostArea: {},
  listTouchContainer: {
    backgroundColor: "#fff",
    marginBottom: 15,
    padding: 15
  },
  singlePost: {
    color: "#757575",
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: "#BDBDBD",
    lineHeight: 25,
    marginRight: 15
  },
  floatingAddBtn: {
    flexDirection: "row",
    position: "absolute",
    right: 10,
    bottom: 10
  }
});
