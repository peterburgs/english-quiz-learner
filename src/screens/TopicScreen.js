/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState } from "react";
import { SafeAreaView } from "react-navigation";

// Import components
import TopicHeader from "../components/TopicHeader";
import Level from "../components/Level";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  TouchableHighlight,
} from "react-native";
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

// Topic Screen
const TopicScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleTopic = () => {
    setModalVisible(true);
  };
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>

            <TouchableHighlight
              style={{
                ...styles.openButton,
                backgroundColor: "#2196F3",
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <FlatList
        contentInset={{ bottom: 60 }}
        data={DATA}
        renderItem={() => {
          return <Level onPress={handleTopic} />;
        }}
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default TopicScreen;
