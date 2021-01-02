console.disableYellowBox = true;

import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
} from "react-native";
import { NavigationEvents, SafeAreaView } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm/AuthForm";
import NavLink from "../components/AuthForm/NavLink";
import { ScrollView } from "react-native";
import { KeyboardAvoidingView } from "react-native";

// Get Width & Height
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
const screenWeight =
  HEIGHT > WIDTH ? HEIGHT / WIDTH : (WIDTH * 2) / HEIGHT;
// App
const SignupScreen = () => {
  const { state, signup, clearErrorMessage } = useContext(
    AuthContext
  );

  return (
    <SafeAreaView
      forceInset={{ top: "always" }}
      style={styles.container}
    >
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <Text style={styles.appName}> English Quiz</Text>
      <AuthForm
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signup}
        isLoading={state.isLoading}
        isTouchable={state.isTouchable}
        style={styles.authForm}
      />
      <NavLink
        routeName="Signin"
        text="Already had an account? Sign in instead!"
        style={styles.navLink}
      />
      <ImageBackground
        source={require("../../assets/signup-bg.png")}
        resizeMode="contain"
        style={styles.footageImage}
      />
    </SafeAreaView>
  );
};

// Navigation Options
SignupScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
  footageImage: {
    alignSelf: "center",
    justifyContent: "center",
    position: "absolute",
    top: HEIGHT - screenWeight * (HEIGHT / 8),
    height: screenWeight * (HEIGHT / 8),
    width: WIDTH,
    maxWidth: WIDTH,
    zIndex: 0,
    elevation: 0,
  },
  authForm: { zIndex: 1, elevation: 1 },
  navLink: { zIndex: 1, elevation: 1 },
  backgroundContainer: {
    flex: 1,
    position: "absolute",
    height: HEIGHT,
    width: WIDTH,
  },
  appName: {
    color: "#d35d6e",
    fontSize: 50,
    fontWeight: "bold",
    opacity: 1,
    marginTop: HEIGHT / 7,
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default SignupScreen;
