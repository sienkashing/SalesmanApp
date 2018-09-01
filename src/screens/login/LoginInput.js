// @flow
import React, { PureComponent } from "react";
import { View, TextInput } from "react-native";
import { Icon } from "react-native-elements";
import Colors from "app/Colors";
import styles from "./styles";

// Component: LoginInput
type inputProps = {
  value: string,
  iconName: string,
  placeholder: string,
  isPassword?: boolean,
  onChangeText: Function,
  error: string
};
type inputState = {
  showSecureText: boolean
};
export default class LoginInput extends PureComponent<inputProps, inputState> {
  constructor(props: inputProps) {
    super(props);
    const { isPassword } = this.props;

    let bShow = false;

    if (isPassword) {
      bShow = true;
    }

    this.state = {
      showSecureText: bShow
    };
  }

  render() {
    const {
      value,
      iconName,
      placeholder,
      onChangeText,
      error,
      isPassword,
      ...attributes
    } = this.props;

    const { showSecureText } = this.state;

    const color = error ? "red" : Colors.primary;

    return (
      <View style={[styles.inputContainer, error && { borderColor: "red" }]}>
        <Icon type="evilicon" name={iconName} color={color} />
        <TextInput
          value={value}
          placeholder={placeholder}
          style={styles.inputStyle}
          secureTextEntry={showSecureText}
          selectionColor={color}
          onChangeText={onChangeText}
          {...attributes}
        />
        {isPassword && (
          <Icon
            type="evilicon"
            name="eye"
            containerStyle={{ width: 30, marginRight: 10 }}
            color={showSecureText ? color : "white"}
            onPress={() => {}}
            onPressIn={() => this.setState({ showSecureText: false })}
            onPressOut={() => this.setState({ showSecureText: true })}
          />
        )}
      </View>
    );
  }
}
