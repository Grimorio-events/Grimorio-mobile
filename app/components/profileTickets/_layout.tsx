import { Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { TicketData } from "@/app/interface/ticket.interface";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

interface props {
  ticketData: any[];
}

const OptionProfileTickets = ({ ticketData: items }: props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlashList<TicketData>>(null);

  const renderRow = ({ item }: { item: TicketData }) => (
    <Text>Ticket: {item.id}</Text>
  );

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
        keyExtractor={(item: TicketData, index) => item.id || String(index)}
        ListEmptyComponent={<Text>Not found or Empty section</Text>}
        renderScrollComponent={ScrollView}
      />
    </GestureHandlerRootView>
  );
};

export default OptionProfileTickets;
