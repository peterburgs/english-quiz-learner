import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import EnglishQuizApi from "../api/EnglishQuizApi";

// lesson Reducer
const lessonReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// Get all questions belong to the Lesson based on lessonOrder
const getLesson = (dispatch) => async () => {
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
  lessonReducer,
  {},
  { lesson: null }
);
