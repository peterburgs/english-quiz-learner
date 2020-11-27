import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import { Text, Button, Input } from "react-native-elements";
import Spacer from "./Spacer";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const AuthForm = ({ errorMessage, onSubmit, submitButtonText }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [pwIconName, setPwIconName] = useState("ios-eye");

  const toggleViewPassword = () => {
    setViewPassword((viewPassword) => !viewPassword);
    setPwIconName((pwIconName) => {
      return pwIconName == "ios-eye" ? "ios-eye-off" : "ios-eye";
    });
  };

  return (
    <>
      <View>
        {/* Email */}
        <MaterialIcons
          name="person-outline"
          size={28}
          color="#222831"
          style={styles.icon}
        />
        <Input
          style={styles.input}
          label="Email"
          labelStyle={{ color: "#686d76" }}
          value={email}
          opacity={0.7}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
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
        <Input
          label="Password"
          labelStyle={{ color: "#686d76" }}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
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

      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          title={submitButtonText}
          onPress={() => onSubmit({ email, password })}
        />
      </Spacer>
      <ImageBackground
        source={require("../../assets/footageImage.jpg")}
        style={styles.footageImage}
      />
    </>
  );
};

const styles = StyleSheet.create({
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

export default AuthForm;
