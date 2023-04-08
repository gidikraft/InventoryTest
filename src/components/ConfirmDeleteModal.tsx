import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { RefObject, useMemo, useCallback } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { NormalText } from "./CustomText";

type DeleteModalTypes = {
  deleteModalRef: RefObject<BottomSheet>;
  handleClose: () => void;
  confirmDelete: () => void;
};

const ConfirmDeleteModal = (props: DeleteModalTypes) => {
  const { deleteModalRef, handleClose, confirmDelete } = props;

  const renderBackdrop = useCallback(
    prop => (
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
        <NormalText
          caption="Are you sure yu want to delete this item"
          style={styles.header}
        />
        <View style={styles.buttoncontainer}>
          <TouchableOpacity style={styles.deletebutton} onPress={confirmDelete}>
            <NormalText caption="Delete" style={styles.deletebuttontext} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelbutton} onPress={handleClose}>
            <NormalText caption="Cancel" style={styles.cancelbuttontext} />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

export default ConfirmDeleteModal;

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
