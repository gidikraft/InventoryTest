import { StyleSheet, Text, TextStyle } from "react-native";
import React from "react";

export type CustomTextProps = {
  caption: string;
  style?: TextStyle;
};

const NormalText = (textprops: CustomTextProps) => {
  const { caption, style, ...props } = textprops;
  return (
    <Text style={[styles.normalText, style]} {...props}>
      {caption}
    </Text>
  );
};

const SmallText = (textprops: CustomTextProps) => {
  const { caption, style, ...props } = textprops;
  return (
    <Text style={[styles.smallText, style]} {...props}>
      {caption}
    </Text>
  );
};

export { NormalText, SmallText };

const styles = StyleSheet.create({
  normalText: {
    fontSize: 16,
    // fontFamily: FONT_REGULAR,
    color: "#202223",
    lineHeight: 20,
  },
  smallText: {
    fontSize: 12,
    // fontFamily: FONT_REGULAR,
    color: "#202223",
  },
});
