import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app/types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface ListingItem {
  id: string;
  title: string;
}

interface props {
  listings: any[];
  category: string;
}

type NavigationType = NativeStackNavigationProp<RootStackParamList, "Listings">;

const Listings = ({ listings: items, category }: props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlashList<ListingItem>>(null);

  const navigation = useNavigation<NavigationType>();

  useEffect(() => {
    console.log("Reload Listing: ", items.length);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow = ({ item }: { item: ListingItem }) => (
    <View style={{ flexDirection: "row" }}>
      <Text onPress={() => navigation.navigate("DetailsPage", { id: item.id })}>
        Go there
      </Text>
      <Text style={{ marginLeft: 10 }}>{item.id}</Text>
    </View>
  );

  return (
    <View>
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

export default Listings;
