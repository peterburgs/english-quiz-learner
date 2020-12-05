/* eslint-disable react/prop-types */
import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Topic from "./Topic";

const { width: WIDTH } = Dimensions.get("screen");

const Level = ({ onPress }) => {
  const levelTitle = "Level 1";
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>{levelTitle}</Text>
      {/* List of Topic */}
      <View style={styles.topicContainer}>
        <Topic onPress={onPress} />
        <Topic onPress={onPress} />
      </View>
    </View>
  );
};

export default Level;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: WIDTH / 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 19,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 5,
  },
  topicContainer: {
    backgroundColor: "#e8e8e8",
    borderRadius: 40,
    shadowColor: "#393e46",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
