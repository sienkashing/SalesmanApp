// @flow
import React, { Component } from "react";
import {
  View, Text, ImageBackground, Animated, Keyboard
} from "react-native";
import type { NavigationScreenProp, NavigationStateRoute } from "react-navigation";
import loginUser from "../../api/user/login";
import LoginManager from "../../services/LoginManager";
import styles from "./styles";
import LoginInput from "./LoginInput";
import ErrorStatus from "./ErrorStatus";
import LoginButton from "./LoginButton";

// Componet: Footer
const Footer = () => (
  <Text
    style={{
      textAlign: "center",
      color: "rgba(255,255,255, 0.75)",
      fontSize: 10,
      marginBottom: 5
    }}
  >
    Copyright@2018 E-Business IT Sdn Bhd
  </Text>
);

// Component: Main LoginScreen
const imageMax = 250;
const imageMin = 75;
type Props = {
  navigation: NavigationScreenProp<NavigationStateRoute>
};
type State = {
  imageHeight: any,
  keyboardShowSub: any,
  keyboardHideSub: any,
  username: string,
  password: string,
  error: string,
  loading: boolean,
  loginSuccess: boolean
};
export default class App extends Component<Props, State> {
  static navigationOptions = {
    header: null
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      imageHeight: new Animated.Value(imageMax),
      keyboardShowSub: null,
      keyboardHideSub: null,
      username: "",
      password: "",
      error: "",
      loading: false,
      loginSuccess: false
    };
  }

  componentDidMount() {
    this.state.keyboardShowSub = Keyboard.addListener("keyboardDidShow", this.keyboardDidShow);
    this.state.keyboardHideSub = Keyboard.addListener("keyboardDidHide", this.keyboardDidHide);

    LoginManager.getCredentials().then((credentials) => {
      this.setState({
        username: !credentials.username ? "" : credentials.username,
        password: !credentials.password ? "" : credentials.password
      });
    });
  }

  componentWillUnmount() {
    const { keyboardShowSub, keyboardHideSub } = this.state;
    keyboardShowSub.remove();
    keyboardHideSub.remove();
  }

  keyboardDidShow = () => {
    // eslint-disable-next-line
    Animated.timing(this.state.imageHeight, {
      duration: 350,
      toValue: imageMin
    }).start();
  };

  keyboardDidHide = () => {
    // eslint-disable-next-line
    Animated.timing(this.state.imageHeight, {
      duration: 350,
      toValue: imageMax
    }).start();
  };

  updateUsername = (text: string) => {
    this.setState({ username: text });
  };

  updatePassword = (text: string) => {
    this.setState({ password: text });
  };

  navigateToMain = () => {
    const { navigation } = this.props;
    navigation.navigate("Main");
  };

  handleLogin = () => {
    const { username, password } = this.state;
    this.setState({ error: "", loading: true });

    loginUser(username, password).then((error) => {
      if (error) {
        this.setState({ error, loading: false });
      } else {
        LoginManager.saveCredentials(username, password);
        this.setState({
          error: "",
          loading: false,
          loginSuccess: true
        });
        setTimeout(this.navigateToMain, 1000);
      }
    });
  };

  render() {
    const {
      loginSuccess, username, password, imageHeight, error, loading
    } = this.state;

    return (
      <View>
        <ImageBackground
          source={require("../../resource/images/background.jpeg")}
          style={{ width: "100%", height: "100%" }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.titleStyle}>E-BizIT Sales Mobility Solution™</Text>
            <View style={styles.imageContainer}>
              <Animated.Image
                source={require("../../resource/images/Network-diagram.png")}
                style={{ width: "90%", height: imageHeight }}
                resizeMode="contain"
              />
            </View>
            <LoginInput
              value={username}
              iconName="user"
              placeholder="Username"
              onChangeText={this.updateUsername}
              error={error}
              autoFocus={false}
            />
            <LoginInput
              value={password}
              iconName="lock"
              placeholder="Password"
              isPassword
              onChangeText={this.updatePassword}
              error={error}
              autoCapitalize="none"
              onSubmitEditing={this.handleLogin}
            />
            {error !== "" && <ErrorStatus errorText={error} />}
            <LoginButton onPress={this.handleLogin} loading={loading} loginSuccess={loginSuccess} />
          </View>
          <Footer />
        </ImageBackground>
      </View>
    );
  }
}
