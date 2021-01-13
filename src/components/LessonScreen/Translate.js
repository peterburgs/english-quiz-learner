import React, { useState, useContext } from "react";
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

// Context
import { Context as LessonContext } from "../../context/LessonContext";

const Translate = () => {
  const { state: lessonState, setTranslateAnswer } = useContext(
    LessonContext
  );

  return (
    <View style={styles.textAreaContainer}>
      <TextInput
        autoFocus={true}
        style={styles.textArea}
        underlineColorAndroid="transparent"
        placeholderTextColor="grey"
        numberOfLines={10}
        multiline={true}
        placeholder={"Nhập câu trả lời..."}
        onChangeText={(text) => {
          setTranslateAnswer(text);
        }}
        value={lessonState.translateAnswer}
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
    fontSize: 16,
  },
});
