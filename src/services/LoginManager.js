// @flow
import { AsyncStorage } from "react-native";

const USERNAME = "username";
const PASSWORD = "password";

const LoginManager = {
  async saveCredentials(username: string, password: string) {
    try {
      await AsyncStorage.multiSet([[USERNAME, username], [PASSWORD, password]]);
    } catch (error) {
      // nothing
    }
  },
  async getCredentials() {
    try {
      const results = await AsyncStorage.multiGet([USERNAME, PASSWORD]);
      return {
        username: results[0][1],
        password: results[1][1]
      };
    } catch (error) {
      return {};
    }
  }
};

export default LoginManager;
