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
  const { count, increment, decrement } = useCounterStore();
  const { id } = useLocalSearchParams();
  const { data, loading, error } = useQuery(GET_EVENT_BY_ID, {
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
  const totalCost = (count * event?.ticketPrice).toFixed(2);

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
          <View style={styles.modalView}>
            <View style={styles.containerModal}>
              <View style={styles.InfoModal}>
                <Text style={styles.textInfoModal}>Valor por ticket: </Text>
                <Text style={styles.textInfoModal}>${event?.ticketPrice}</Text>
              </View>
              <View style={styles.InfoModal}>
                <Text style={styles.textInfoModal}>Cantidad de tickets: </Text>
                <Text style={styles.textInfoModal}>{count}</Text>
              </View>
              <View style={styles.InfoModal}>
                <Text style={styles.textTotalModal}>Total: </Text>
                <Text style={styles.textTotalModal}>${totalCost}</Text>
              </View>
            </View>
            <View style={styles.btnModal}>
              <TouchableOpacity
                style={styles.btnCancel}
                onPress={() => setModalSate(false)}
              >
                <Text style={styles.textBtn}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnBuy}
                onPress={() => setModalSate(false)}
              >
                <Text style={styles.textBtn}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DetailsPage;
