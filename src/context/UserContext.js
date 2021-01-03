import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import EnglishQuizApi from "../api/EnglishQuizApi";

// User Reducer
const userReducer = (state, action) => {
  switch (action.type) {
    case "get_user":
      return {
        ...state,
        user: action.payload.user,
        progresses: action.payload.progresses,
      };
    case "add_progresses":
      return {};
    default:
      return state;
  }
};

const getUser = (dispatch) => async () => {
  try {
    const response = await EnglishQuizApi.get("/users");
    dispatch({
      type: "get_user",
      payload: response.data,
    });
  } catch (err) {
    console.log("User context error: \n", err);
  }
};
const addProgresses = (dispatch) => async () => {
  try {
  } catch (err) {
    console.log(err.message);
  }
};

export const { Provider, Context } = createDataContext(
  userReducer,
  { getUser },
  { user: null, progresses: null }
);
