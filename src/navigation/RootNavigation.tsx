import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Inventory, Login } from "../screens";
import { RootStackParamList } from "./types";
import { AppContext } from "../global/AppContext";
import AddItemScreen from "../screens/AddItemScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const { isAuthenticated, setisAuthenticated } = useContext(AppContext);

  useEffect(() => {
    async function checkSignedIn() {
      try {
        const signedIn = await AsyncStorage.getItem("signedIn");
        if (signedIn !== null) {
          setisAuthenticated(true);
        } else {
          setisAuthenticated(false);
        }
      } catch (error) {
        Alert.alert("Error", "Couldn't sign in");
        console.log(error);
      }
      // You can await here
    }
    checkSignedIn();
  }, [setisAuthenticated]);

  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      {isAuthenticated ? (
        <>
          <Stack.Screen
            name="Inventory"
            component={Inventory}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddNewItem"
            component={AddItemScreen}
            options={{ title: "Add New Item" }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="LoginScreen"
            component={Login}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigation;
