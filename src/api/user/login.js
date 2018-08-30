// @flow
import axios from "axios";
import bugsnag from "../../bugsnag/client";
import ROOT_URL from "../const";
import AuthToken from "../../services/AuthToken";

async function loginUser(username: string, password: string) {
  return axios
    .post(
      `${ROOT_URL}/login`,
      {},
      {
        headers: {
          jwtusername: username,
          jwtpassword: password
        }
      }
    )
    .then((response) => {
      AuthToken.saveTokenInfo(response.data);
      return null;
    })
    .catch((error) => {
      let errorText = "";

      switch (error.response.data.message) {
        case "Forbidden":
          errorText = "Invalid user credentials. Try again.";
          break;
        case "Username and password Required":
          errorText = "Username and Password Required";
          break;
        default:
          bugsnag.notify(error);
          errorText = "Server Error";
      }

      return errorText;
    });
}

export default loginUser;
