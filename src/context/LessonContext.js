import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import EnglishQuizApi from "../api/EnglishQuizApi";

// lesson Reducer
const lessonReducer = (state, action) => {
  switch (action.type) {
    case "get_questions":
      return { ...state, questions: action.payload.questions };
    default:
      return state;
  }
};

// Get all questions belong to the Lesson based on lessonOrder
const getQuestions = (dispatch) => async (topicId, lessonOrder) => {
  try {
    const response = await EnglishQuizApi.get("/questions", {
      params: { topicId, lessonOrder },
    });
    dispatch({
      type: "get_questions",
      payload: response.data,
    });
  } catch (err) {
    console.log("Level context error: \n", err);
  }
};
export const { Provider, Context } = createDataContext(
  lessonReducer,
  { getQuestions },
  { questions: [] }
);
