import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import NavLink from "../components/NavLink";

// App
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
const SignUpScreen = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [pwIconName, setPwIconName] = useState("ios-eye");

  const toggleViewPassword = () => {
    setViewPassword((viewPassword) => !viewPassword);
    setPwIconName((pwIconName) => {
      return pwIconName == "ios-eye" ? "ios-eye-off" : "ios-eye";
    });
  };

  const [viewConfirmPassword, setViewConfirmPassword] = useState(
    false
  );
  const [confirmPwIconName, setConfirmPwIconName] = useState(
    "ios-eye"
  );

  const toggleViewConfirmPassword = () => {
    setViewConfirmPassword(
      (viewConfirmPassword) => !viewConfirmPassword
    );
    setConfirmPwIconName((confirmPwIconName) => {
      return confirmPwIconName == "ios-eye"
        ? "ios-eye-off"
        : "ios-eye";
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundContainer}>
        <View>
          <Text style={styles.appName}> English Quiz</Text>
        </View>
        {/* SignUp Form */}
        <View style={styles.form}>
          {/* Email */}
          <View>
            <MaterialIcons
              name="person-outline"
              size={28}
              color="#222831"
              style={styles.icon}
            />
            <TextInput
              placeholder={"Email"}
              style={styles.input}
              placeholderTextColor={"#686d76"}
              opacity={0.7}
              maxLength={30}
              underlineColorAndroid="transparent"
            />
          </View>
          {/* Password */}
          <View>
            <Feather
              name="lock"
              size={26}
              color="#222831"
              style={styles.icon}
            />
            <TextInput
              placeholder={"Password"}
              style={styles.input}
              placeholderTextColor={"#686d76"}
              underlineColorAndroid="transparent"
              opacity={0.7}
              maxLength={20}
              secureTextEntry={viewPassword}
            />
            <TouchableOpacity
              style={styles.showPassword}
              onPress={toggleViewPassword}
            >
              <Ionicons name={pwIconName} size={26} color="#888888" />
            </TouchableOpacity>
          </View>
          {/* Confirm Password */}
          <View>
            <Feather
              name="lock"
              size={26}
              color="#222831"
              style={styles.icon}
            />

            <TextInput
              placeholder={"Confirm Password"}
              style={styles.input}
              placeholderTextColor={"#686d76"}
              underlineColorAndroid="transparent"
              opacity={0.7}
              secureTextEntry={viewConfirmPassword}
              maxLength={20}
            />
            <TouchableOpacity
              style={styles.showPassword}
              onPress={toggleViewConfirmPassword}
            >
              <Ionicons
                name={confirmPwIconName}
                size={24}
                color="#888888"
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Button Sign Up */}
        <View>
          <TouchableOpacity>
            <Text style={styles.buttonSignUp} textAlign={"center"}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <NavLink
          routeName="Signin"
          text="Already have an account? Sign in instead!"
        />
      </View>
      <ImageBackground
        source={require("../../assets/footageImage.jpg")}
        style={styles.footageImage}
      />
    </SafeAreaView>
  );
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

export default SignUpScreen;
