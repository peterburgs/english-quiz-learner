import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import EnglishQuizApi from "../api/EnglishQuizApi";

// User Reducer
const userReducer = (state, action) => {
  switch (action.type) {
    case "get_user":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const getUser = (dispatch) => async () => {
  try {
    const response = await EnglishQuizApi.get("/users");
    console.log("response.data.user:\n", response.data.user);
    dispatch({
      type: "get_user",
      payload: response.data.user,
    });
  } catch (err) {
    console.log("User context error: \n", err);
  }
};
export const { Provider, Context } = createDataContext(
  userReducer,
  { getUser },
  { token: null, user: null }
);
