import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import listingsData from "@/assets/data/airbnb-listings.json";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "@/app/styles/styles";

const DetailsPage = () => {
  const { id } = useLocalSearchParams();
  console.log("🚀 ~ DetailsPage ~ id:", id);
  const listing = (listingsData as any[]).find((item) => item.id === id);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={globalStyles.container}>
        <Text>DetailsPage</Text>
        <Text>{listing.name}</Text>
      </View>
    </SafeAreaView>
  );
};

export default DetailsPage;
