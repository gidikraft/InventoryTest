/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Alert,
  GestureResponderEvent,
} from "react-native";
import React, { useContext, useState } from "react";
import CustomInput from "../components/TextInput";
import { AppContext } from "../global/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NormalText } from "../components/CustomText";
// import AppContext from '../global/AppContext';

export interface StoreItemType {
  id?: string;
  name: string;
  units: string;
  price: string;
  description: string;
  itemPress?: (event: GestureResponderEvent) => void;
}

const myArray: StoreItemType[] = [
  {
    id: "11111a",
    name: "Samsung",
    units: "1",
    price: "N2,000",
    description: "64gb and 4gb RAM",
  },
  {
    id: "11112b",
    name: "Motorola",
    units: "12",
    price: "N2,000",
    description: "64gb and 4gb RAM",
  },
  {
    id: "11113c",
    name: "OPPO",
    units: "21",
    price: "N2,000",
    description: "64gb and 4gb RAM",
  },
  {
    id: "1114d",
    name: "Pixel",
    units: "101",
    price: "N2,000",
    description: "64gb and 4gb RAM",
  },
];

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const isAuthenticated = useSelector(
  //   (state: RootState) => state.auth.isAuthenticated,
  // );
  const { isAuthenticated, setisAuthenticated } = useContext(AppContext);

  const getStoreDetails = async () => {
    try {
      await AsyncStorage.setItem("@MyStore:key", JSON.stringify(myArray));
      await AsyncStorage.setItem("signedIn", username);
    } catch (error) {
      console.log("couldn't save store data", error);
    }
  };

  const loginUser = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
      Alert.alert("Error", "Enter a valid email");
    } else {
      // login();
      console.log(isAuthenticated, "unauthenticated logged in state");
      getStoreDetails();
      setisAuthenticated(true);
      // navigation.navigate('Inventory');
    }
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <View style={styles.container}>
        <CustomInput
          title="Username"
          label="Enter username"
          value={username}
          onChangeText={text => setUsername(text)}
        />

        <CustomInput
          title="Passoword"
          label="Enter password"
          value={password}
          onChangeText={text => setPassword(text)}
        />

        <View style={{ alignItems: "center", flex: 1 }}>
          <View style={styles.bottomView}>
            <TouchableOpacity style={styles.button} onPress={loginUser}>
              <NormalText caption="Login" style={styles.buttonlabel} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: "#f2f3f5",
  },
  container: {
    paddingHorizontal: 24,
    marginTop: 120,
    flex: 1,
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
