import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import EnglishQuizApi from "../api/EnglishQuizApi";

// User Reducer
const levelReducer = (state, action) => {
  switch (action.type) {
    case "get_levels":
      return { ...state, level: action.payload };
    default:
      return state;
  }
};

const getLevels = (dispatch) => async () => {
  try {
    const response = await EnglishQuizApi.get("/levels");
    dispatch({
      type: "get_levels",
      payload: response.data.level,
    });
  } catch (err) {
    console.log("Level context error: \n", err);
  }
};
export const { Provider, Context } = createDataContext(
  levelReducer,
  { getLevels },
  { level: null }
);
