import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";

// Import lodash
import _ from "lodash";

// Import components
import SingleSelection from "./SingleSelection";
import Translate from "./Translate";
import Arrange from "./Arrange";

// Context
import { Context as LessonContext } from "../../context/LessonContext";

// Device spec
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const handleCheck = () => {
  console.log("Checked!");
};
const UserAnswer = ({
  type,
  singleSelection,
  translate,
  arrange,
}) => {
  // Clone arrange
  const [data, setData] = useState([]);

  const {
    state: lessonState,
    setArrangeAnswer,
    answerRefreshed,
  } = useContext(LessonContext);

  const handleData = (_id) => {
    const _clonedWord = _.cloneDeep(
      data.find((e) => {
        return e._id === _id;
      })
    );
    if (_clonedWord) {
      // Add word to submit box
      const newSubmitData = _.cloneDeep(lessonState.arrangeAnswer);
      newSubmitData.push(_clonedWord);
      setArrangeAnswer(newSubmitData);
      // Remove word from box
      const newData = _.cloneDeep(data);
      const index = newData.findIndex((e) => e._id === _id);
      newData.splice(index, 1);
      setData(newData);
    }
  };
  const handleSubmitData = (_id) => {
    const _clonedWord = _.cloneDeep(
      lessonState.arrangeAnswer.find((e) => {
        return e._id === _id;
      })
    );
    if (_clonedWord) {
      // Add word to  box
      const newData = _.cloneDeep(data);
      newData.push(_clonedWord);
      setData(newData);
      // Remove word from submit box
      const newSubmitData = _.cloneDeep(lessonState.arrangeAnswer);
      const index = newSubmitData.findIndex((e) => e._id === _id);
      newSubmitData.splice(index, 1);
      setArrangeAnswer(newSubmitData);
    }
  };
  const RenderItem = ({ type }) => {
    switch (type) {
      case "singleSelection":
        return <SingleSelection selections={singleSelection} />;
      case "translate":
        return <Translate />;
      case "arrange":
        return (
          <Arrange
            data={data}
            submitData={lessonState.arrangeAnswer}
            handleData={handleData}
            handleSubmitData={handleSubmitData}
          />
        );
    }
  };

  useEffect(() => {
    setData(_.cloneDeep(arrange));
    return () => {
      answerRefreshed();
    };
  }, [arrange]);

  console.log("[UserAnswer.js] render");

  return (
    <View style={styles.container}>
      <RenderItem type={type} />
    </View>
  );
};

export default UserAnswer;

const styles = StyleSheet.create({
  container: {
    paddingTop: HEIGHT * 0.02,
    width: "100%",
    height: HEIGHT * 0.63,
    // borderColor: "green",
    // borderWidth: 2,
  },
});
