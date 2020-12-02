/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";

import { Dimensions } from "react-native";
import {
  createAppContainer,
  createSwitchNavigator,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { NavigationContainer } from "@react-navigation/native";
import myTheme from "./src/common/navigationTheme";
// Import Icons
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

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

// Get Device Height & Width
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

// Topic Flow
const topicFlow = createStackNavigator({
  Topic: TopicScreen,
});
topicFlow.navigationOptions = () => {
  return {
    title: "Topics",
    tabBarIcon: ({ tintColor }) => (
      <AntDesign name="book" size={26} color={tintColor} />
    ),
  };
};

// Account Flow
const accountFlow = createStackNavigator({
  Account: AccountScreen,
});
accountFlow.navigationOptions = () => {
  return {
    title: "Account",
    tabBarIcon: ({ tintColor }) => (
      <Feather name="github" size={26} color={tintColor} />
    ),
  };
};

// Shop Flow
const shopFlow = createStackNavigator({
  Shop: ShopScreen,
});
shopFlow.navigationOptions = () => {
  return {
    title: "Shop",
    tabBarIcon: ({ tintColor }) => (
      <Feather name="shopping-cart" size={24} color={tintColor} />
    ),
  };
};

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  mainFlow: createBottomTabNavigator(
    {
      topicFlow,
      accountFlow,
      shopFlow,
    },
    {
      tabBarOptions: {
        //activeBackgroundColor: "tomato",
        activeTintColor: "#ea2c62",
        // inactiveBackgroundColor: "#eee",
        inactiveTintColor: "#bbbbbb",
        style: {
          borderTopColor: "transparent",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: "#e8e8e8",
          position: "absolute",
          bottom: 0,
          padding: 10,
          width: WIDTH,
          height: 54,
        },
      },
    }
  ),
});

// App
const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <NavigationContainer theme={myTheme}>
      <AuthProvider>
        <App
          ref={(navigator) => {
            setNavigator(navigator);
          }}
        />
      </AuthProvider>
    </NavigationContainer>
  );
};
