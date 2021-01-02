console.disableYellowBox = true;

import React, { useContext } from "react";
import {
  Text,
  TouchableOpacity,
  Button,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-navigation";

// TODO: remove this component when finish
import QuestionResult from "../components/LessonScreen/QuestionResult";

// Device spec
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const FinishScreen = ({ navigation }) => {
  const score = navigation.getParam("correctAnswers");
  return (
    <SafeAreaView
      forceInset={{ top: "always" }}
      style={styles.container}
    >
      <Button
        title={"Back to Topic"}
        onPress={() => {
          navigation.navigate("Topic");
        }}
      />
      <Text>{score}</Text>
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
});
