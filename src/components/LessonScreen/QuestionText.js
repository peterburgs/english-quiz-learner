import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
// Device spec
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const QuestionText = ({
  questionRequirement,
  questionText,
  imageUrl,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.questionRequirement}>
        {questionRequirement}
      </Text>
      {questionText ? (
        <Text style={styles.questionText}>{questionText}</Text>
      ) : null}
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      ) : null}
    </View>
  );
};

export default QuestionText;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: HEIGHT * 0.25,
    // borderColor: "blue",
    // borderWidth: 2,
  },
  questionRequirement: {
    fontSize: 16,
    fontWeight: "bold",
  },
  questionText: {
    marginTop: 10,
    fontSize: 14,
  },
  image: {
    height: HEIGHT * 0.17,
    width: "100%",
    marginVertical: 5,
    alignSelf: "center",
  },
});
