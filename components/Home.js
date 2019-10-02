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

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

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

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/posts").then(response => {
      this.setState({ posts: response.data });
    });
  }

  _onPressLogoutButton = async () => {
    await AsyncStorage.removeItem("userToken");
    this.props.navigation.navigate("Auth");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome Home Kapil!</Text>
        {/* <View style={{ flexDirection: "row", padding: 25 }}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this._onPressLogoutButton}
          >
            <Text style={styles.loginText}>LogOut</Text>
          </TouchableOpacity>
        </View> */}

        <FlatList
          data={this.state.posts}
          renderItem={({ item }) => (
            <Text style={styles.singlePost}>{item.title}</Text>
          )}
        />
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
    padding: 15
  },
  welcome: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
    color: "#212121",
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
  },
  singlePost: {
    color: "#757575",
    marginBottom: 10
  }
});
