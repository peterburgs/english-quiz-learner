/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

// Import Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

// Context

import { Context as UserContext } from "../context/UserContext";
const TopicHeader = () => {
  const { state } = useContext(UserContext);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      {/* Coins */}
      <View style={{ flexDirection: "row" }}>
        <FontAwesome5 name="piggy-bank" size={30} color="#ffa41b" />
        <Text
          style={{
            alignSelf: "center",
            fontWeight: "bold",
            color: "#ffa41b",
          }}
        >
          {" " + state.coin}
        </Text>
      </View>

      {/* Exp */}
      <View style={{ flexDirection: "row" }}>
        <MaterialCommunityIcons
          name="star-face"
          size={33}
          color="#29c7ac"
        />
        <Text
          style={{
            alignSelf: "center",
            fontWeight: "bold",
            color: "#29c7ac",
          }}
        >
          {state.exp}
        </Text>
      </View>

      {/* Streaks */}
      <View style={{ flexDirection: "row" }}>
        <MaterialCommunityIcons
          name="fire"
          size={33}
          color="#f64b3c"
        />
        <Text
          style={{
            alignSelf: "center",
            fontWeight: "bold",
            color: "#f64b3c",
          }}
        >
          {state.streak}
        </Text>
      </View>
    </View>
  );
};

export default TopicHeader;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    letterSpacing: 1,
  },
});
