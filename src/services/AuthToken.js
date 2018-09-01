// @flow
import { AsyncStorage } from "react-native";
import moment from "moment";
import ErrorToast from "app/components/common/ErrorToast";

// should match api token info
export const TOKEN_KEY = "token";
export const TOKEN_EXPIRE_DATE = "exp";

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
  },
  async authenticationToken() {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);

      return {
        Authentication: `Bearer ${token}`
      };
    } catch (error) {
      ErrorToast(error);
      return null;
    }
  }
};

export default AuthToken;
