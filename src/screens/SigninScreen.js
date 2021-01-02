console.disableYellowBox = true;

import React, { useContext } from "react";
import { Image } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
} from "react-native";
import { NavigationEvents, SafeAreaView } from "react-navigation";
import AuthForm from "../components/AuthForm/AuthForm";
import NavLink from "../components/AuthForm/NavLink";
import { Context } from "../context/AuthContext";

// App
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const screenWeight =
  HEIGHT > WIDTH ? HEIGHT / WIDTH : (WIDTH * 2) / HEIGHT;
const SignInScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(Context);
  return (
    <SafeAreaView
      forceInset={{ top: "always" }}
      style={styles.container}
    >
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <View style={styles.backgroundContainer}>
        <Text
          style={styles.appName}
          adjustsFontSizeToFit={true}
          numberOfLines={1}
        >
          English Quiz
        </Text>
        <AuthForm
          headerText="Sign In to Your Account"
          errorMessage={state.errorMessage}
          onSubmit={signin}
          submitButtonText="Sign In"
          isTouchable={state.isTouchable}
          isLoading={state.isLoading}
          style={{ zIndex: 1 }}
        />

        <NavLink
          routeName="Signup"
          text="New to English Quiz? Sign up now!"
          style={{ zIndex: 1 }}
        />
        <Image
          source={require("../../assets/signin-bg.png")}
          style={styles.footageImage}
          resizeMode="contain"
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
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  footageImage: {
    alignSelf: "center",
    justifyContent: "center",
    zIndex: 0,
    position: "absolute",
    top: HEIGHT - screenWeight * (HEIGHT / 7),
    height: screenWeight * (HEIGHT / 7),
    maxWidth: WIDTH,
  },
  backgroundContainer: {
    flex: 1,
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

export default SignInScreen;
