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

export const { Provider, Context } = createDataContext(
  userReducer,
  { getUser },
  { user: null, progresses: null }
);
