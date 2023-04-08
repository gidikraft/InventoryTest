/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { StoreItemType } from "../screens/Login";
import { NormalText } from "./CustomText";

const StoreItemCard = (props: StoreItemType) => {
  const { name, price, units, description, itemPress } = props;
  return (
    <View style={{ paddingHorizontal: 4 }}>
      <TouchableOpacity style={styles.courierItemContainer} onPress={itemPress}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ width: "70%" }}>
            <NormalText
              caption={name}
              // style={{ fontSize: 14, fontFamily: FONT_MEDIUM }}
            />
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <View>
              <NormalText caption={price} />
            </View>

            <NormalText caption={`Units left: ${units}`} />
          </View>
        </View>
        <NormalText caption={description} style={{ marginTop: 8 }} />
      </TouchableOpacity>
    </View>
  );
};

export default StoreItemCard;

const styles = StyleSheet.create({
  courierItemContainer: {
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#ffffff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.41,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
});
