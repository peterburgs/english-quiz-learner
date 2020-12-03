/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";
import { SafeAreaView } from "react-navigation";

// Import components
import TopicHeader from "../components/TopicHeader";
import Level from "../components/Level";
import { FlatList, StyleSheet, Text, View } from "react-native";
// Context

// Mock data
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];
const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
const renderItem = () => {
  return <Level />;
};
// Topic Screen
const TopicScreen = () => {
  return (
    <View>
      <FlatList
        contentInset={{ bottom: 60 }}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
TopicScreen.navigationOptions = {
  headerTitle: () => <TopicHeader />,
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
export default TopicScreen;
