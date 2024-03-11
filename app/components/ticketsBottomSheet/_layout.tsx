import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import Listings from "../listings";
import { colors } from "@/app/styles/colors";
import { Feather } from "@expo/vector-icons";
import { EventData } from "@/app/interface/event.interface";

interface Props {
  eventData: EventData[];
  category: string;
}

const TicketsBottomSheet = ({ category, eventData }: Props) => {
  const [listHeight, setListHeight] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const snapPoints = useMemo(() => ["4%", "100%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const showMap = () => {
    bottomSheetRef.current?.collapse();
    setRefresh(refresh + 1);
  };

  return (
    <BottomSheet
      index={1}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      style={styles.sheetContainer}
      enablePanDownToClose={false}
      handleIndicatorStyle={{ backgroundColor: colors.black }}
      handleStyle={{ backgroundColor: colors.backgorundEventList }}
    >
      <View
        style={styles.contentContainer}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setListHeight(height);
        }}
      >
        {listHeight > 0 && (
          <Listings
            eventData={eventData}
            category={category}
            refresh={refresh}
          />
        )}
        <View style={styles.absoluteBtn}>
          <TouchableOpacity onPress={showMap} style={styles.btn}>
            <Text style={styles.btnText}>Map</Text>
            <Feather name="map-pin" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: colors.backgorundEventList,
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  absoluteBtn: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  btn: {
    padding: 14,
    height: 50,
    borderRadius: 30,
    flexDirection: "row",
    backgroundColor: colors.black,
    marginHorizontal: "auto",
    alignItems: "center",
  },
  btnText: {
    color: colors.white,
    marginRight: 5,
  },
});

export default TicketsBottomSheet;
