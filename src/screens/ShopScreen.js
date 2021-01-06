LogBox.ignoreAllLogs();

import React, { useContext } from "react";
import {
  Text,
  LogBox,
  View,
  Button,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-navigation";

// Import Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

// Device spec
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
// Context
import { Context as UserContext } from "../context/UserContext";
// Color
import color from "../common/color";
import { stubFalse } from "lodash";
const ShopScreen = () => {
  const { state, purchase } = useContext(UserContext);

  const handlePurchase = async (item) => {
    if (item) {
      await purchase(state.user._id, item);
    }
  };

  return (
    <SafeAreaView
      forceInset={{ top: "always" }}
      style={styles.container}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 20,
        }}
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
          &nbsp;{state.user.coin}
        </Text>
      </View>
      {/* X2 exp */}
      <TouchableOpacity
        onPress={() => handlePurchase("x2")}
        disabled={
          state.user
            ? state.user.coin < 30 || state.user.hasX2Exp
              ? true
              : false
            : true
        }
        style={{
          opacity: state.user
            ? state.user.coin < 30 || state.user.hasX2Exp
              ? 0.5
              : 1
            : 1,
        }}
      >
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
              {state.user ? (
                state.user.hasX2Exp ? (
                  <Text style={{ color: "red" }}>Đã mua</Text>
                ) : (
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
                      &nbsp;30
                    </Text>
                  </View>
                )
              ) : null}
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* X5 exp */}
      <TouchableOpacity
        onPress={() => handlePurchase("x5")}
        disabled={
          state.user
            ? state.user.coin < 50 || state.user.hasX5Exp
              ? true
              : false
            : true
        }
        style={{
          opacity: state.user
            ? state.user.coin < 50 || state.user.hasX5Exp
              ? 0.5
              : 1
            : 1,
        }}
      >
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
              {state.user ? (
                state.user.hasX5Exp ? (
                  <Text style={{ color: "red" }}>Đã mua</Text>
                ) : (
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
                      &nbsp;50
                    </Text>
                  </View>
                )
              ) : null}
            </View>
          </View>
        </View>
      </TouchableOpacity>
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

ShopScreen.navigationOptions = {
  headerShown: false,
};
