import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import CustomInput from "../components/TextInput";
import { NormalText } from "../components/CustomText";

const EditItemScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [units, setUnits] = useState("");
  const [description, setDescription] = useState("");

  return (
    <View style={styles.maincontainer}>
      <View style={styles.container}>
        <NormalText
          caption="You are about to this edit item."
          style={styles.header}
        />
        <CustomInput
          title="Username"
          label="Enter username"
          value={name}
          onChangeText={text => setName(text)}
        />

        <CustomInput
          title="Price"
          label="Enter price"
          value={price}
          onChangeText={text => setPrice(text)}
        />

        <CustomInput
          title="Unit"
          label="Enter units"
          value={units}
          onChangeText={text => setUnits(text)}
        />

        <CustomInput
          title="Description"
          label="Enter item description"
          value={description}
          onChangeText={text => setDescription(text)}
        />

        <View style={{ alignItems: "center", flex: 1 }}>
          <View style={styles.bottomView}>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <NormalText caption="Update item" style={styles.buttonlabel} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EditItemScreen;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: "#f2f3f5",
  },
  container: {
    paddingHorizontal: 24,
    flex: 1,
  },
  header: {
    marginTop: 16,
    marginBottom: 8,
  },
  bottomView: {
    bottom: 30,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    position: "absolute",
  },
  button: {
    marginTop: 120,
    backgroundColor: "#ba2a20",
    borderRadius: 8,
    alignItems: "center",
    height: 48,
    justifyContent: "center",
  },
  buttonlabel: {
    color: "#ffffff",
  },
});
