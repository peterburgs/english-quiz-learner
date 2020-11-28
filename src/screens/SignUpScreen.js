import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { NavigationEvents } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

// Get Width & Height
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

// App
const SignupScreen = () => {
  const { state, signup, clearErrorMessage } = useContext(
    AuthContext
  );

  return (
    <SafeAreaView style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <Text style={styles.appName}> English Quiz</Text>
      <AuthForm
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signup}
      />
      <NavLink
        routeName="Signin"
        text="Already had an account? Sign in instead!"
      />
      <ImageBackground
        source={require("../../assets/signup-bg.png")}
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
    position: "absolute",
    height: "45%",
    width: "88%",
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    top: 0.7 * HEIGHT,
  },
  backgroundContainer: {
    flex: 1,
    position: "absolute",
    height: HEIGHT,
    width: WIDTH,
  },
  appName: {
    color: "#d35d6e",
    fontSize: 65,
    fontWeight: "bold",
    opacity: 1,
    marginTop: HEIGHT / 7,
  },
});

export default SignupScreen;
