import React, { useContext } from "react";

import { Context as LessonContext } from "../context/LessonContext";

const useScoring = () => {
  const { state } = useContext(LessonContext);

  // Find answer based on:
  // questions from DB
  // answers user made
  const scoring = (
    userAnswer,
    questionType,
    currentQuestionIndex
  ) => {
    switch (questionType) {
      // UserAnswer return "chosen order"
      case "singleSelection":
        return {
          userResult: state.questions[
            currentQuestionIndex
          ].singleSelection.find((e) => e.order === userAnswer)
            .isCorrect,
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
                e.content.toLowerCase() === userAnswer.toLowerCase()
            ) !== -1,
          systemResult:
            state.questions[currentQuestionIndex].translate[0]
              .content,
        };
      case "arrange":
        for (let i = 0; i < userAnswer.length; i++) {
          if (
            parseInt(userAnswer[i].order) === -1 ||
            parseInt(userAnswer[i].order) !== i + 1
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
