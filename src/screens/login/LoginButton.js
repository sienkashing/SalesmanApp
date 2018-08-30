// @flow
import React from "react";
import { Button } from "react-native-elements";
import Colors from "../../Colors";
import styles from "./styles";

// Component: Login Button
type loginBtnProp = {
  loginSuccess: boolean,
  loading: boolean,
  onPress: Function
};
const LoginButton = (props: loginBtnProp) => {
  const { loginSuccess, loading, onPress } = props;

  let icon = { type: "simple-line-icon", name: "login", color: Colors.primary };

  if (loading) {
    icon = null;
  } else if (loginSuccess) {
    icon = { type: "evilicon", name: "check", color: "green" };
  }

  return (
    <Button
      title={loginSuccess ? "Authenticated" : "Salesman Log In"}
      icon={icon}
      onPress={onPress}
      backgroundColor="white"
      textStyle={{ color: !loginSuccess ? Colors.primary : "green" }}
      borderRadius={5}
      containerViewStyle={[styles.buttonContainer, loginSuccess && { borderColor: "green" }]}
      color={Colors.primary}
      loading={loading}
    />
  );
};

export default LoginButton;
