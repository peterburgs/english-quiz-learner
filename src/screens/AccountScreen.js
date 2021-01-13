LogBox.ignoreAllLogs();
import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  LogBox,
} from "react-native";
import { Input } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import { Button, Snackbar } from "react-native-paper";
import color from "../common/color";
// Import Icons
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

// Device spec
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

// Context
import { Context } from "../context/AuthContext";
import { Context as UserContext } from "../context/UserContext";

// Components
import ResetPasswordModal from "../components/AccountScreen/ResetPasswordModal";
import AvatarModal from "../components/AccountScreen/AvatarModal";

const AccountScreen = () => {
  // Avatar Selection
  const avatar1 = require("../../assets/avatars/avatar1.png");
  const avatar2 = require("../../assets/avatars/avatar2.png");
  const avatar3 = require("../../assets/avatars/avatar3.png");
  const avatar4 = require("../../assets/avatars/avatar4.png");
  const avatar5 = require("../../assets/avatars/avatar5.png");
  const avatar6 = require("../../assets/avatars/avatar6.png");
  const avatar7 = require("../../assets/avatars/avatar7.png");
  const avatar8 = require("../../assets/avatars/avatar8.png");
  const avatar9 = require("../../assets/avatars/avatar9.png");

  const mapAvatar = (avatarUrl) => {
    switch (avatarUrl) {
      case "avatar1":
        return avatar1;
      case "avatar2":
        return avatar2;
      case "avatar3":
        return avatar3;
      case "avatar4":
        return avatar4;
      case "avatar5":
        return avatar5;
      case "avatar6":
        return avatar6;
      case "avatar7":
        return avatar7;
      case "avatar8":
        return avatar8;
      case "avatar9":
        return avatar9;
      default:
        return avatar1;
    }
  };

  const { signout } = useContext(Context);
  const { state, updateUser, clearUpdateUserMessage } = useContext(
    UserContext
  );

  const [fullName, setFullName] = useState("");
  const [createdAt, setCreatedAt] = useState(null);
  const [coin, setCoin] = useState(0);
  const [exp, setExp] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState("avatar2.png");
  const handleSignOut = () => {
    signout();
  };
  const handleSave = async () => {
    state.user.fullName = fullName;
    await updateUser(state.user);
  };
  // Toggle Reset Password Modal
  const [
    isResetPasswordModalVisible,
    setResetPasswordModalVisible,
  ] = useState(false);

  const toggleResetPasswordModal = async () => {
    setResetPasswordModalVisible(!isResetPasswordModalVisible);
  };
  // Toggle Avatar Modal
  const [
    isChangeAvatarModalVisible,
    setChangeAvatarModalVisible,
  ] = useState(false);

  const toggleChangeAvatar = async () => {
    setChangeAvatarModalVisible(!isChangeAvatarModalVisible);
  };
  // Use Effect

  useEffect(() => {
    if (state.user) {
      console.log(state.user);
      setFullName(state.user.fullName);
      setCreatedAt(new Date(state.user.createdAt));
      setCoin(state.user.coin);
      setExp(state.user.exp);
      setAvatarUrl(state.user.avatarUrl);
    }
  }, [state]);
  // Render
  return (
    <SafeAreaView
      forceInset={{ top: "always" }}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        {/* Blue background */}
        <View style={styles.background}></View>
        {/* User Image */}
        <View style={styles.userImageContainer}>
          <TouchableOpacity onPress={toggleChangeAvatar}>
            <Image
              // source={{ uri: `../../assets/avatars/${avatarUrl}` }}
              source={mapAvatar(avatarUrl)}
              style={styles.userImage}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
          <AvatarModal
            isModalVisible={isChangeAvatarModalVisible}
            toggleModal={toggleChangeAvatar}
          />
        </View>
      </View>
      <View style={styles.form}>
        {/* Join day */}
        {/* TODO: fetch Join day */}
        <Text style={styles.text}>
          Tham gia từ: {new Date(createdAt).toLocaleDateString()}
        </Text>
        {/* fullName: Input */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginEnd: 10,
          }}
        >
          <Input
            inputContainerStyle={styles.input}
            placeholder="Full name"
            placeholderTextColor="#686d76"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={30}
            underlineColorAndroid="transparent"
          />
          {/* Save */}
          <TouchableOpacity
            style={{ alignSelf: "flex-start", marginTop: 10 }}
            onPress={handleSave}
          >
            <FontAwesome name="check" size={30} color="green" />
          </TouchableOpacity>
        </View>
        <Text style={{ ...styles.text, color: "black" }}>
          Thống kê
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {/* Exp */}
          <View style={styles.box}>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="star-face"
                size={33}
                color="#29c7ac"
              />
              <Text
                style={{
                  alignSelf: "center",
                  fontWeight: "bold",
                  color: "#29c7ac",
                }}
              >
                {/* fetch data here */}&nbsp;&nbsp;{exp}
              </Text>
            </View>
          </View>
          {/* Coin */}
          <View style={styles.box}>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome5
                name="piggy-bank"
                size={30}
                color="#ffa41b"
              />
              <Text
                style={{
                  alignSelf: "center",
                  fontWeight: "bold",
                  color: "#ffa41b",
                  marginLeft: 5,
                }}
              >
                &nbsp;&nbsp;{coin}
              </Text>
            </View>
          </View>
        </View>
        {/* Reset password */}
        <ResetPasswordModal
          isModalVisible={isResetPasswordModalVisible}
          toggleModal={toggleResetPasswordModal}
        />
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: color.blue,
            marginTop: 20,
          }}
          onPress={toggleResetPasswordModal}
        >
          <Text style={styles.buttonText}>ĐỔI MẬT KHẨU</Text>
        </TouchableOpacity>
        {/* Signout */}
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: color.red }}
          onPress={handleSignOut}
        >
          <Text style={styles.buttonText}>ĐĂNG XUẤT</Text>
        </TouchableOpacity>
      </View>
      <Snackbar
        visible={state.updateUserSuccessMessage}
        onDismiss={() => clearUpdateUserMessage()}
        action={{
          label: "Close",
          onPress: () => {
            clearUpdateUserMessage();
          },
        }}
        style={{
          backgroundColor: color.blue,
          marginBottom: 60,
          elevation: 10,
        }}
      >
        <View>
          <Text style={{ color: "white" }}>
            {state.updateUserSuccessMessage}
          </Text>
        </View>
      </Snackbar>
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: {
    backgroundColor: color.blue,
    height: 150,
  },
  header: {
    height: 240,
  },
  form: {
    marginHorizontal: 20,
  },
  text: {
    alignSelf: "center",
    fontSize: 18,
    color: color.activeTintColor,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: "#495464",
  },
  imageBackground: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  button: {
    width: WIDTH * 0.9,
    height: 45,
    borderRadius: 20,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  userImageContainer: {
    height: 5 + WIDTH / 3,
    width: 5 + WIDTH / 3,
    borderRadius: WIDTH / 3,
    backgroundColor: "white",
    borderWidth: 0,
    elevation: 5,
    alignSelf: "center",
    top: 80,
    position: "absolute",
    justifyContent: "center",
  },
  userImage: {
    aspectRatio: 0.9,
    resizeMode: "contain",
    alignSelf: "center",
    height: WIDTH / 3,
    width: WIDTH / 3,
    borderRadius: WIDTH / 3,
    overflow: "hidden",
    alignSelf: "center",
    marginTop: 2,
  },
  input: {
    fontSize: 10,
    height: 50,
    width: "100%",
    marginLeft: 20,
    marginRight: 10,
    borderRadius: 23,
    alignSelf: "center",
    alignItems: "center",
    color: "#050505",
    backgroundColor: "#e8e8e8",
    borderWidth: 0,
    borderColor: "transparent",
    paddingLeft: 15,
    paddingRight: 5,
  },
  box: {
    borderWidth: 1,
    borderColor: "#a6a9b6",
    width: WIDTH * 0.4,
    padding: 10,
    borderRadius: 15,
  },
});
