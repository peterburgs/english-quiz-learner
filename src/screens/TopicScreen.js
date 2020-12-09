import React, { useState, useEffect, useContext } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
} from "react-native";
// Import components
import TopicHeader from "../components/TopicHeader";
import Level from "../components/Level";

// Context
import { Context as LevelContext } from "../context/LevelContext";
import { Context as UserContext } from "../context/UserContext";
import color from "../common/color";

// Topic Screen
const TopicScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleTopic = () => {
    setModalVisible(true);
  };
  const { state, getLevels } = useContext(LevelContext);
  const userContext = useContext(UserContext);
  useEffect(() => {
    getLevels();
  }, []);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>

            <TouchableHighlight
              style={{
                ...styles.openButton,
                backgroundColor: "#2196F3",
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
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
                // TODO: display modal when users tap on unreached topics
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
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 12,
    padding: 8,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TopicScreen;
