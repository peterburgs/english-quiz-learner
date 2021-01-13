LogBox.ignoreAllLogs();

import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  Button,
  View,
  StyleSheet,
  Dimensions,
  Image,
  LogBox,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { Audio } from "expo-av";

// Import Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

// Context
import { Context as UserContext } from "../context/UserContext";

// Device spec
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const FinishScreen = ({ navigation }) => {
  const { state } = useContext(UserContext);
  const coin = navigation.getParam("coin");
  const exp = navigation.getParam("exp");
  const correctAnswers = navigation.getParam("correctAnswers");
  const totalQuestions = navigation.getParam("totalQuestions");
  // Sound
  const [sound, setSound] = useState(null);

  // Handle play sound
  const playSound = async () => {
    console.log("Loading Sound");
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/raw/yay.mp3")
      );
      setSound(sound);
      await sound.playAsync();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFinish = () => {
    // Go back to Topic screen
    navigation.navigate("Topic");
  };

  useEffect(() => {
    (async () => {
      await playSound();
    })();
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, []);

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

      {/* TODO: number of correct question/all */}
      <Text style={{ ...styles.title, fontSize: 16 }}>
        Số câu trả lời đúng: {correctAnswers}/{totalQuestions}
      </Text>
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
            &nbsp;+{coin}
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
            &nbsp;+{exp}
          </Text>
        </View>
      </View>
      <View style={styles.bonusContainer}>
        {state.user ? (
          state.user.hasX2Exp ? (
            <Image
              source={require("../../assets/x2.png")}
              style={styles.bonusImage}
              resizeMode={"contain"}
            />
          ) : null
        ) : null}

        {state.user ? (
          state.user.hasX5Exp ? (
            <Image
              source={require("../../assets/x5.png")}
              style={styles.bonusImage}
              resizeMode={"contain"}
            />
          ) : null
        ) : null}
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
  bonusImage: {
    width: WIDTH * 0.2,
    height: WIDTH * 0.2,
    alignSelf: "center",
  },
  bonusContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 50,
  },
});
