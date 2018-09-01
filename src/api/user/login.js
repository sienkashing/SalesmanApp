// @flow
import axios from "axios";
import AuthToken, { TOKEN_KEY } from "app/services/AuthToken";
import bugsnag from "app/bugsnag/client";
import ROOT_URL from "../const";

const loginUser = async (username: string, password: string) => axios
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
    let error = "";
    if (response.data[TOKEN_KEY]) {
      AuthToken.saveTokenInfo(response.data);
    } else {
      error = "Whoops! There was a problem at the server.";
    }
    return error;
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

export default loginUser;
