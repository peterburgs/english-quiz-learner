import React, { useState } from "react";
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

// Mockup data
const selections = [
  {
    itemText: "A mango",
    textColor: "#000",
    backgroundColor: "fff",
    id: "4",
  },
  {
    itemText: "An apple",
    textColor: "#000",
    backgroundColor: "fff",
    id: "1",
  },
  {
    itemText: "An orange",
    textColor: "#000",
    backgroundColor: "fff",
    id: "2",
  },
  {
    itemText: "A banana",
    textColor: "#000",
    backgroundColor: "fff",
    id: "3",
  },
];

// Define single selection item
const Item = ({ item, onPress, style, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.buttonContainer, style]}
    elevation={5}
  >
    <Text style={[styles.itemText, { color: textColor }]}>
      {item.itemText}
    </Text>
  </TouchableOpacity>
);
const SingleSelection = () => {
  // State
  const [selectedId, setSelectedId] = useState(null);

  // Render Item
  const renderItem = ({ item }) => {
    const backgroundColor =
      item.id === selectedId
        ? color.singleSelectionSelected
        : color.singleSelection;
    const textColor = item.id === selectedId ? "#fff" : "#000";
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
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
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </View>
  );
};

export default SingleSelection;

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: "center",
    marginBottom: 10,
    width: WIDTH * 0.9,
    borderRadius: 20,
    padding: 10,
    shadowColor: color.shadowColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  itemText: {
    paddingHorizontal: 10,
    color: "#fff",
    fontSize: 15,
  },
});
