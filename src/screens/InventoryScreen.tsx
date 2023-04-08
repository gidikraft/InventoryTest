/* eslint-disable react/no-unstable-nested-components */
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../global/AppContext";
import { NormalText } from "../components/CustomText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StoreItemCard from "../components/StoreItemCard";
import NavButtons from "../components/NavButtons";
import { RootStackScreenProps } from "../navigation/types";

const InventoryScreen = ({ navigation }: RootStackScreenProps<"Inventory">) => {
  const { setisAuthenticated } = useContext(AppContext);

  const [salesItem, setSalesItem] = useState();
  const [isRefreshing, setRefreshing] = useState(false);
  const [currentuser, setCurrentuser] = useState("");

  const getStoreDetails = async () => {
    try {
      const myArray = await AsyncStorage.getItem("@MyStore:key");
      const currentUser = await AsyncStorage.getItem("signedIn");

      currentUser !== null
        ? setCurrentuser(currentUser)
        : setCurrentuser("User");

      if (myArray !== null) {
        // We have data!!
        console.log(JSON.parse(myArray));
        setSalesItem(JSON.parse(myArray));
      }
    } catch (error) {
      console.log("Error retrieving data", error);
    }
  };

  useEffect(() => {
    getStoreDetails();
  }, [setisAuthenticated]);

  const pullToRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      // getCourierBag();
      setRefreshing(false);
    }, 1500);
    // console.log(confirmDss, 'show dss');
  }, []);

  const logout = async () => {
    await AsyncStorage.setItem("signedIn", "");
    setisAuthenticated(false);
  };

  const deleteItem = (id: string) => {
    const newList = salesItem?.filter(item => item.id !== id);
    setSalesItem(newList);
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <View style={styles.container}>
        <FlatList
          data={salesItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listcontainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.listemptycontainer}>
              <NormalText caption="List is currently empty." />
            </View>
          )}
          ListHeaderComponent={() => (
            <View>
              <NormalText
                caption={`Welcome back ${currentuser}`}
                style={styles.currentuser}
              />
              <View style={styles.headercontainer}>
                <NavButtons
                  title="Add new item"
                  buttonPress={() => navigation.navigate("AddNewItem")}
                />
                <NavButtons title="Log out" buttonPress={logout} />
              </View>
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={pullToRefresh}
            />
          }
          renderItem={({ item }) => (
            <StoreItemCard
              name={item.name}
              price={item.price}
              units={item.units}
              description={item.description}
              itemPress={() => deleteItem(item.id)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default InventoryScreen;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: "#f2f3f5",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listcontainer: {
    paddingVertical: 20,
  },
  listemptycontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  currentuser: {
    fontStyle: "italic",
    fontSize: 20,
  },
  headercontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
