/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
// Color
import color from "../../common/color";
// Linear gradient
import { LinearGradient } from "expo-linear-gradient";
// API
import EnglishQuizApi from "../../api/EnglishQuizApi";

// Context
import { Context as UserContext } from "../../context/UserContext";

// Device spec
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

// Component
const Topic = ({ onPress, topic }) => {
  const { state } = useContext(UserContext);
  const progressTopic = state.progresses
    ? state.progresses.find((item) => {
        return item.topic == topic._id;
      })
    : null;

  return (
    <View style={styles.container}>
      {/* Topic Image */}
      <TouchableOpacity
        onPress={() => {
          onPress(topic._id);
        }}
      >
        <Image
          source={{
            uri:
              String(EnglishQuizApi.defaults.baseURL) +
              "/topics" +
              topic.imageUrl,
          }}
          style={styles.image}
          resizeMode={"contain"}
        />
      </TouchableOpacity>

      <Text style={styles.title}>{topic.name}</Text>
      <View style={styles.rectangleContainer}>
        <View
          style={[
            styles.rectangle,
            {
              backgroundColor: progressTopic
                ? progressTopic.completedLesson >= 1
                  ? color.yellow
                  : color.lightGrey
                : color.lightGrey,
            },
          ]}
        />
        <View
          style={[
            styles.rectangle,
            {
              backgroundColor: progressTopic
                ? progressTopic.completedLesson >= 2
                  ? color.yellow
                  : color.lightGrey
                : color.lightGrey,
            },
          ]}
        />
        <View
          style={[
            styles.rectangle,
            {
              backgroundColor: progressTopic
                ? progressTopic.completedLesson == 3
                  ? color.yellow
                  : color.lightGrey
                : color.lightGrey,
            },
          ]}
        />
      </View>
    </View>
  );
};

export default Topic;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: WIDTH / 10,
    marginTop: WIDTH / 10,
    alignItems: "center",
    marginBottom: WIDTH / 30,
  },
  image: {
    aspectRatio: 1,
    resizeMode: "contain",
    alignSelf: "center",
    height: WIDTH / 5,
    width: WIDTH / 5,
  },

  rectangleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  rectangle: {
    width: WIDTH / 12,
    height: WIDTH / 45,
    marginHorizontal: 4,
    borderRadius: 15,
  },
  title: {
    fontSize: 19,
    fontWeight: "bold",
    color: "white",
  },
});
