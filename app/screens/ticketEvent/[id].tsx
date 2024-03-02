import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { globalStyles } from "@/app/styles/styles";
import { gql, useQuery } from "@apollo/client";
import { colors } from "@/app/styles/colors";
import TicketEvent from "@/app/components/ticketEvent/_layout";

const GET_EVENT_BY_ID = gql`
  query GetEventById($id: String!) {
    event(id: $id) {
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

const DetailsPage = () => {
  const { id } = useLocalSearchParams();
  const { data, loading, error } = useQuery(GET_EVENT_BY_ID, {
    variables: { id },
  });

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

  const event = data?.event;

  return (
    <View style={globalStyles.container}>
      <TicketEvent data={event} />
    </View>
  );
};

export default DetailsPage;
