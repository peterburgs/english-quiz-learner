import React, { useContext } from "react";
import { Text } from "react-native";
import { Button } from "react-native";
import { SafeAreaView } from "react-navigation";

const FinishScreen = () => {
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text>Finish Screen</Text>
    </SafeAreaView>
  );
};

FinishScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

export default FinishScreen;
