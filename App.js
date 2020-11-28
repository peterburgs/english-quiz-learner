/* eslint-disable react/display-name */
import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Feather } from "@expo/vector-icons";

// Import Screens
import SignupScreen from "./src/screens/SignapScreen";
import SigninScreen from "./src/screens/SigninScreen";
import HomeScreen from "./src/screens/HomeScreen";
// Import Context
import { Provider as AuthProvider } from "./src/context/AuthContext";

import { setNavigator } from "./src/common/navigationRef";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";

const homeFlow = createStackNavigator({ Home: HomeScreen });

homeFlow.navigationOptions = {
  title: "Tracks",
  tabBarIcon: <Feather name="map-pin" size={24} color="black" />,
};

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  mainFlow: createBottomTabNavigator({
    homeFlow,
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
