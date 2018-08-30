// @flow
import { AsyncStorage } from "react-native";
import moment from "moment";
import ErrorToast from "../components/common/ErrorToast";

// should match api token info
const TOKEN_KEY = "token";
const TOKEN_EXPIRE_DATE = "exp";

const AuthToken = {
  async saveTokenInfo(tokenObj: Object) {
    try {
      await AsyncStorage.multiSet([
        [TOKEN_KEY, tokenObj[TOKEN_KEY]],
        [TOKEN_EXPIRE_DATE, tokenObj[TOKEN_EXPIRE_DATE]]
      ]);
    } catch (error) {
      ErrorToast(error);
    }
  },
  async checkIfTokenExpire() {
    try {
      const expireDate = await AsyncStorage.getItem(TOKEN_EXPIRE_DATE);
      return expireDate ? moment(expireDate) < moment() : true;
    } catch (error) {
      ErrorToast(error);
      return true;
    }
  },
  async deleteToken() {
    try {
      await AsyncStorage.multiRemove([TOKEN_KEY, TOKEN_EXPIRE_DATE]);
    } catch (error) {
      ErrorToast(error);
    }
  }
};

export default AuthToken;
