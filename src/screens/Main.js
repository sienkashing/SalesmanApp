// @flow
import React, { Component } from "react";
import {
  StyleSheet, View, Button, StatusBar
} from "react-native";
import type { NavigationScreenProp, NavigationStateRoute } from "react-navigation";
import Colors from "../Colors";

import AuthToken from "../services/AuthToken";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

type Props = {
  navigation: NavigationScreenProp<NavigationStateRoute>
};
export default class App extends Component<Props> {
  componentDidMount() {
    this.validateSession();
  }

  validateSession = () => {
    AuthToken.checkIfTokenExpire().then((isExpired) => {
      const { navigation } = this.props;
      if (isExpired) {
        navigation.navigate("Login");
      }
    });
  };

  handleLogout = () => {
    AuthToken.deleteToken();
    this.validateSession();
  };

  goToNextScreen = () => {
    const { navigation } = this.props;
    navigation.navigate("NewScreen");
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.B900} />
        <Button title="New Screen" onPress={this.goToNextScreen} />
        <Button title="Logout" onPress={this.handleLogout} />
      </View>
    );
  }
}
