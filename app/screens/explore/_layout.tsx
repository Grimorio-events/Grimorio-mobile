import { globalStyles } from "../../styles/styles";
import { View } from "react-native";
import { useMemo } from "react";
import listingsData from "@/assets/data/airbnb-listings.json";
import Listings from "../../components/listings";

interface Props {
  category: string;
}

const ExploreScren = ({ category }: Props) => {
  const items = useMemo(() => listingsData as any, []);

  return (
    <View style={globalStyles.defaultContainer}>
      <Listings listings={items} category={category} />
    </View>
  );
};

export default ExploreScren;
