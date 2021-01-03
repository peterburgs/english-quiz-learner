console.disableYellowBox = true;

import React, { useContext } from "react";
import {
  Text,
  TouchableOpacity,
  Button,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { SafeAreaView } from "react-navigation";

// Import Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

// Context

// Device spec
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const FinishScreen = ({ navigation }) => {
  const score = navigation.getParam("correctAnswers");
  const topicId = navigation.getParam("topicId");
  const lessonOrder = navigation.getParam("lessonOrder");
  const handleFinish = () => {
    //

    // Go back to Topic screen
    navigation.navigate("Topic");
  };
  return (
    <SafeAreaView
      forceInset={{ top: "always" }}
      style={styles.container}
    >
      <Image
        source={require("../../assets/finish.gif")}
        style={styles.image}
      />
      <Text style={styles.title}>Bạn đã hoàn thành 1 bài học!</Text>

      {/* Result of this lesson */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 20,
        }}
      >
        {/* <Text>{score}</Text> */}
        {/* Coins */}
        <View style={{ flexDirection: "row" }}>
          <FontAwesome5 name="piggy-bank" size={33} color="#ffa41b" />
          <Text
            style={{
              alignSelf: "center",
              fontWeight: "bold",
              color: "#ffa41b",
              marginLeft: 5,
              fontSize: 20,
            }}
          >
            &nbsp;+{score}
          </Text>
        </View>

        {/* Exp */}
        <View style={{ flexDirection: "row" }}>
          <MaterialCommunityIcons
            name="star-face"
            size={35}
            color="#29c7ac"
          />
          <Text
            style={{
              alignSelf: "center",
              fontWeight: "bold",
              color: "#29c7ac",
              fontSize: 20,
            }}
          >
            &nbsp;+{score * 10}
          </Text>
        </View>
      </View>

      {/* Go back to Lesson screen   */}
      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.buttonText}>TRỞ VỀ</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

FinishScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

export default FinishScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: HEIGHT,
    maxHeight: HEIGHT,
  },
  button: {
    width: WIDTH * 0.9,
    height: 45,
    borderRadius: 20,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    bottom: 50,
    position: "absolute",
    backgroundColor: "#2488DC",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  image: {
    minWidth: WIDTH * 0.7,
    maxWidth: WIDTH * 0.8,
    minHeight: HEIGHT * 0.4,
    maxHeight: HEIGHT * 0.5,
    alignSelf: "center",
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    color: "#295939",
  },
  content: {
    textAlign: "center",
    alignItems: "center",
  },
});
