import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import { navigate } from "../common/navigationRef";
import EnglishQuizApi from "../api/EnglishQuizApi";

// Auth Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

// Local SignIn
const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("Home");
  } else {
    navigate("Signup");
  }
};
const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

// Sign Up
const signup = (dispatch) => async ({ email, password }) => {
  try {
    console.log("39");
    const response = await EnglishQuizApi.post("/signup", {
      email,
      password,
      role: "learner",
      isActive: true,
    });
    console.log(response);

    await AsyncStorage.setItem("token", response.data.token);
    console.log("49");

    dispatch({ type: "signin", payload: response.data.token });

    navigate("Home");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign up",
    });
  }
};

// Sign In
const signin = (dispatch) => async ({ email, password }) => {
  try {
    const response = await EnglishQuizApi.post("/signin", {
      email,
      password,
    });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });
    navigate("Home");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    });
  }
};

// Sign Out
const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("loginFlow");
};

// Export
export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);
