LogBox.ignoreAllLogs();

import React from "react";
import {
  Text,
  LogBox,
  View,
  Button,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { SafeAreaView } from "react-navigation";

// Import Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

// Device spec
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

// Color
import color from "../common/color";
import { stubFalse } from "lodash";
const ShopScreen = () => {
  return (
    <SafeAreaView
      forceInset={{ top: "always" }}
      style={styles.container}
    >
      {/* X2 exp */}
      <View style={styles.x2Container}>
        <View style={styles.x2SubContainer}>
          <Image
            source={require("../../assets/x2.png")}
            style={styles.image}
            resizeMode={"contain"}
          />
          <View style={styles.rightSide}>
            {/* Item title */}
            <Text style={styles.itemTitle}>Nhân 2 kinh nghiệm</Text>
            <Text style={styles.itemDescription} numberOfLine={2}>
              Bạn sẽ được nhân đôi kinh nghiệm trong vòng 24 giờ.
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <FontAwesome5
                name="piggy-bank"
                size={30}
                color="#ffa41b"
              />
              <Text
                style={{
                  alignSelf: "center",
                  fontWeight: "bold",
                  color: "#ffa41b",
                  marginLeft: 5,
                }}
              >
                {/* TODO: fetch user coin here */}
                &nbsp;30
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* X5 exp */}
      <View style={styles.x2Container}>
        <View style={styles.x2SubContainer}>
          <Image
            source={require("../../assets/x5.png")}
            style={styles.image}
            resizeMode={"contain"}
          />
          <View style={styles.rightSide}>
            {/* Item title */}
            <Text style={styles.itemTitle}>Nhân 5 kinh nghiệm</Text>
            <Text style={styles.itemDescription} numberOfLine={2}>
              Bạn sẽ được nhân năm kinh nghiệm trong vòng 24 giờ.
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <FontAwesome5
                name="piggy-bank"
                size={30}
                color="#ffa41b"
              />
              <Text
                style={{
                  alignSelf: "center",
                  fontWeight: "bold",
                  color: "#ffa41b",
                  marginLeft: 5,
                }}
              >
                {/* TODO: fetch user coin here */}
                &nbsp;50
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    color: color.blue,
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
  },
  x2Container: {
    marginVertical: 10,
    backgroundColor: "white",
    width: WIDTH * 0.9,
    height: HEIGHT * 0.15,
    maxHeight: HEIGHT * 0.4,
    borderWidth: 1,
    borderColor: color.borderColor,
    borderRadius: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  x2SubContainer: {
    flex: 1,
    flexDirection: "row",
  },
  image: {
    width: WIDTH * 0.2,
    height: WIDTH * 0.2,
    alignSelf: "center",
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 14,
    color: "#393e46",
    alignItems: "flex-start",
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
  rightSide: {
    width: WIDTH * 0.6,
    marginLeft: 5,
  },
});

ShopScreen.navigationOptions = () => {
  return {
    headerTitle: () => (
      <View
        style={{ flexDirection: "row", justifyContent: "center" }}
      >
        <FontAwesome5 name="piggy-bank" size={30} color="#ffa41b" />
        <Text
          style={{
            alignSelf: "center",
            fontWeight: "bold",
            color: "#ffa41b",
            marginLeft: 5,
          }}
        >
          {/* TODO: fetch user coin here */}
          &nbsp;0
        </Text>
      </View>
    ),
  };
};
