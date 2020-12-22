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
      return {
        ...state,
        errorMessage: "",
        token: action.payload.token,
      };
    case "clear_error_message":
      return { ...state, errorMessage: "", isLoading: false };
    case "toggle_is_loading":
      return { ...state, isLoading: !state.isLoading };
    case "toggle_is_touchable":
      return { ...state, isTouchable: !state.isTouchable };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};
// Local SignIn
const tryLocalSignin = (dispatch) => async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({ type: "signin", payload: token });
      navigate("mainFlow");
    } else {
      navigate("loginFlow");
    }
  } catch (error) {
    console.log(error);
  }
};
// Clear Error Message
const clearErrorMessage = (dispatch) => () => {
  dispatch({
    type: "clear_error_message",
  });
};
// Sign Up
const signup = (dispatch) => async ({ email, password }) => {
  try {
    dispatch({
      type: "toggle_is_loading",
    });
    dispatch({
      type: "toggle_is_touchable",
    });
    const response = await EnglishQuizApi.post("/signup", {
      email,
      password,
      role: 2,
      isActive: true,
    });

    await AsyncStorage.setItem("token", response.data.token);

    dispatch({ type: "signin", payload: response.data.token });

    navigate("Account");
  } catch (err) {
    console.log("*LOG at AuthContext: ", err);

    dispatch({
      type: "toggle_is_loading",
    });
    dispatch({
      type: "toggle_is_touchable",
    });
    dispatch({
      type: "add_error",
      payload: err.toString(),
    });
  }
};

// Sign In
const signin = (dispatch) => async ({ email, password }) => {
  try {
    dispatch({
      type: "clear_error_message",
    });
    dispatch({
      type: "toggle_is_loading",
    });
    dispatch({
      type: "toggle_is_touchable",
    });
    const response = await EnglishQuizApi.post("/signin", {
      email,
      password,
    });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data });
    console.log("[AuthContext.js] payload:", response.data);
    navigate("mainFlow");
  } catch (err) {
    console.log("*LOG at AuthContext: ", err);
    dispatch({
      type: "toggle_is_loading",
    });
    dispatch({
      type: "toggle_is_touchable",
    });
    dispatch({
      type: "add_error",
      payload: "Email or password is invalid",
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
  {
    signin,
    signout,
    signup,
    clearErrorMessage,
    tryLocalSignin,
  },
  {
    token: null,
    errorMessage: "",
    isTouchable: false,
  }
);
