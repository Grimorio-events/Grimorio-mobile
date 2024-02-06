import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app/types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootObject } from "@/app/interface/listing";

interface props {
  listings: any[];
  category: string;
}

type NavigationType = NativeStackNavigationProp<RootStackParamList, "Listings">;

const Listings = ({ listings: items, category }: props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlashList<RootObject>>(null);

  const navigation = useNavigation<NavigationType>();

  useEffect(() => {
    console.log("Reload Listing: ", items.length);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow = ({ item }: { item: RootObject }) => (
    <View style={styles.individualRow}>
      <Text onPress={() => navigation.navigate("DetailsPage", { id: item.id })}>
        Go there
      </Text>
      <Text style={{ marginLeft: 10 }}>{item.name}</Text>
      <Text style={{ marginLeft: 10 }}>{item.last_scraped}</Text>
    </View>
  );

  return (
    <View style={styles.explore}>
      <Text>Listing for category: {category} </Text>
      <FlashList
        data={loading ? [] : items}
        renderItem={renderRow}
        ref={listRef}
        estimatedItemSize={100}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  explore: {
    paddingTop: 5,
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  individualRow: {
    paddingTop: 5,
    backgroundColor: "blue",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    paddingBottom: 20,
    overflow: "hidden",
  },
});

export default Listings;
