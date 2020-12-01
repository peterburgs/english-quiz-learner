/* eslint-disable react/display-name */
import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

// Import Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

// Import Screens
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import TopicScreen from "./src/screens/TopicScreen";
import AccountScreen from "./src/screens/AccountScreen";
import ShopScreen from "./src/screens/ShopScreen";

// Import Context
import { Provider as AuthProvider } from "./src/context/AuthContext";

import { setNavigator } from "./src/common/navigationRef";

// Topic Flow
const topicFlow = createStackNavigator({
  Topic: TopicScreen,
});
topicFlow.navigationOptions = () => {
  return {
    title: "Topics",
    tabBarIcon: <AntDesign name="book" size={26} color="black" />,
  };
};

// Account Flow
const accountFlow = createStackNavigator({
  Account: AccountScreen,
});
accountFlow.navigationOptions = () => {
  return {
    title: "Account",
    tabBarIcon: <Feather name="github" size={26} color="black" />,
  };
};

// Shop Flow
const shopFlow = createStackNavigator({
  Shop: ShopScreen,
});
shopFlow.navigationOptions = () => {
  return {
    title: "Shop",
    tabBarIcon: (
      <Feather name="shopping-cart" size={24} color="black" />
    ),
  };
};

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  mainFlow: createBottomTabNavigator({
    topicFlow,
    accountFlow,
    shopFlow,
  }),
});

// App
const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App
        ref={(navigator) => {
          setNavigator(navigator);
        }}
      />
    </AuthProvider>
  );
};
