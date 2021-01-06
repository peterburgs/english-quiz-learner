import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
// Modal
import Modal from "react-native-modal";
import color from "../../common/color";
import { PacmanIndicator } from "react-native-indicators";

// Context
import { Context as UserContext } from "../../context/UserContext";

// Device spec
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const ResetPasswordModal = ({ isModalVisible, toggleModal }) => {
  const { state, resetPassword } = useContext(UserContext);

  // Current Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [viewCurrentPassword, setViewCurrentPassword] = useState(
    true
  );
  const [currentIcon, setCurrentIcon] = useState("ios-eye-off");
  const toggleViewCurrentPassword = () => {
    setViewCurrentPassword((viewPassword) => !viewPassword);
    setCurrentIcon((currentIcon) => {
      return currentIcon == "ios-eye" ? "ios-eye-off" : "ios-eye";
    });
  };
  // New Password
  const [newPassword, setNewPassword] = useState("");
  const [viewNewPassword, setViewNewPassword] = useState(true);
  const [newIcon, setNewIcon] = useState("ios-eye-off");
  const toggleViewNewPassword = () => {
    setViewNewPassword((viewNewPassword) => !viewNewPassword);
    setNewIcon((newIcon) => {
      return newIcon == "ios-eye" ? "ios-eye-off" : "ios-eye";
    });
  };

  // Function to handle reset password

  const handleSubmit = async () => {
    if (currentPassword && newPassword) {
      await resetPassword(currentPassword, newPassword);
    }
  };
  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalVisible}
        animationIn={"fadeInDown"}
        animationOut={"slideOutDown"}
        animationInTiming={500}
        animationOutTiming={500}
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={500}
        onBackdropPress={toggleModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Đổi mật khẩu</Text>
            {/* Current Password */}
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
                  <TouchableOpacity
                    onPress={toggleViewCurrentPassword}
                  >
                    <Ionicons
                      name={currentIcon}
                      size={26}
                      color="#888888"
                    />
                  </TouchableOpacity>
                }
                inputContainerStyle={styles.input}
                placeholder="Current Password"
                placeholderTextColor="#686d76"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={20}
                secureTextEntry={viewCurrentPassword}
              />
            </View>

            {/* New Password */}
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
                  <TouchableOpacity onPress={toggleViewNewPassword}>
                    <Ionicons
                      name={newIcon}
                      size={26}
                      color="#888888"
                    />
                  </TouchableOpacity>
                }
                inputContainerStyle={styles.input}
                placeholder="New Password"
                placeholderTextColor="#686d76"
                value={newPassword}
                onChangeText={setNewPassword}
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={20}
                secureTextEntry={viewNewPassword}
              />
            </View>
            {state.errorMessage ? (
              <Text style={styles.errorMessage}>
                {state.errorMessage}
              </Text>
            ) : null}
            {state.resetPasswordSuccessMessage ? (
              <Text style={styles.successMessage}>
                {state.resetPasswordSuccessMessage}
              </Text>
            ) : null}
            <View style={{ flexDirection: "row" }}>
              {/* Confirm Change Password */}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                {state.isLoading == true ? (
                  <PacmanIndicator
                    hidesWhenStopped={true}
                    animating={state.isLoading}
                    color="#eeeded"
                  />
                ) : (
                  <Text style={styles.submitButtonText}>
                    XÁC NHẬN
                  </Text>
                )}
              </TouchableOpacity>

              {/* Cancel Change Password */}
              <TouchableOpacity
                style={{
                  ...styles.submitButton,
                  backgroundColor: color.red,
                }}
                onPress={toggleModal}
              >
                <Text style={styles.submitButtonText}>ĐÓNG</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ResetPasswordModal;

const styles = StyleSheet.create({
  container: { flex: 1 },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: WIDTH * 0.95,
    maxWidth: WIDTH * 0.95,
    minHeight: HEIGHT * 0.2,
    maxHeight: HEIGHT * 0.6,
  },
  modalText: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
  },
  modalTitle: { fontSize: 25, fontWeight: "bold", marginBottom: 30 },
  resultText: {
    textAlign: "center",
    fontSize: 15,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#07689f",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: WIDTH * 0.3,
    height: 45,
    marginHorizontal: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    alignSelf: "center",
  },
  input: {
    fontSize: 15,
    width: WIDTH * 0.9,
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
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginBottom: 10,
    marginHorizontal: 10,
    alignSelf: "center",
  },
  successMessage: {
    fontSize: 16,
    color: "green",
    marginBottom: 10,
    marginHorizontal: 10,
    alignSelf: "center",
  },
});
