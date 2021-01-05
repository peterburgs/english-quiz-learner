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
    case "toggle_is_loading":
      return { ...state, isLoading: !state.isLoading };
    case "toggle_is_touchable":
      return { ...state, isTouchable: !state.isTouchable };
    default:
      return state;
  }
};

const getUser = (dispatch) => async () => {
  try {
    const response = await EnglishQuizApi.get("/users");
    const progresses = await EnglishQuizApi.get("/progresses", {
      params: { userId: response.data.user._id },
    });
    dispatch({
      type: "get_user",
      payload: {
        user: response.data.user,
        progresses: progresses.data.progresses,
      },
    });
  } catch (err) {
    console.log("User context error: \n", err);
  }
};
const updateUser = (dispatch) => async (user) => {
  try {
    console.log("user", user);
    dispatch({ type: "toggle_is_loading" });
    dispatch({ type: "toggle_is_touchable" });
    const response = await EnglishQuizApi.put(
      `/users/${user._id}`,
      user
    );
    dispatch({ type: "toggle_is_loading" });
    dispatch({ type: "toggle_is_touchable" });
  } catch (err) {
    console.log(err.message);
  }
};
const addProgress = (dispatch) => async (topicId, userId) => {
  try {
    const response = await EnglishQuizApi.post("/progresses", {
      topicId: topicId,
      userId: userId,
      completedLesson: 1,
    });
    console.log("addProgress");
    getUser();
  } catch (err) {
    console.log(err.message);
  }
};
const updateProgress = (dispatch) => async (
  progressId,
  lessonOrder
) => {
  try {
    const response = await EnglishQuizApi.put(
      `/progresses/${progressId}`,
      {
        lessonOrder,
      }
    );
    console.log("updateProgress");

    getUser();
  } catch (err) {
    console.log(err.message);
  }
};

export const { Provider, Context } = createDataContext(
  userReducer,
  { getUser, updateProgress, addProgress, updateUser },
  {
    user: null,
    progresses: [],
    isTouchable: false,
    isLoading: false,
  }
);
