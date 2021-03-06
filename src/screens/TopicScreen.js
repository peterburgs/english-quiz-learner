LogBox.ignoreAllLogs();

import React, { useState, useEffect, useContext } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  ImageBackground,
  ScrollView,
  LogBox,
} from "react-native";
import Modal from "react-native-modal";
// Import components
import TopicHeader from "../components/TopicScreen/TopicHeader";
import Level from "../components/TopicScreen/Level";
import color from "../common/color";

// Context
import { Context as LevelContext } from "../context/LevelContext";
import { Context as UserContext } from "../context/UserContext";
import { Context as LessonContext } from "../context/LessonContext";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

// Import Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

// Topic Screen
const TopicScreen = ({ navigation }) => {
  const { state, getLevels } = useContext(LevelContext);
  const { getQuestions } = useContext(LessonContext);
  const [currentTopicId, setCurrentTopicId] = useState(null);
  // Array tracks colors of lesson
  const [lessonColors, setLessonColors] = useState([
    color.blue,
    color.blue,
    color.blue,
  ]);

  // Handle when press lesson
  const handlePressLesson = async (index, topicId) => {
    const topic = userContext.state.progresses
      ? userContext.state.progresses.find((item) => {
          return item.topic == topicId;
        })
      : null;

    if (topic) {
      if (index > topic.completedLesson + 1) {
        Alert.alert(
          "Hold up!",
          "Looks like you haven't finished the previous lesson...",
          [
            {
              text: "Understood",
              onPress: () => {
                console.log("Understood");
              },
            },
          ]
        );
      } else {
        await getQuestions(topicId, index);
        navigation.navigate("Lesson", {
          topicId: topicId,
          lessonOrder: index,
        });
      }
      setModalVisible(!isModalVisible);
    } else {
      if (index > 1) {
        Alert.alert(
          "Hold up!",
          "Looks like you haven't finished the previous lesson...",
          [
            {
              text: "Understood",
              onPress: () => {
                console.log("Understood");
              },
            },
          ]
        );
      } else {
        try {
          await getQuestions(topicId, index);
          navigation.navigate("Lesson", {
            topicId: topicId,
            lessonOrder: index,
          });
        } catch (e) {
          console.log("Do nothing");
          console.log(e.message);
        }
      }
    }
  };

  const userContext = useContext(UserContext);

  // Toggle Modal
  const [isModalVisible, setModalVisible] = useState(false);

  // Handle Topic
  const handleTopic = (topicId) => {
    setCurrentTopicId(topicId);
    setModalVisible(true);
    const progressTopic = userContext.state.progresses
      ? userContext.state.progresses.find((item) => {
          return item.topic == topicId;
        })
      : null;
    setLessonColors(() => {
      if (progressTopic) {
        if (progressTopic.completedLesson == 1) {
          return [color.yellow, color.lightGrey, color.lightGrey];
        } else if (progressTopic.completedLesson == 2) {
          return [color.yellow, color.yellow, color.lightGrey];
        }
        return [color.yellow, color.yellow, color.yellow];
      } else {
        return [color.lightGrey, color.lightGrey, color.lightGrey];
      }
    });
    // setProgressTopic(progressTopic);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  // const
  useEffect(() => {
    getLevels();
  }, []);
  return (
    <View>
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
              Choose a lesson to start
            </Text>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  ...styles.openButton,
                  backgroundColor: lessonColors[0],
                }}
                onPress={() => {
                  handlePressLesson(1, currentTopicId);
                }}
              >
                <Text style={styles.textStyle}>Easy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  ...styles.openButton,
                  backgroundColor: lessonColors[1],
                }}
                onPress={() => {
                  handlePressLesson(2, currentTopicId);
                }}
              >
                <Text style={styles.textStyle}>Medium</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  ...styles.openButton,
                  backgroundColor: lessonColors[2],
                }}
                onPress={() => {
                  handlePressLesson(3, currentTopicId);
                }}
              >
                <Text style={styles.textStyle}>Hard</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ImageBackground
        style={styles.imageBackground}
        source={require("../../assets/topic-screen-bg.png")}
      >
        <View>
          <FlatList
            contentInset={{ bottom: 60 }}
            data={state.level}
            renderItem={({ item }) => {
              return (
                <Level
                  onPress={handleTopic}
                  // topics={item.topics}
                  level={item}
                  pointerEvents={
                    userContext.state.user
                      ? userContext.state.user.exp >= item.requiredExp
                        ? "auto"
                        : "none"
                      : "auto"
                  }
                  message={
                    userContext.state.user
                      ? userContext.state.user.exp >= item.requiredExp
                        ? null
                        : "Accumulate more exp to unlock!"
                      : null
                  }
                  opacityRate={
                    userContext.state.user
                      ? userContext.state.user.exp >= item.requiredExp
                        ? 1
                        : 0.4
                      : 1
                  }
                />
              );
            }}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingBottom: 60 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
TopicScreen.navigationOptions = {
  headerTitle: () => <TopicHeader />,
};
const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column" },
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
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 12,
    padding: 5,
    marginLeft: WIDTH / 60,
    marginRight: WIDTH / 60,
    elevation: 2,
    width: WIDTH / 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  imageBackground: {
    justifyContent: "center",
    resizeMode: "contain",
    width: WIDTH,
    height: HEIGHT * 0.9,
    position: "relative",
  },
});

export default TopicScreen;
