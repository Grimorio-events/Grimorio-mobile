import TicketsBottomSheet from "@/app/components/TicketsBottomSheet/_layout";
import TicketsMaps from "@/app/components/ticketsMap/_layout";
import TicketsMapData from "@/assets/data/airbnb-listings.geo.json";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { gql, useQuery } from "@apollo/client";
import { ActivityIndicator, Text, View } from "react-native";
import { colors } from "@/app/styles/colors";
import { globalStyles } from "@/app/styles/styles";

interface Props {
  category: string;
}

const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      title
      description
      address
      latitude
      longitude
      totalCapacity
      eventType
      ticketPrice
      ownerId
      eventDate
      eventEndDate
      status
      categories
      ticketPurchaseDeadline
      refundPolicy
      socialLinks
      rating
      availableTickets
      ageRestriction
      organizerContact
      accessibilityInfo
      createdAt
      updatedAt
      images
      documents
    }
  }
`;

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
