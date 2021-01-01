/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
} from "react-native";
import Topic from "./Topic";
import color from "../../common/color";
// Linear gradient
// import { LinearGradient } from "expo-linear-gradient";

const { width: WIDTH } = Dimensions.get("screen");

const Level = ({
  onPress,
  level,
  pointerEvents,
  backgroundColor,
  topicTitleColor,
  message,
  opacityRate,
}) => {
  return (
    <View style={styles.container} pointerEvents={pointerEvents}>
      {/* image */}

      <Image
        source={require("../../../assets/crown.png")}
        resizeMode={"contain"}
        style={styles.levelImage}
      />
      {/* Title */}
      <Text style={styles.title}>{level.name}</Text>
      {message ? (
        <Text
          style={{
            color: "#fceef5",
            alignSelf: "center",
            fontStyle: "italic",
          }}
        >
          {message}
        </Text>
      ) : null}
      {/* List of Topic */}
      <View style={[styles.topicContainer, { opacity: opacityRate }]}>
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
    marginTop: 5,
    color: "white",
    backgroundColor: "#fdb827",
    paddingHorizontal: WIDTH / 5,
    paddingBottom: 2,
    borderRadius: 15,
  },
  topicContainer: {
    paddingBottom: WIDTH / 30,
  },
  levelImage: {
    height: 50,
    alignSelf: "center",
  },
});
