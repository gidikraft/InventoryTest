import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { RefObject, useMemo, useCallback } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { NormalText } from "./CustomText";

type LogoutModalTypes = {
  deleteModalRef: RefObject<BottomSheet>;
  handleClose: () => void;
  confirmLogout: () => void;
};

const LogoutModal = (props: LogoutModalTypes) => {
  const { deleteModalRef, handleClose, confirmLogout } = props;

  const renderBackdrop = useCallback(
    (prop: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...prop}
        opacity={0.7}
        pressBehavior="close"
      />
    ),
    [],
  );

  const snapPoints = useMemo(() => ["25%", "25%"], []);

  return (
    <BottomSheet
      ref={deleteModalRef}
      // index={1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
    >
      <View style={styles.contentContainer}>
        <NormalText caption="You are about to log out" style={styles.header} />
        <View style={styles.buttoncontainer}>
          <TouchableOpacity style={styles.deletebutton} onPress={confirmLogout}>
            <NormalText caption="Log out" style={styles.deletebuttontext} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelbutton} onPress={handleClose}>
            <NormalText caption="Cancel" style={styles.cancelbuttontext} />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

export default LogoutModal;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 30,
  },
  cancelbutton: {
    backgroundColor: "#f2f3f5",
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ba2a20",
    padding: 12,
  },
  deletebutton: {
    backgroundColor: "#ba2a20",
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 12,
  },
  buttoncontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 24,
  },
  deletebuttontext: {
    color: "#fff",
    fontSize: 12,
  },
  cancelbuttontext: {
    fontSize: 12,
  },
});
