import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import ProgressBar from "react-native-progress/Bar";
// Icon~
import { MaterialCommunityIcons } from "@expo/vector-icons";
// Color
import color from "../../common/color";
// Modal
import Modal from "react-native-modal";

// Device spec
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
// Header
const Header = ({
  navigation,
  progress,
  currentQuestion,
  totalQuestion,
}) => {
  // Toggle Modal
  const [isModalVisible, setModalVisible] = useState(false);

  // Toggle Modal visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>
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
              <Text style={styles.modalText}>
                Quit this lesson now?
              </Text>

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{
                    ...styles.openButton,
                    backgroundColor: color.blue,
                  }}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Topic");
                  }}
                  style={{
                    ...styles.openButton,
                    backgroundColor: color.red,
                  }}
                >
                  <Text style={styles.textStyle}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* Close Icon */}
        <TouchableOpacity
          onPress={() => {
            toggleModal();
          }}
        >
          <MaterialCommunityIcons
            name="close"
            size={26}
            color="#f8615a"
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* ProgressBar */}
        <ProgressBar
          progress={progress}
          width={WIDTH * 0.7}
          height={HEIGHT * 0.02}
          color={"#fe346e"}
          style={styles.progressBar}
          borderRadius={15}
        />
        <Text style={styles.text}>
          {currentQuestion}/{totalQuestion}
        </Text>
      </View>
      <View
        style={{
          borderBottomColor: "#dddddd",
          borderBottomWidth: 2,
          paddingTop: 5,
        }}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: HEIGHT * 0.06,
    paddingTop: 5,
  },
  row: {
    alignItems: "center",
    alignContent: "center",
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    alignContent: "space-around",
  },
  icon: {
    color: "#f8615a",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginRight: 10,
  },

  progressBar: { marginHorizontal: 10 },
  text: { marginLeft: 10, color: "#f8615a" },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 12,
    padding: 5,
    marginLeft: WIDTH / 60,
    marginRight: WIDTH / 60,
    elevation: 2,
    width: WIDTH / 5,
  },
});
