import React, { useState, useEffect, useContext } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { FontAwesome } from "@expo/vector-icons";
// Import components
import TopicHeader from "../components/TopicHeader";
import Level from "../components/Level";

// Context
import { Context as LevelContext } from "../context/LevelContext";
import { Context as UserContext } from "../context/UserContext";
import color from "../common/color";
import { TouchableWithoutFeedback } from "react-native";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

// Topic Screen
const TopicScreen = () => {
  const handleTopic = () => {
    setModalVisible(true);
  };
  const { state, getLevels } = useContext(LevelContext);
  const userContext = useContext(UserContext);
  // Toggle Modal
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    getLevels();
  }, []);
  return (
    <View>
      <Modal
        isVisible={isModalVisible}
        animationIn={"zoomInRight"}
        animationOut={"slideOutDown"}
        animationInTiming={0}
        animationOutTiming={0}
        backdropTransitionInTiming={0}
        backdropTransitionOutTiming={0}
        onBackdropPress={toggleModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Choose a lesson to start
            </Text>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  ...styles.openButton,
                  backgroundColor: color.yellow,
                }}
                onPress={toggleModal}
              >
                <Text style={styles.textStyle}>Lesson 1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  ...styles.openButton,
                  backgroundColor: color.yellow,
                }}
                onPress={toggleModal}
              >
                <Text style={styles.textStyle}>Lesson 2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  ...styles.openButton,
                  backgroundColor: color.blue,
                }}
                onPress={toggleModal}
              >
                <Text style={styles.textStyle}>Lesson 3</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
                  ? userContext.state.user.currentLevelOrder >=
                    item.order
                    ? "auto"
                    : "none"
                  : "auto"
              }
              backgroundColor={
                userContext.state.user
                  ? userContext.state.user.currentLevelOrder >=
                    item.order
                    ? color.topicContainerEnabled
                    : color.topicContainerDisabled
                  : color.topicContainerEnabled
              }
              topicTitleColor={
                userContext.state.user
                  ? userContext.state.user.currentLevelOrder >=
                    item.order
                    ? color.topicColorEnabled
                    : color.topicColorDisabled
                  : color.topicColorEnabled
              }
              message={
                userContext.state.user
                  ? userContext.state.user.currentLevelOrder >=
                    item.order
                    ? null
                    : "Finish previous level to unlock this"
                  : null
              }
            />
          );
        }}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
TopicScreen.navigationOptions = {
  headerTitle: () => <TopicHeader />,
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
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
});

export default TopicScreen;
