console.disableYellowBox = true;
import React, { useContext, useState } from "react";
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
  // Mock data
  const [data, setData] = useState([
    {
      _id: 3,
      imageUrl: "",
      singleSelection: [],
      translate: [],
      arrange: [
        { word: "Một", order: 1, _id: 1 },
        { word: "nho", order: -1, _id: 4 },
        { word: "Hai", order: -1, _id: 5 },
        { word: "quả", order: 2, _id: 2 },
        { word: "táo", order: 3, _id: 3 },
      ],
      type: "arrange",
      questionText: "An apple",
      questionRequirement: "Sắp xếp các từ để tạo thành câu có nghĩa",
    },
    {
      _id: 1,
      imageUrl:
        "https://image.freepik.com/free-photo/close-up-fresh-apple_144627-14640.jpg",
      singleSelection: [
        { content: "Một quả táo", order: 1, isCorrect: true },
        { content: "Một quả cam", order: 2, isCorrect: false },
        { content: "Hai quả táo", order: 3, isCorrect: false },
        { content: "Một quả nho", order: 4, isCorrect: false },
      ],
      translate: [],
      arrange: [],
      type: "singleSelection",
      questionText: "An apple",
      questionRequirement: "Dịch câu này",
    },
    {
      _id: 2,
      imageUrl: "",
      singleSelection: [],
      translate: [{ content: "một quả táo" }],
      arrange: [],
      type: "translate",
      questionText: "An apple",
      questionRequirement: "Dịch câu này",
    },
  ]);
  const [submitData, setSubmitData] = useState([]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  //TODO: use topicId & lessonOrder
  const topicId = navigation.getParam("topicId");
  const lessonOrder = navigation.getParam("lessonOrder");
  const handleCheck = () => {
    console.log(data[2]);
    // TODO: bug with current question index, cannot setCurrent... if current index is 1 (only 0, and 1 available)
    if (currentQuestionIndex < data.length - 1) {
      console.log(currentQuestionIndex, data.length);
      setCurrentQuestionIndex((pre) => pre + 1);
    } else {
      // TODO: navigate to lesson screen when user finish all questions
      console.log("Finish");
      navigation.navigate("Finish");
    }
  };

  return (
    <SafeAreaView
      forceInset={{ top: "always" }}
      style={styles.container}
    >
      <Header
        progress={(currentQuestionIndex + 1) / data.length}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestion={data.length}
        navigation={navigation}
      />

      <QuestionText
        questionRequirement={
          data[currentQuestionIndex].questionRequirement
        }
        questionText={data[currentQuestionIndex].questionText}
        imageUrl={data[currentQuestionIndex].imageUrl}
      />
      <UserAnswer
        type={data[currentQuestionIndex].type}
        singleSelection={data[currentQuestionIndex].singleSelection}
        translate={data[currentQuestionIndex].translate}
        arrange={data[currentQuestionIndex].arrange}
      />
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
