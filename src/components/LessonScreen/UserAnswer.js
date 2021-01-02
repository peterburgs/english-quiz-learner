import React, { useState, useEffect } from "react";
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
  onUserAnswer,
}) => {
  // Clone arrange
  const [data, setData] = useState(arrange);

  const [submitData, setSubmitData] = useState([]);

  const handleData = (_id) => {
    const _clonedWord = _.cloneDeep(
      data.find((e) => {
        return e._id === _id;
      })
    );
    if (_clonedWord) {
      // Add word to submit box
      const newSubmitData = _.cloneDeep(submitData);
      newSubmitData.push(_clonedWord);
      setSubmitData(newSubmitData);
      // Remove word from box
      const newData = _.cloneDeep(data);
      const index = newData.findIndex((e) => e._id === _id);
      newData.splice(index, 1);
      setData(newData);
      // Send user answer
      onUserAnswer(newSubmitData);
    }
  };
  const handleSubmitData = (_id) => {
    const _clonedWord = _.cloneDeep(
      submitData.find((e) => {
        return e._id === _id;
      })
    );
    if (_clonedWord) {
      // Add word to  box
      const newData = _.cloneDeep(data);
      newData.push(_clonedWord);
      setData(newData);
      // Remove word from submit box
      const newSubmitData = _.cloneDeep(submitData);
      const index = newSubmitData.findIndex((e) => e._id === _id);
      newSubmitData.splice(index, 1);
      setSubmitData(newSubmitData);
      // Send user answer
      onUserAnswer(newSubmitData);
    }
  };
  const RenderItem = ({ type }) => {
    switch (type) {
      case "singleSelection":
        return (
          <SingleSelection
            onUserAnswer={onUserAnswer}
            selections={singleSelection}
          />
        );
      case "translate":
        return <Translate onUserAnswer={onUserAnswer} />;
      case "arrange":
        return (
          <Arrange
            data={data}
            submitData={submitData}
            handleData={handleData}
            handleSubmitData={handleSubmitData}
          />
        );
    }
  };
  useEffect(() => {
    setData(arrange);
    setSubmitData([]);
  }, [arrange]);
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
