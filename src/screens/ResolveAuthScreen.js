LogBox.ignoreAllLogs();

import { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { LogBox } from "react-native";
const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);
  useEffect(() => {
    tryLocalSignin();
  }, []);
  return null;
};

export default ResolveAuthScreen;
