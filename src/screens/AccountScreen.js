console.disableYellowBox = true;

import React, { useContext } from "react";
import { Button } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Context } from "../context/AuthContext";

const AccountScreen = () => {
  const { signout } = useContext(Context);
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Button title={"Log Out"} onPress={signout} />
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

export default AccountScreen;
