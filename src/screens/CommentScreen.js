LogBox.ignoreAllLogs();

import React, { useContext } from "react";
import { Text } from "react-native";
import { Button, LogBox } from "react-native";
import { SafeAreaView } from "react-navigation";

const CommentScreen = ({ navigation }) => {
  console.log(navigation.getParam("name"));
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text>Comment Screen</Text>
      <Button
        title="Lesson"
        onPress={() => {
          navigation.navigate("Lesson");
        }}
      ></Button>
    </SafeAreaView>
  );
};

CommentScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

export default CommentScreen;
