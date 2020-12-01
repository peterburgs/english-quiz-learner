import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-navigation";

const TopicScreen = () => {
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text>Topic Screen</Text>
    </SafeAreaView>
  );
};

TopicScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

export default TopicScreen;
