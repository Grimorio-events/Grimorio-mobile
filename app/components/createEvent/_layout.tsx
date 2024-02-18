import React, { useState } from "react";
import { View, Text } from "react-native";
import { globalStyles } from "@/app/styles/styles";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { useUser } from "@clerk/clerk-expo";
import useEventStore from "@/app/stores/eventStore";

import styles from "./styles";

const CreateEvent = () => {
  const { user } = useUser();
  const { stateEvent, increment, decrement } = useEventStore();
  console.log("🚀 ~ CreateEvent ~ stateEvent:", stateEvent);

  const [formEvent, setFormEvent] = useState({
    address: "",
    latitude: 0.0,
    longitude: 0.0,
    totalCapacity: 0,
    eventType: "",
    ticketPrice: 0,
    ownerId: user?.id || "",
    description: "",
    images: [],
    eventDate: Date,
    eventEndDate: Date,
    categories: [],
    ticketPurchaseDeadline: Date,
    refundPolicy: "",
    socialLinks: [],
    rating: 0,
    availableTickets: 0,
    ageRestriction: "",
    organizerContact: "",
    accessibilityInfo: "",
    documents: [],
  });
  console.log("🚀 ~ CreateEvent ~ formEvent:", formEvent);

  return (
    <View style={globalStyles.container}>
      <Animated.View entering={FadeInRight} exiting={FadeOutLeft}>
        <Text>Create Event</Text>
      </Animated.View>
    </View>
  );
};

export default CreateEvent;
