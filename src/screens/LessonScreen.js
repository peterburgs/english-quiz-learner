console.disableYellowBox = true;
import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-navigation";

// Context
import { Context } from "../context/AuthContext";
import { Context as LessonContext } from "../context/LessonContext";
// Modal
import Modal from "react-native-modal";

//Device spec
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

// Import components
import Header from "../components/LessonScreen/Header";
import QuestionText from "../components/LessonScreen/QuestionText";
import UserAnswer from "../components/LessonScreen/UserAnswer";
import color from "../common/color";

// Import Hooks
import useScoring from "../hooks/useScoring";

// LessonScreen
const LessonScreen = ({ navigation }) => {
  const { state, getQuestions } = useContext(LessonContext);
  const [scoring] = useScoring();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // ProgressBar
  const [progress, setProgress] = useState(0);

  //TODO: use topicId & lessonOrder
  const topicId = navigation.getParam("topicId");
  const lessonOrder = navigation.getParam("lessonOrder");

  // Handle when user press Check button
  const handleCheck = () => {
    if (currentQuestionIndex < state.questions.length - 1) {
      setCurrentQuestionIndex((pre) => pre + 1);
    } else {
      // TODO: navigate to lesson screen when user finish all questions
      console.log("Finish lesson");
      navigation.navigate("Finish", {
        correctAnswers: correctAnswers,
      });
    }
  };
  const [correctAnswers, setCorrectAnswers] = useState(0);
  let userAns = null;

  // Keep track user answer
  const handleUserAnswer = (item) => {
    userAns = item;
  };

  // Toggle Modal
  const [isModalVisible, setModalVisible] = useState(false);
  // userResult is the answer of user
  const [userResult, setUserResult] = useState(null);
  // systemResult is the answer of system
  const [systemResult, setSystemResult] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    if (isModalVisible) {
      handleCheck();
    }
    if (!isModalVisible) {
      setUserResult(
        scoring(
          userAns,
          state.questions[currentQuestionIndex].type,
          currentQuestionIndex
        ).userResult
      );
      setSystemResult(
        scoring(
          userAns,
          state.questions[currentQuestionIndex].type,
          currentQuestionIndex
        ).systemResult
      );
      setProgress((pre) => {
        return pre + 1 / state.questions.length;
      });
      if (
        scoring(
          userAns,
          state.questions[currentQuestionIndex].type,
          currentQuestionIndex
        ).userResult
      ) {
        setCorrectAnswers((pre) => pre + 1);
      }
    }
  };

  return (
    <SafeAreaView
      forceInset={{ top: "always" }}
      style={styles.container}
    >
      <Header
        progress={progress}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestion={state.questions.length}
        navigation={navigation}
      />

      <QuestionText
        questionRequirement={
          state.questions[currentQuestionIndex].questionRequirement
        }
        questionText={
          state.questions[currentQuestionIndex].questionText
        }
        imageUrl={state.questions[currentQuestionIndex].imageUrl}
      />
      <UserAnswer
        onUserAnswer={handleUserAnswer}
        type={state.questions[currentQuestionIndex].type}
        singleSelection={
          state.questions[currentQuestionIndex].singleSelection
        }
        translate={state.questions[currentQuestionIndex].translate}
        arrange={state.questions[currentQuestionIndex].arrange}
      />
      {/* Modal */}
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
              {userResult ? "Chính xác!" : "Sai rồi! Đáp án đúng là:"}
            </Text>

            {!userResult ? (
              <>
                <Text style={styles.resultText}>{systemResult}</Text>
              </>
            ) : null}
            {userResult ? (
              <Image
                style={styles.image}
                source={require("../../assets/happy.gif")}
                resizeMode={"contain"}
              />
            ) : (
              <Image
                style={styles.image}
                source={require("../../assets/nothing.gif")}
                resizeMode={"contain"}
              />
            )}

            <TouchableOpacity
              style={styles.openButton}
              onPress={toggleModal}
            >
              <Text style={styles.textStyle}>Tiếp tục</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Submit Answer    */}
      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: "#2488DC" }}
        onPress={toggleModal}
      >
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
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
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 1,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    elevation: 5,
    width: WIDTH * 0.8,
    maxWidth: WIDTH * 0.9,
    minHeight: HEIGHT * 0.2,
    maxHeight: HEIGHT * 0.6,
  },
  modalText: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 20,
  },
  openButton: {
    backgroundColor: color.blue,
    borderRadius: 15,
    padding: 7,
    marginHorizontal: WIDTH / 60,
    elevation: 2,
    width: WIDTH * 0.4,
    alignSelf: "center",
    justifyContent: "flex-end",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  resultText: {
    textAlign: "center",
    fontSize: 15,
    marginBottom: 20,
  },
  image: {
    width: WIDTH * 0.5,
    height: HEIGHT * 0.2,
    marginBottom: 10,
  },
});
