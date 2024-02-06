import { View, Text } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { globalStyles } from "../../styles/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Listing from "../../components/listings";
import { useMemo, useState } from "react";
import listingsData from "@/assets/data/airbnb-listings.json";

const ExploreScren = () => {
  const { user } = useUser();
  const [category, setCategory] = useState<string>("Events");
  const items = useMemo(() => listingsData as any, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={globalStyles.container}>
        <Listing listings={items} category={category} />
      </View>
    </SafeAreaView>
  );
};

export default ExploreScren;
