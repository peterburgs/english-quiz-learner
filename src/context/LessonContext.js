import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import EnglishQuizApi from "../api/EnglishQuizApi";

// lesson Reducer
const lessonReducer = (state, action) => {
  switch (action.type) {
    case "get_questions":
      return {
        ...state,
        questions: action.payload.questions.sort(
          () => Math.random() - 0.5 //<== Magic code
        ),
      };
    case "set_translate_answer":
      return {
        ...state,
        translateAnswer: action.payload,
      };
    case "set_arrange_answer":
      return {
        ...state,
        arrangeAnswer: action.payload,
      };
    case "set_single_selection_answer":
      return {
        ...state,
        singleSelectionAnswer: action.payload,
      };
    case "answer_refreshed":
      return {
        ...state,
        singleSelectionAnswer: null,
        arrangeAnswer: [],
        translateAnswer: "",
      };
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

const setTranslateAnswer = (dispatch) => (answer) => {
  dispatch({ type: "set_translate_answer", payload: answer });
};

const setArrangeAnswer = (dispatch) => (answer) => {
  dispatch({ type: "set_arrange_answer", payload: answer });
};

const setSingleSelectionAnswer = (dispatch) => (answer) => {
  dispatch({ type: "set_single_selection_answer", payload: answer });
};

const answerRefreshed = (dispatch) => () => {
  dispatch({ type: "answer_refreshed" });
};

export const { Provider, Context } = createDataContext(
  lessonReducer,
  {
    getQuestions,
    setTranslateAnswer,
    setSingleSelectionAnswer,
    setArrangeAnswer,
    answerRefreshed,
  },
  {
    questions: [],
    translateAnswer: "",
    arrangeAnswer: [],
    singleSelectionAnswer: null,
  }
);
