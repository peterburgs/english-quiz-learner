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
    case "error_message":
      return { ...state, errorMessage: action.payload };
    case "reset_password_success_message":
      return {
        ...state,
        resetPasswordSuccessMessage: "Password updated successfully!",
        errorMessage: "",
      };
    case "update_user_success_message":
      return {
        ...state,
        updateUserSuccessMessage: "Updated successfully!",
      };
    case "clear_update_user_message":
      return { ...state, updateUserSuccessMessage: "" };
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
    dispatch({ type: "update_user_success_message" });
  } catch (err) {
    console.log(err.message);
  }
};

const purchase = (dispatch) => async (userId, item) => {
  try {
    dispatch({ type: "toggle_is_loading" });
    dispatch({ type: "toggle_is_touchable" });
    const purchaseResult = await EnglishQuizApi.put(
      `/users/${userId}/purchase`,
      { item }
    );
    const getUserResult = await EnglishQuizApi.get("/users");
    const getProgressesResult = await EnglishQuizApi.get(
      "/progresses",
      {
        params: { userId: getUserResult.data.user._id },
      }
    );
    dispatch({
      type: "get_user",
      payload: {
        user: getUserResult.data.user,
        progresses: getProgressesResult.data.progresses,
      },
    });
    dispatch({ type: "toggle_is_loading" });
    dispatch({ type: "toggle_is_touchable" });
    dispatch({ type: "update_user_success_message" });
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
const resetPassword = (dispatch) => async (
  currentPassword,
  newPassword
) => {
  try {
    dispatch({ type: "toggle_is_loading" });
    dispatch({ type: "toggle_is_touchable" });
    const response = await EnglishQuizApi.post("/reset", {
      currentPassword,
      newPassword,
    });
    dispatch({ type: "toggle_is_loading" });
    dispatch({ type: "toggle_is_touchable" });
    dispatch({ type: "reset_password_success_message" });
  } catch (err) {
    dispatch({ type: "toggle_is_loading" });
    dispatch({ type: "toggle_is_touchable" });
    dispatch({
      type: "error_message",
      payload: "Wrong current password",
    });
    console.log("====================================");
    console.log(err.message);
    console.log("====================================");
  }
};

const clearUpdateUserMessage = (dispatch) => () => {
  dispatch({ type: "clear_update_user_message" });
};

export const { Provider, Context } = createDataContext(
  userReducer,
  {
    getUser,
    updateProgress,
    addProgress,
    updateUser,
    resetPassword,
    clearUpdateUserMessage,
    purchase,
  },
  {
    user: null,
    progresses: [],
    isTouchable: false,
    isLoading: false,
    errorMessage: "",
    resetPasswordSuccessMessage: "",
    updateUserSuccessMessage: "",
  }
);
