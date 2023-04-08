import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { NormalText } from "./CustomText";

type NavButtonTypes = {
  title: string;
  buttonPress: () => void;
};

const NavButtons = (props: NavButtonTypes) => {
  const { title, buttonPress } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={buttonPress} style={styles.addBtn}>
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
    borderColor: "#ba2a20",
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
