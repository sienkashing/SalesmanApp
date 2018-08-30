// @flow
import React, { Component } from "react";
import { Root } from "native-base";
import RootNav from "./src/screens/Routes";

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Root>
        <RootNav />
      </Root>
    );
  }
}
