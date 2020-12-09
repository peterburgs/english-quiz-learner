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
import color from "../common/color";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
import { Context as UserContext } from "../context/UserContext";
// Component
const Topic = ({ onPress, topicTitleColor, topic }) => {
  const { state } = useContext(UserContext);
  const progressTopic = state.user
    ? state.user.progress.find((item) => {
        console.log("item: ", item);
        return item.topic == topic._id;
      })
    : null;
  console.log("progressTopic: ", progressTopic);
  return (
    <View style={styles.container}>
      {/* Topic Image */}
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={onPress}
      >
        <Image
          source={require("../../assets/pizza.png")}
          style={styles.image}
          resizeMode={"contain"}
        />
      </TouchableOpacity>
      <Text style={[styles.title, { color: topicTitleColor }]}>
        {topic.name}
      </Text>
      <View style={styles.rectangleContainer}>
        <View
          style={[
            styles.rectangle,
            {
              backgroundColor: progressTopic
                ? progressTopic.completedLesson >= 1
                  ? color.oldColor
                  : color.newColor
                : color.newColor,
            },
          ]}
        />
        <View
          style={[
            styles.rectangle,
            {
              backgroundColor: progressTopic
                ? progressTopic.completedLesson >= 2
                  ? color.oldColor
                  : color.newColor
                : color.newColor,
            },
          ]}
        />
        <View
          style={[
            styles.rectangle,
            {
              backgroundColor: progressTopic
                ? progressTopic.completedLesson == 3
                  ? color.oldColor
                  : color.newColor
                : color.newColor,
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
    marginHorizontal: WIDTH / 20,
    marginTop: WIDTH / 30,
    alignItems: "center",
    marginBottom: 5,
  },
  image: {
    aspectRatio: 0.7,
    resizeMode: "contain",
    alignSelf: "center",
    height: WIDTH / 5,
    width: WIDTH / 5,
  },
  imageContainer: {
    alignContent: "center",
    alignItems: "center",
    height: 2 + WIDTH / 5,
    width: 2 + WIDTH / 5,
    borderRadius: WIDTH / 5,
    borderWidth: 4,
    borderColor: "#f4f4f2",
    backgroundColor: "#3094E9",
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
  },
  title: {
    fontSize: 19,
    fontWeight: "bold",
  },
});
