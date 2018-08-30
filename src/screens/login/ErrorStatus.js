// @flow
import React from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import styles from "./styles";

// Component: Show Error
type errorProp = {
  errorText: string
};
const ErrorStatus = (props: errorProp) => {
  const { errorText } = props;

  return (
    <View style={[styles.inputContainer, styles.errorContainer]}>
      <Icon name="error" color="red" />
      <Text style={{ marginLeft: 5, color: "red", textAlignVertical: "center" }}>{errorText}</Text>
    </View>
  );
};

export default ErrorStatus;
