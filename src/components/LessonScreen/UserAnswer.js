import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";

// Import Single Selection
import SingleSelection from "./SingleSelection";
import Translate from "./Translate";
import Arrange from "./Arrange";

// Device spec
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const handleCheck = () => {
  console.log("Checked!");
};
const UserAnswer = ({ questionType }) => {
  return (
    <View style={styles.container}>
      <SingleSelection />
    </View>
  );
};

export default UserAnswer;

const styles = StyleSheet.create({
  container: {
    paddingTop: HEIGHT * 0.02,
    width: "100%",
    height: HEIGHT * 0.63,
    // borderColor: "green",
    // borderWidth: 2,
  },
});
