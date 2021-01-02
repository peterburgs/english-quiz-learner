import React from "react";

import { Dimensions, StyleSheet } from "react-native";
import {
  createAppContainer,
  createSwitchNavigator,
} from "react-navigation";
import color from "./src/common/color";
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
import LessonScreen from "./src/screens/LessonScreen";
import FinishScreen from "./src/screens/FinishScreen";
import CommentScreen from "./src/screens/CommentScreen";

// Import Context
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as UserProvider } from "./src/context/UserContext";
import { Provider as LevelProvider } from "./src/context/LevelContext";
import { Provider as LessonProvider } from "./src/context/LessonContext";

import { setNavigator } from "./src/common/navigationRef";

// Get Device Height & Width
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

// Topic Flow
const topicFlow = createStackNavigator({
  Topic: TopicScreen,
});
topicFlow.navigationOptions = () => {
  return {
    title: "Topic",
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

// Styles
const styles = StyleSheet.create({
  tabBarOptions: {
    borderTopColor: "transparent",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "#222831",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 10,
    backgroundColor: color.tabBarBackgroundColor,
    position: "absolute",
    bottom: 1,
    padding: 10,
    width: WIDTH,
    height: 54,
  },
});

const switchNavigator = createSwitchNavigator(
  {
    ResolveAuth: ResolveAuthScreen,
    loginFlow: createStackNavigator(
      {
        Signin: SigninScreen,
        Signup: SignupScreen,
      },
      { initialRouteName: "Signin" }
    ),
    lessonFlow: createStackNavigator(
      {
        Lesson: LessonScreen,
        Comment: CommentScreen,
        Finish: FinishScreen,
      },
      { initialRouteName: "Lesson" }
    ),
    mainFlow: createBottomTabNavigator(
      { topicFlow, accountFlow, shopFlow },

      {
        tabBarOptions: {
          //activeBackgroundColor: "tomato",
          activeTintColor: color.activeTintColor,
          // inactiveBackgroundColor: "#eee",
          inactiveTintColor: color.inactiveTintColor,
          style: styles.tabBarOptions,
        },
        initialRouteName: "topicFlow",
      }
    ),
  },
  { initialRouteName: "ResolveAuth" }
);

// App
const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <NavigationContainer theme={myTheme}>
      <AuthProvider>
        <UserProvider>
          <LevelProvider>
            <LessonProvider>
              <App
                ref={(navigator) => {
                  setNavigator(navigator);
                }}
              />
            </LessonProvider>
          </LevelProvider>
        </UserProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};
