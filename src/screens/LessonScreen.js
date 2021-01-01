import React, { useContext } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { Context } from "../context/AuthContext";

//Device spec
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

// Import components
import Header from "../components/LessonScreen/Header";
import QuestionText from "../components/LessonScreen/QuestionText";
import UserAnswer from "../components/LessonScreen/UserAnswer";
// LessonScreen
const LessonScreen = ({ navigation }) => {
  //TODO: use topicId & lessonOrder
  const topicId = navigation.getParam("topicId");
  const lessonOrder = navigation.getParam("lessonOrder");
  const handleCheck = () => {
    console.log("Checked!");
  };

  return (
    <SafeAreaView
      forceInset={{ top: "always" }}
      style={styles.container}
    >
      {/* TODO: modify Header params */}
      <Header
        progress={0.6}
        currentQuestion={6}
        totalQuestion={10}
        navigation={navigation}
      />

      {/* TODO: modify Question Text params */}
      <QuestionText
        questionRequirement={"Dịch câu này:"}
        questionText={"An apple"}
        imageUrl={
          "https://image.freepik.com/free-photo/close-up-fresh-apple_144627-14640.jpg"
        }
      />
      <UserAnswer />
      {/* TODO: modify background color of opacity */}
      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: "#2488DC" }}
        onPress={handleCheck}
      >
        {/* TODO: modify background color of text */}
        <Text style={styles.buttonText}>KIỂM TRA</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

LessonScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

export default LessonScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    flex: 1,
    minHeight: HEIGHT,
  },
  button: {
    width: WIDTH * 0.9,
    height: 45,
    borderRadius: 20,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    bottom: 5,
    position: "absolute",
  },
  buttonText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#fff",
  },
});
