import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import PropTypes from "prop-types";
import { PacmanIndicator } from "react-native-indicators";
const { width: WIDTH } = Dimensions.get("screen");

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
    setViewPassword((viewPassword) => !viewPassword);
    setPwIconName((pwIconName) => {
      return pwIconName == "ios-eye" ? "ios-eye-off" : "ios-eye";
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          {/* Email */}
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
            onChangeText={setEmail}
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
          onPress={() => onSubmit({ email, password })}
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
    width: WIDTH / 3,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
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
    width: WIDTH - 20,
    height: 50,
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
AuthForm.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string.isRequired,
};

export default AuthForm;
