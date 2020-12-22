/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
} from "react-native";
import Topic from "./Topic";
import color from "../common/color";

const { width: WIDTH } = Dimensions.get("screen");

const Level = ({
  onPress,
  level,
  pointerEvents,
  backgroundColor,
  topicTitleColor,
  message,
}) => {
  return (
    <View style={styles.container} pointerEvents={pointerEvents}>
      {/* Title */}
      <Text style={styles.title}>{level.name}</Text>
      {message ? (
        <Text style={{ color: color.red, alignSelf: "center" }}>
          {message}
        </Text>
      ) : null}
      {/* List of Topic */}
      <View
        style={[
          styles.topicContainer,
          (backgroundColor = { backgroundColor }),
        ]}
      >
        <FlatList
          data={level.topics}
          renderItem={({ item }) => {
            return (
              <Topic
                topic={item}
                onPress={onPress}
                topicTitleColor={topicTitleColor}
              />
            );
          }}
          keyExtractor={(item) => item._id}
        />
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
    fontSize: 23,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 5,
  },
  topicContainer: {
    paddingBottom: WIDTH / 30,
    borderRadius: 40,
    shadowColor: color.shadowColor,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: color.topicContainerEnabled,
  },
});
