import { createSwitchNavigator, createStackNavigator } from "react-navigation";
import { Login, Main, ProductSurvey } from "./index";

const AppStack = createStackNavigator({
  Main: { screen: Main },
  ProductSurvey: { screen: ProductSurvey }
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
