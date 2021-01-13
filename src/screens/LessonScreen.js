LogBox.ignoreAllLogs();

import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  LogBox,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { Audio } from "expo-av";
import _ from "lodash";
// pacman
import { PacmanIndicator } from "react-native-indicators";

// Context
import { Context } from "../context/AuthContext";
import { Context as LessonContext } from "../context/LessonContext";
import { Context as UserContext } from "../context/UserContext";
// Modal
import Modal from "react-native-modal";

//Device spec
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

// Import components
import Header from "../components/LessonScreen/Header";
import QuestionText from "../components/LessonScreen/QuestionText";
import UserAnswer from "../components/LessonScreen/UserAnswer";
import color from "../common/color";

// Score weight
let scoreWeight = 1;

// Import Hooks
import useScoring from "../hooks/useScoring";

// LessonScreen
const LessonScreen = ({ navigation }) => {
  const { state: lessonState, getQuestions } = useContext(
    LessonContext
  );
  const {
    state: userState,
    getUser,
    updateProgress,
    addProgress,
    updateUser,
  } = useContext(UserContext);
  const [scoring] = useScoring();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Sound
  const [sound, setSound] = useState(null);

  // ProgressBar
  const [progress, setProgress] = useState(0);

  const topicId = navigation.getParam("topicId");
  const lessonOrder = navigation.getParam("lessonOrder");

  // Handle play sound
  const playSound = async (mode) => {
    console.log("Loading Sound");
    try {
      const { sound: soundCorrect } = await Audio.Sound.createAsync(
        require("../../assets/raw/correct.mp3")
      );
      const { sound: soundWrong } = await Audio.Sound.createAsync(
        require("../../assets/raw/among_us.mp3")
      );
      setSound(mode === "correct" ? soundCorrect : soundWrong);
      if (mode === "correct") {
        await soundCorrect.playAsync();
      } else {
        await soundWrong.playAsync();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Update header bar, update user. Navigate to finish screen at the end
  const handleCheck = async () => {
    if (currentQuestionIndex < lessonState.questions.length - 1) {
      setCurrentQuestionIndex((pre) => pre + 1);
    } else {
      console.log("Finish lesson");
      const progresses = userState.progresses
        ? userState.progresses.find((item) => item.topic === topicId)
        : null;
      if (progresses) {
        if (progresses.completedLesson < lessonOrder) {
          scoreWeight = 5;
          await updateProgress(progresses._id, lessonOrder);
        } else {
          scoreWeight = 1;
        }
      } else {
        scoreWeight = 5;
        await addProgress(topicId, userState.user._id);
      }
      const clonedUser = _.cloneDeep(userState.user);
      const isHasX2 = userState.user.hasX2Exp ? 2 : 1;
      const isHasX5 = userState.user.hasX5Exp ? 5 : 1;
      clonedUser.coin += correctAnswers * scoreWeight;
      clonedUser.exp +=
        correctAnswers * scoreWeight * 10 * isHasX2 * isHasX5;
      await updateUser(clonedUser);
      navigation.navigate("Finish", {
        coin: scoreWeight * correctAnswers,
        exp: scoreWeight * 10 * correctAnswers * isHasX2 * isHasX5,
        correctAnswers: correctAnswers,
        totalQuestions: lessonState.questions.length,
      });
    }
  };
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // Toggle Modal
  const [isModalVisible, setModalVisible] = useState(false);
  // userResult is the answer of user
  const [userResult, setUserResult] = useState(null);
  // systemResult is the answer of system
  const [systemResult, setSystemResult] = useState(null);

  const toggleModal = async () => {
    setModalVisible(!isModalVisible);
    if (isModalVisible) {
      await handleCheck();
    }
    if (!isModalVisible) {
      setUserResult(
        scoring(
          lessonState.questions[currentQuestionIndex].type,
          currentQuestionIndex
        ).userResult
      );
      setSystemResult(
        scoring(
          lessonState.questions[currentQuestionIndex].type,
          currentQuestionIndex
        ).systemResult
      );
      setProgress((pre) => {
        return pre + 1 / lessonState.questions.length;
      });
      if (
        scoring(
          lessonState.questions[currentQuestionIndex].type,
          currentQuestionIndex
        ).userResult
      ) {
        setCorrectAnswers((pre) => pre + 1);
        await playSound("correct");
      } else {
        await playSound("wrong");
      }
    }
  };

  // Enable playback in silence mode
  // Sound.setCategory("Playback");

  useEffect(() => {
    getUser();
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <SafeAreaView
      forceInset={{ top: "always" }}
      style={styles.container}
    >
      <Header
        progress={progress}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestion={lessonState.questions.length}
        navigation={navigation}
      />

      <QuestionText
        questionRequirement={
          lessonState.questions[currentQuestionIndex]
            .questionRequirement
        }
        questionText={
          lessonState.questions[currentQuestionIndex].questionText
        }
        imageUrl={
          lessonState.questions[currentQuestionIndex].imageUrl
        }
      />
      <UserAnswer
        type={lessonState.questions[currentQuestionIndex].type}
        singleSelection={
          lessonState.questions[currentQuestionIndex].singleSelection
        }
        translate={
          lessonState.questions[currentQuestionIndex].translate
        }
        arrange={lessonState.questions[currentQuestionIndex].arrange}
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
            {/*  */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={toggleModal}
              disabled={userState.isTouchable}
            >
              {userState.isLoading == true ? (
                <PacmanIndicator
                  hidesWhenStopped={true}
                  animating={userState.isLoading}
                  color="#eeeded"
                />
              ) : (
                <Text style={styles.textStyle}>Tiếp tục</Text>
              )}
            </TouchableOpacity>
            {/*  */}
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
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
  submitButton: {
    backgroundColor: "#07689f",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: WIDTH * 0.5,
    height: 50,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 19,
    alignSelf: "center",
  },
});
