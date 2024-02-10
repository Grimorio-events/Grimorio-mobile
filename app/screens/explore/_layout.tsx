import { useMemo } from "react";
import listingsData from "@/assets/data/airbnb-listings.json";
import TicketsMaps from "@/app/components/ticketsMap/_layout";
import TicketsMapData from "@/assets/data/airbnb-listings.geo.json";
import TicketsBottomSheet from "@/app/components/ticketsBottomSheet/_layout";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface Props {
  category: string;
}

const ExploreScren = ({ category }: Props) => {
  const items = useMemo(() => listingsData as any, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TicketsMaps ticketsMap={TicketsMapData} />
      <TicketsBottomSheet listings={items} category={category} />
    </GestureHandlerRootView>
  );
};

export default ExploreScren;
