import React, { useContext } from "react";

import { Context as LessonContext } from "../context/LessonContext";

const useScoring = () => {
  const { state } = useContext(LessonContext);

  // Find answer based on:
  // questions from DB
  // answers user made
  const scoring = (questionType, currentQuestionIndex) => {
    switch (questionType) {
      // UserAnswer return "chosen order"
      case "singleSelection":
        return {
          userResult: state.questions[
            currentQuestionIndex
          ].singleSelection.find(
            (e) => e.order === state.singleSelectionAnswer
          ).isCorrect,
          systemResult: state.questions[
            currentQuestionIndex
          ].singleSelection.find((e) => e.isCorrect === true).content,
        };
      // UserAnswer return plain text
      case "translate":
        return {
          userResult:
            state.questions[currentQuestionIndex].translate.findIndex(
              (e) =>
                e.content.toLowerCase() ===
                state.translateAnswer.toLowerCase()
            ) !== -1,
          systemResult:
            state.questions[currentQuestionIndex].translate[0]
              .content,
        };
      case "arrange":
        if (
          state.arrangeAnswer.length !==
          state.questions[currentQuestionIndex].arrange.filter(
            (e) => e.order !== "-1"
          ).length
        ) {
          return {
            userResult: false,
            systemResult: state.questions[
              currentQuestionIndex
            ].arrange
              .filter((e) => e.order !== "-1")
              .sort((a, b) => parseInt(a.order) - parseInt(b.order))
              .map((e) => e.word)
              .join(" "),
          };
        }
        for (let i = 0; i < state.arrangeAnswer.length; i++) {
          if (
            parseInt(state.arrangeAnswer[i].order) === -1 ||
            parseInt(state.arrangeAnswer[i].order) !== i + 1
          )
            return {
              userResult: false,
              systemResult: state.questions[
                currentQuestionIndex
              ].arrange
                .filter((e) => e.order !== "-1")
                .sort((a, b) => parseInt(a.order) - parseInt(b.order))
                .map((e) => e.word)
                .join(" "),
            };
        }
        return {
          userResult: true,
          systemResult: state.questions[currentQuestionIndex].arrange
            .filter((e) => e.order !== "-1")
            .sort((a, b) => parseInt(a.order) - parseInt(b.order))
            .map((e) => e.word)
            .join(" "),
        };
    }
  };

  return [scoring];
};

export default useScoring;
