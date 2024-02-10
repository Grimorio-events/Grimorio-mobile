import React, { useEffect, useRef, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { ListingItem } from "@/interfaces/listing";
import ListCard from "../ticketCard/_layout";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, Text } from "react-native";
import { colors } from "@/app/styles/colors";

interface props {
  listings: any[];
  category: string;
  refresh: number;
}

const Listings = ({ listings: items, category, refresh }: props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlashList<ListingItem>>(null);

  useEffect(() => {
    if (refresh) {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  }, [refresh]);

  useEffect(() => {
    console.log("Reload Listing: ", items.length);
    console.log("🚀 ~ Listings ~ category:", category);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow = ({ item }: { item: ListingItem }) => (
    <ListCard item={item} />
  );

  return (
    <FlashList
      data={loading ? [] : items}
      renderItem={renderRow}
      ref={listRef}
      estimatedItemSize={100}
      keyExtractor={(item) => item.id}
      renderScrollComponent={ScrollView}
      ListHeaderComponent={
        <Text style={styles.info}>{items.length} Events</Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  info: {
    textAlign: "center",
    backgroundColor: colors.white,
    fontSize: 16,
    padding: 4,
  },
});

export default Listings;
