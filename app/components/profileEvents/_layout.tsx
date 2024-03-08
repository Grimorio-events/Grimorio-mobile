import { StyleSheet, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { EventData } from "@/app/interface/event.interface";
import ListCard from "../ticketCard/_layout";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

interface props {
  eventData: any[];
}

const OptionProfileSelect = ({ eventData: items }: props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlashList<EventData>>(null);

  const renderRow = ({ item }: { item: EventData }) => <ListCard item={item} />;

  useEffect(() => {
    console.log("Reload Listing: ", items.length);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FlashList
        data={loading ? [] : items}
        renderItem={renderRow}
        ref={listRef}
        estimatedItemSize={20}
        keyExtractor={(item: EventData, index) => item.id || String(index)}
        ListEmptyComponent={<Text>Not found or Empty section</Text>}
        renderScrollComponent={ScrollView}
      />
    </GestureHandlerRootView>
  );
};

export default OptionProfileSelect;
