import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { globalStyles } from "@/app/styles/styles";
import { gql, useQuery } from "@apollo/client";
import { colors } from "@/app/styles/colors";
import TicketEvent from "@/app/components/ticketEvent/_layout";
import { AntDesign } from "@expo/vector-icons";
import { useCounterStore } from "@/app/stores/ticketPurcheStore";
import useAuthToken from "@/app/hooks/useAuthToken";
import ModalBuyTicket from "@/app/components/modal/modal.buyTicket";
import ModalLogin from "@/app/components/modal/modal.login";
import { useUser } from "@clerk/clerk-expo";

import styles from "./styles";

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
  const { token, sessionId } = useAuthToken();
  const { user } = useUser();
  const { count, increment, decrement } = useCounterStore();
  const { id } = useLocalSearchParams();
  const { data, loading, error, refetch } = useQuery(GET_EVENT_BY_ID, {
    variables: { id },
  });

  const [modalSate, setModalSate] = useState(false);

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
  const eventId = event?.id;
  const userId = user?.id;
  const totalCost = (count * event?.ticketPrice).toFixed(2);

  // Después de la compra exitosa, llama a refetch para actualizar los datos
  const handleBuySuccess = async () => {
    await refetch();
  };

  return (
    <View style={globalStyles.container}>
      <TicketEvent data={event} />
      <View style={styles.navBuy}>
        <View style={styles.selectQuantity}>
          <TouchableOpacity onPress={decrement}>
            <AntDesign name="minussquare" size={28} color={colors.black} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>{count}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={increment}>
            <AntDesign name="plussquare" size={28} color={colors.black} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.btnBuy}
          onPress={() => setModalSate(true)}
        >
          <Text style={styles.textBtn}>Comprar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={modalSate}
        animationType="fade"
        onRequestClose={() => setModalSate(false)}
      >
        <View style={styles.modal}>
          {token && sessionId ? (
            <ModalBuyTicket
              event={event}
              totalCost={totalCost}
              count={count}
              eventId={eventId}
              token={token}
              sessionId={sessionId}
              setModalSate={setModalSate}
              userId={userId}
              handleBuySuccess={handleBuySuccess}
            />
          ) : (
            <ModalLogin setModalSate={setModalSate} />
          )}
        </View>
      </Modal>
    </View>
  );
};

export default DetailsPage;
