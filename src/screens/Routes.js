import { createSwitchNavigator, createStackNavigator } from "react-navigation";
import NewScreen from "./NewScreen";
import { Login, Main } from "./index";

const AppStack = createStackNavigator({
  Main: { screen: Main },
  NewScreen: { screen: NewScreen }
});

const RootNav = createSwitchNavigator(
  {
    Login: { screen: Login },
    Main: AppStack
  },
  {
    initialRouteName: "Main"
  }
);

export default RootNav;
