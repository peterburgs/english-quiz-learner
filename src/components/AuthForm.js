import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import Spacer from "./Spacer";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import PropTypes from "prop-types";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const AuthForm = ({ errorMessage, onSubmit, submitButtonText }) => {
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
        <Spacer>
          <Button
            icon={<Icon name="arrow-right" size={15} color="white" />}
            iconLeft
            buttonStyle={{
              width: WIDTH / 3,
              alignSelf: "center",
              borderRadius: 20,
            }}
            containerStyle={{ marginHorizontal: 5 }}
            color="#0278ae"
            disabledStyle={{
              borderWidth: 2,
              borderColor: "#00F",
            }}
            disabledTitleStyle={{ color: "#00F" }}
            loadingProps={{ animating: true }}
            title={" " + submitButtonText}
            // onPress={() => onSubmit({ email, password })}
            onPress={() => console.log("click")}
          />
        </Spacer>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15,
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
