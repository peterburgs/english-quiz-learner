import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Alert,
} from "react-native";
import { Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import PropTypes from "prop-types";
import { PacmanIndicator } from "react-native-indicators";

// Device spec
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const screenWeight =
  HEIGHT > WIDTH ? HEIGHT / WIDTH : (WIDTH * 2) / HEIGHT;

const AuthForm = ({
  errorMessage,
  onSubmit,
  submitButtonText,
  isLoading,
  isTouchable,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(true);
  const [pwIconName, setPwIconName] = useState("ios-eye-off");
  const toggleViewPassword = () => {
    console.log(WIDTH);
    setViewPassword((viewPassword) => !viewPassword);
    setPwIconName((pwIconName) => {
      return pwIconName == "ios-eye" ? "ios-eye-off" : "ios-eye";
    });
  };
  const validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      setEmail(text);
      return false;
    } else {
      setEmail(text);
      console.log("Email is in correct form");
      return true;
    }
  };

  // Validate inputs
  const validateInput = () => {
    if (!email) {
      Alert.alert(
        "Missing Email",
        "You must enter email to continue.",
        [
          {
            text: "Understood",
            onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: false }
      );
    } else if (!validate(email)) {
      Alert.alert(
        "Invalid Email",
        "Invalid email format. Please try again!",
        [
          {
            text: "Understood",
            onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: false }
      );
    } else if (!password) {
      Alert.alert(
        "Missing password",
        "You must enter password to continue.",
        [
          {
            text: "Understood",
            onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: false }
      );
    } else {
      onSubmit({ email, password });
    }
  };
  return (
    <>
      <View style={styles.container}>
        {/* Email */}
        <View>
          <Input
            leftIcon={
              <MaterialIcons
                name="person-outline"
                size={28}
                color="#888888"
                style={{ paddingRight: 10 }}
              />
            }
            inputContainerStyle={styles.input}
            placeholder="Email"
            placeholderTextColor="#686d76"
            value={email}
            onChangeText={validate}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={30}
            underlineColorAndroid="transparent"
          />
        </View>

        {/* Password */}
        <View>
          <Input
            leftIcon={
              <Feather
                name="lock"
                size={24}
                color="#888888"
                style={{ paddingRight: 10 }}
              />
            }
            rightIcon={
              <TouchableOpacity onPress={toggleViewPassword}>
                <Ionicons
                  name={pwIconName}
                  size={26}
                  color="#888888"
                />
              </TouchableOpacity>
            }
            inputContainerStyle={styles.input}
            placeholder="Password"
            placeholderTextColor="#686d76"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
            secureTextEntry={viewPassword}
          />
        </View>
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => validateInput()}
          disabled={isTouchable}
        >
          {isLoading == true ? (
            <PacmanIndicator
              hidesWhenStopped={true}
              animating={isLoading}
              color="#eeeded"
            />
          ) : (
            <Text style={styles.submitButtonText}>
              {submitButtonText}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  submitButton: {
    backgroundColor: "#07689f",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: screenWeight * 90,
    height: 50,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 19,
    alignSelf: "center",
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginBottom: 15,
    marginHorizontal: 10,
    alignSelf: "center",
  },

  input: {
    fontSize: 17,
    width: WIDTH / 1.15,
    height: 50,
    maxWidth: 400,
    maxHeight: 70,
    borderRadius: 23,
    alignSelf: "center",
    alignItems: "center",
    color: "#050505",
    backgroundColor: "#e8e8e8",
    borderWidth: 0,
    borderColor: "transparent",
    paddingHorizontal: 10,
  },

  showPassword: {
    position: "absolute",
    top: 200,
    right: 30,
  },
});

export default AuthForm;
