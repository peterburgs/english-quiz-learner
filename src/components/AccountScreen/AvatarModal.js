import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

// Color
import color from "../../common/color";
// Modal
import Modal from "react-native-modal";

// Device spec
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const AvatarModal = ({ isModalVisible, toggleModal }) => {
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
            <Text style={styles.modalTitle}>Đổi Avatar</Text>

            {/* Images*/}
            <View style={{ flexDirection: "row" }}>
              {/* Image 1 */}
              <Image
                source={require("../../../assets/avatars/avatar1.png")}
                style={styles.image}
                resizeMode={"contain"}
              />
              {/* Image 2 */}
              <Image
                source={require("../../../assets/avatars/avatar2.png")}
                style={styles.image}
                resizeMode={"contain"}
              />
              {/* Image 3 */}
              <Image
                source={require("../../../assets/avatars/avatar3.png")}
                style={styles.image}
                resizeMode={"contain"}
              />
            </View>
            {/* Images*/}
            <View style={{ flexDirection: "row" }}>
              {/* Image 4 */}
              <Image
                source={require("../../../assets/avatars/avatar4.png")}
                style={styles.image}
                resizeMode={"contain"}
              />
              {/* Image 5 */}
              <Image
                source={require("../../../assets/avatars/avatar5.png")}
                style={styles.image}
                resizeMode={"contain"}
              />
              {/* Image 6 */}
              <Image
                source={require("../../../assets/avatars/avatar6.png")}
                style={styles.image}
                resizeMode={"contain"}
              />
            </View>
            {/* Images*/}
            <View style={{ flexDirection: "row" }}>
              {/* Image 7 */}
              <Image
                source={require("../../../assets/avatars/avatar7.png")}
                style={styles.image}
                resizeMode={"contain"}
              />
              {/* Image 8 */}
              <Image
                source={require("../../../assets/avatars/avatar8.png")}
                style={styles.image}
                resizeMode={"contain"}
              />
              {/* Image 9 */}
              <Image
                source={require("../../../assets/avatars/avatar9.png")}
                style={styles.image}
                resizeMode={"contain"}
              />
            </View>
            <View style={styles.bottomBar}></View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AvatarModal;

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
    maxHeight: HEIGHT * 0.9,
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
    height: 40,
    marginHorizontal: 10,
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
  bottomBar: {
    flexDirection: "row",
    marginTop: 30,
  },
  image: {
    width: WIDTH * 0.25,
    marginHorizontal: 10,
  },
});
