/* eslint-disable react/no-unstable-nested-components */
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppContext } from "../global/AppContext";
import { NormalText } from "../components/CustomText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StoreItemCard from "../components/StoreItemCard";
import NavButtons from "../components/NavButtons";
import { RootStackScreenProps } from "../navigation/types";
import BottomSheet from "@gorhom/bottom-sheet";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import LogoutModal from "../components/LogoutModal";

const InventoryScreen = ({ navigation }: RootStackScreenProps<"Inventory">) => {
  const { setisAuthenticated } = useContext(AppContext);

  const [salesItem, setSalesItem] = useState();
  const [isRefreshing, setRefreshing] = useState(false);
  const [currentuser, setCurrentuser] = useState("");
  const [currentItemId, setCurrentItemId] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [userLoggedOut, setUserLoggedout] = useState(false);

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
      getStoreDetails();
      setRefreshing(false);
    }, 1500);
    // console.log(confirmDss, 'show dss');
  }, []);

  const logout = async () => {
    if (userLoggedOut) {
      console.log(true);
      await AsyncStorage.setItem("signedIn", "");
      setisAuthenticated(false);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const newList = salesItem?.filter(item => item.id !== id);
      setSalesItem(newList);
      await AsyncStorage.setItem("@MyStore:key", JSON.stringify(newList));
      setDeleteModalVisible(false);
    } catch (error) {
      console.log("could not delete item", error);
    }
  };

  const deleteModalRef = useRef<BottomSheet>(null);
  const userLoggedOutRef = useRef<BottomSheet>(null);

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
                <NavButtons
                  title="Log out"
                  buttonPress={() => setUserLoggedout(true)}
                />
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
              itemPress={() => navigation.navigate("EditItem", { item: item })}
              deleteItem={() => {
                setCurrentItemId(item.id);
                setDeleteModalVisible(true);
              }}
            />
          )}
        />
      </View>
      {deleteModalVisible && (
        <ConfirmDeleteModal
          deleteModalRef={deleteModalRef}
          handleClose={() => setDeleteModalVisible(false)}
          confirmDelete={() => deleteItem(currentItemId)}
        />
      )}
      {userLoggedOut && (
        <LogoutModal
          deleteModalRef={userLoggedOutRef}
          handleClose={() => setUserLoggedout(false)}
          confirmLogout={logout}
        />
      )}
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
