import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
} from "react-native";

import { NavigationEvents, SafeAreaView } from "react-navigation";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context } from "../context/AuthContext";

// App
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
const SignInScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(Context);
  return (
    <SafeAreaView
      forceInset={{ top: "always" }}
      style={styles.container}
    >
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <View style={styles.backgroundContainer}>
        <View>
          <Text style={styles.appName}> English Quiz</Text>
        </View>
        <AuthForm
          headerText="Sign In to Your Account"
          errorMessage={state.errorMessage}
          onSubmit={signin}
          submitButtonText="Sign In"
          isTouchable={state.isTouchable}
          isLoading={state.isLoading}
        />

        <NavLink
          routeName="Signup"
          text="New to English Quiz? Sign up now!"
        />
        <ImageBackground
          source={require("../../assets/signin-bg.png")}
          style={styles.footageImage}
        />
      </View>
    </SafeAreaView>
  );
};

SignInScreen.navigationOptions = {
  header: () => false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footageImage: {
    position: "absolute",
    height: "55%",
    width: "95%",
    top: 0.65 * HEIGHT,
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

export default SignInScreen;
