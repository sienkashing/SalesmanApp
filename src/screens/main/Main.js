// @flow
import React, { Component } from "react";
import { View, Button, StatusBar } from "react-native";
import type { NavigationScreenProp, NavigationStateRoute } from "react-navigation";
import Colors from "app/Colors";
import AuthToken from "app/services/AuthToken";
import styles from "./styles";

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
    navigation.navigate("ProductSurvey");
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.B900} />
        <Button title="Product Survey" onPress={this.goToNextScreen} />
        <Button title="Logout" onPress={this.handleLogout} />
      </View>
    );
  }
}
