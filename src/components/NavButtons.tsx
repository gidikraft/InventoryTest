import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import React from "react";
import { NormalText } from "./CustomText";

type NavButtonTypes = {
  title: string;
  buttonPress: () => void;
  buttonStyle?: ViewStyle;
};

const NavButtons = (props: NavButtonTypes) => {
  const { title, buttonStyle, buttonPress } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={buttonPress}
        style={[styles.addBtn, buttonStyle]}
      >
        <NormalText caption={title} />
      </TouchableOpacity>
    </View>
  );
};

export default NavButtons;

const styles = StyleSheet.create({
  addBtn: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#bf3232",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 16,
    marginBottom: 8,
  },
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
