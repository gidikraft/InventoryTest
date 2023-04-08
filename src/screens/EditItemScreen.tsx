import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import CustomInput from "../components/TextInput";
import { NormalText } from "../components/CustomText";
import { RootStackScreenProps } from "../navigation/types";
import { isValidText } from "../utils/validateText";
import { isValidNumber } from "../utils/validateNumber";
import { isValidDescription } from "../utils/validateDescription";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StoreItemType } from "../utils/files/inventory";
import { getUId } from "../utils/getUID";

const EditItemScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"EditItem">) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [units, setUnits] = useState("");
  const [description, setDescription] = useState("");

  const itemToUpdate = route.params.item;

  const updateItem = async (id: string) => {
    if (isValidText(name) === false) {
      Alert.alert("Error", "Please enter a valid nname");
      return false;
    } else if (isValidNumber(price) === false) {
      Alert.alert("Error", "Please ennter a valid price");
      return false;
    } else if (isValidNumber(units) === false) {
      Alert.alert("Error", "Please enter valid units");
      return false;
    } else if (!isValidDescription(description, 3)) {
      Alert.alert("Error", "Please description must be at least 3 words");
      return false;
    } else {
      try {
        const updatingdata = {
          description,
          price,
          name,
          units,
        };
        const myArray = await AsyncStorage.getItem("@MyStore:key");
        let newData = JSON.parse(myArray as string);
        let newArray = [...newData].map(item => {
          if (id === item.id) {
            const data = { ...item, ...updatingdata };
            return data;
          }
          return item;
        });
        await AsyncStorage.setItem("@MyStore:key", JSON.stringify(newArray));
        navigation.replace("Inventory");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.maincontainer}>
      <View style={styles.container}>
        <NormalText
          caption="You are about to this edit item."
          style={styles.header}
        />
        <CustomInput
          title="Name"
          label="Enter name"
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
            <TouchableOpacity
              style={styles.button}
              onPress={() => updateItem(itemToUpdate.id as string)}
            >
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
    fontSize: 12,
  },
});
