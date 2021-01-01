import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Spacer from "../Spacer";
import { withNavigation } from "react-navigation";

const NavLink = ({ navigation, text, routeName }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <Spacer>
        <Text style={styles.link}>{text}</Text>
      </Spacer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    fontSize: 13,
    alignSelf: "center",
    color: "#0f3460",
  },
});
NavLink.propTypes = {
  navigation: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
};
export default withNavigation(NavLink);
