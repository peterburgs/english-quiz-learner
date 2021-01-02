import React, { useContext } from "react";
import { Text, TouchableOpacity, Button } from "react-native";
import { SafeAreaView } from "react-navigation";

const FinishScreen = ({ navigation }) => {
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Button
        title={"Back to Topic"}
        onPress={() => {
          navigation.navigate("Topic");
        }}
      />
    </SafeAreaView>
  );
};

FinishScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

export default FinishScreen;
