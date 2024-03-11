import TicketsBottomSheet from "@/app/components/TicketsBottomSheet/_layout";
import TicketsMaps from "@/app/components/ticketsMap/_layout";
import TicketsMapData from "@/assets/data/airbnb-listings.geo.json";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useQuery } from "@apollo/client";
import { ActivityIndicator, Text, View } from "react-native";
import { colors } from "@/app/styles/colors";
import { globalStyles } from "@/app/styles/styles";
import { GET_EVENTS } from "@/app/graphql/queries";

interface Props {
  category: string;
}

const ExploreScren = ({ category }: Props) => {
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading)
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );

  if (error)
    return (
      <View style={globalStyles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TicketsMaps ticketsMap={TicketsMapData} />
      <TicketsBottomSheet eventData={data.events} category={category} />
    </GestureHandlerRootView>
  );
};

export default ExploreScren;
