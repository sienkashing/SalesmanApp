// @flow
import { Configuration, Client } from "bugsnag-react-native";

const configuration = new Configuration();
const client = new Client(); // eslint-disable-line

configuration.notifyReleaseStages = ["production"];
configuration.releaseStage = "dev";
export default client;
