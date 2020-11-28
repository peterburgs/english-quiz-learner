import React, { useContext } from "react";
import { SafeAreaView, Button } from "react-native";
import { Context } from "../context/AuthContext";

// App
const HomeScreen = () => {
  const { signout } = useContext(Context);
  return (
    <SafeAreaView>
      <Button title={"Log Out"} onPress={signout} />
    </SafeAreaView>
  );
};

export default HomeScreen;
