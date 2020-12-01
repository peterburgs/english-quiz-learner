import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-navigation";

const ShopScreen = () => {
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text>Shop Screen</Text>
    </SafeAreaView>
  );
};
ShopScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

export default ShopScreen;
