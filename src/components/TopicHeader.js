/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

// Import Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

// Context

import { Context as UserContext } from "../context/UserContext";

const TopicHeader = () => {
  const { state, getUser } = useContext(UserContext);
  useEffect(() => {
    getUser();
  }, []);

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
            marginLeft: 5,
          }}
        >
          {state.user ? format(state.user.coin) : 0}
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
          {state.user ? format(state.user.exp) : 0}
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
          {state.user ? format(state.user.streak) : 0}
        </Text>
      </View>
    </View>
  );
};

// Format number
function format(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Export
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
