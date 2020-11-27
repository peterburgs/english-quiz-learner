import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
} from "react-native";

import { NavigationEvents } from "react-navigation";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context } from "../context/AuthContext";

// App
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
const SignInScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(Context);
  return (
    <SafeAreaView style={styles.container}>
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
        />

        <NavLink
          routeName="Signup"
          text="New to English Quiz? Sign up now!"
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
    height: "50%",
    width: "100%",
    top: 0.707 * HEIGHT,
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
  form: {
    marginTop: 50,
  },
  input: {
    fontSize: 17,
    width: WIDTH - 20,
    height: 50,
    borderRadius: 23,
    paddingLeft: 45,
    alignSelf: "center",
    color: "#050505",
    marginBottom: 15,
    backgroundColor: "#e8e8e8",
  },
  icon: {
    position: "absolute",
    top: 9,
    left: 20,
  },
  showPassword: {
    position: "absolute",
    top: 9,
    right: 30,
  },
  buttonSignUp: {
    fontSize: 21,
    width: WIDTH / 2.5,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#3282b8",
    color: "white",
    alignSelf: "center",
    textAlignVertical: "center",
    textAlign: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});

export default SignInScreen;
