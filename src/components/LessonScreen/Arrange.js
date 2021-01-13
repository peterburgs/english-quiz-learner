import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
// Import color
import color from "../../common/color";

// Device spec
const { height: HEIGHT, width: WIDTH } = Dimensions.get("screen");

const Arrange = ({
  data,
  submitData,
  handleData,
  handleSubmitData,
}) => {
  // Component Box
  const Box = ({ word, _id, handleData }) => {
    return (
      <View
        style={{ justifyContent: "flex-start", flexDirection: "row" }}
      >
        <TouchableOpacity
          style={styles.box}
          onPress={() => {
            handleData(_id);
          }}
        >
          <Text style={styles.text}>{word}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  // Component Submit Box
  const SubmitBox = ({ word, _id, handleSubmitData }) => {
    return (
      <View
        style={{ justifyContent: "flex-start", flexDirection: "row" }}
      >
        <TouchableOpacity
          style={styles.submitBox}
          onPress={() => {
            handleSubmitData(_id);
          }}
        >
          <Text style={styles.submitText}>{word}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {/*Submit Box*/}
      <View style={styles.submitBoxContainer}>
        {submitData
          ? submitData.map((item, index) => {
              if (submitData.length > 0)
                return (
                  <SubmitBox
                    word={item.word}
                    key={item._id}
                    handleSubmitData={handleSubmitData}
                    _id={item._id}
                  />
                );
            })
          : null}
      </View>

      {/* Data Box*/}
      <View style={styles.boxContainer}>
        {data.map((item, index) => {
          return (
            <Box
              word={item.word}
              key={item._id}
              handleData={handleData}
              _id={item._id}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Arrange;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
  },
  boxContainer: {
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: color.borderColor,
    borderRadius: 15,
    padding: 5,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  submitBoxContainer: {
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: color.borderColor,
    borderRadius: 15,
    padding: 5,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    backgroundColor: "#eeeeee",
  },
  box: {
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: color.borderColor,
    margin: 5,
    backgroundColor: color.box,
    alignSelf: "center",
  },
  submitBox: {
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: color.lightGrey,
    margin: 5,
    backgroundColor: color.orange,
    alignSelf: "center",
  },
  text: {
    color: "#fff",
    fontSize: 15,
  },
  submitText: {
    color: "#fff",
    fontSize: 15,
  },
});
