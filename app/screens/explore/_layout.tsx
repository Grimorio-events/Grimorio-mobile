import { useUser } from "@clerk/clerk-expo";
import { globalStyles } from "../../styles/styles";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMemo, useState } from "react";
import listingsData from "@/assets/data/airbnb-listings.json";
import Listings from "../../components/listings";

const ExploreScren = () => {
  const { user } = useUser();
  const [category, setCategory] = useState<string>("Events");
  const items = useMemo(() => listingsData as any, []);

  return (
    <View style={globalStyles.defaultContainer}>
      {/* <SafeAreaView style={globalStyles.defaultContainer}> */}
      <Listings listings={items} category={category} />
      {/* </SafeAreaView> */}
    </View>
  );
};

export default ExploreScren;
