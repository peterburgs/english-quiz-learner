import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";

// Import color
import color from "../../common/color";
// Device spec
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

// Context
import { Context as LessonContext } from "../../context/LessonContext";

const SingleSelection = ({ selections }) => {
  const { state: lessonState, setSingleSelectionAnswer } = useContext(
    LessonContext
  );

  console.log("render");

  // Define single selection item
  const Item = ({ item, onPress, style, textColor }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonContainer, style]}
      elevation={5}
    >
      <Text style={[styles.itemText, { color: textColor }]}>
        {item.content}
      </Text>
    </TouchableOpacity>
  );

  // Render Item
  const renderItem = ({ item }) => {
    const backgroundColor =
      item.order === lessonState.singleSelectionAnswer
        ? color.singleSelectionSelected
        : color.singleSelection;
    const textColor =
      item.order === lessonState.singleSelectionAnswer
        ? "#fff"
        : "#000";
    return (
      <Item
        item={item}
        // TODO: handle press a selection
        onPress={() => {
          setSingleSelectionAnswer(item.order);
        }}
        style={{ backgroundColor }}
        textColor={textColor}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={selections}
        renderItem={renderItem}
        keyExtractor={(item) => item.order.toString()}
        extraData={lessonState.singleSelectionAnswer}
      />
    </View>
  );
};

export default SingleSelection;

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: "center",
    marginBottom: 15,
    width: WIDTH * 0.9,
    height: HEIGHT * 0.07,
    borderRadius: 20,
    padding: 10,
    shadowColor: color.shadowColor,
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    justifyContent: "center",
  },
  itemText: {
    paddingHorizontal: 10,
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
