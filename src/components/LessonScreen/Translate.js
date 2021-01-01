import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
} from "react-native";

// Import color
import color from "../../common/color";

// Device spec
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const Translate = () => {
  return (
    <View style={styles.textAreaContainer}>
      <TextInput
        style={styles.textArea}
        underlineColorAndroid="transparent"
        placeholderTextColor="grey"
        numberOfLines={10}
        multiline={true}
        placeholder={"Nhập câu trả lời..."}
      />
    </View>
  );
};

export default Translate;

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: color.lightGrey,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    flex: 1,
    marginBottom: 50,
    backgroundColor: "#F6F6F6",
  },
  textArea: {
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    textAlignVertical: "top",
  },
});
