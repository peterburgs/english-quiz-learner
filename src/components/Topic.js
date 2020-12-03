import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
const oldColor = "#FFB800";
const newColor = "#D9D7D7";
const topicTitle = "Food";

// Component
const Topic = () => {
  return (
    <View style={styles.container}>
      {/* Topic Image */}
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => console.log("Topic Component")}
      >
        <Image
          source={require("../../assets/hamburger.png")}
          style={styles.image}
          resizeMode={"contain"}
        />
      </TouchableOpacity>
      <View style={styles.rectangleContainer}>
        <View
          style={[styles.rectangle, { backgroundColor: oldColor }]}
        />
        <View
          style={[styles.rectangle, { backgroundColor: oldColor }]}
        />
        <View
          style={[styles.rectangle, { backgroundColor: newColor }]}
        />
      </View>
      <Text style={styles.title}>{topicTitle}</Text>
    </View>
  );
};

export default Topic;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: WIDTH / 20,
    marginVertical: WIDTH / 20,
    alignItems: "center",
  },
  image: {
    aspectRatio: 0.5,
    resizeMode: "contain",
    alignSelf: "center",
    height: WIDTH / 4,
    width: WIDTH / 4,
  },
  imageContainer: {
    alignContent: "center",
    alignItems: "center",
    height: 2 + WIDTH / 4,
    width: 2 + WIDTH / 4,
    borderRadius: WIDTH / 4,
    borderWidth: 4,
    borderColor: "#f4f4f2",
    backgroundColor: "#3094E9",
  },
  rectangleContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  rectangle: {
    width: WIDTH / 12,
    height: WIDTH / 35,
    marginHorizontal: 4,
  },
  title: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#2d6187",
  },
});
