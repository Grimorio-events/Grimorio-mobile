import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import useEventStore from "@/app/stores/eventStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import InfoCreateEvent from "./steps/step.00";
import EventType from "./steps/step.01";
import AboutEvent from "./steps/step.02";
import LocationEvent from "./steps/step.03";
import DateEvent from "./steps/step.04";
import ContentEvent from "./steps/step.05";
import EventImportantInfo from "./steps/step.06";
import EventDocuments from "./steps/step.07";
import FinishAndPublish from "./steps/step.08";

import styles from "./styles";

const CreateEvent = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const { stateEvent, increment, decrement } = useEventStore();

  const getStepContent = (step: number) => {
    switch (step) {
      case 1:
        return <InfoCreateEvent />;
      case 2:
        return <EventType />;
      case 3:
        return <AboutEvent />;
      case 4:
        return <LocationEvent />;
      case 5:
        return <DateEvent />;
      case 6:
        return <ContentEvent />;
      case 7:
        return <EventImportantInfo />;
      case 8:
        return <EventDocuments />;
      case 9:
        return <FinishAndPublish />;
      default:
        // Código que se ejecuta si `valor` no coincide con los casos anteriores
        return <Text>Unknown Step</Text>;
    }
  };

  useEffect(() => {
    console.log("🚀 ~ CreateEvent ~ stateEvent:", stateEvent);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [stateEvent]);

  const [formEvent, setFormEvent] = useState({
    address: "", // LocationEvent
    latitude: 0.0, // LocationEvent
    longitude: 0.0, // LocationEvent
    totalCapacity: 0, // DateEvent
    eventType: "", // EventType
    ticketPrice: 0, // DateEvent
    ownerId: user?.id || "", // User information
    description: "", // AboutEvent
    images: [], // ContentEvent
    eventDate: Date, // DateEvent
    eventEndDate: Date, // DateEvent
    categories: [], // EventType
    ticketPurchaseDeadline: Date, // DateEvent
    refundPolicy: "", // Automatic
    socialLinks: [], //
    rating: 0, // Automatic
    availableTickets: 0, // DateEvent
    ageRestriction: "", // EventImportantInfo
    organizerContact: "", // User information
    accessibilityInfo: "", // EventImportantInfo
    documents: [], // EventDocuments
  });
  // console.log("🚀 ~ CreateEvent ~ formEvent:", formEvent);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navCreate}>
        <TouchableOpacity>
          <Text>Exit</Text>
        </TouchableOpacity>
      </View>
      {/* <Animated.View entering={FadeInRight} exiting={FadeOutLeft}> */}
      {getStepContent(stateEvent)}
      {/* </Animated.View> */}
      <View style={styles.navCreate}>
        <TouchableOpacity style={styles.navBack} onPress={decrement}>
          <Ionicons name="caret-back" size={24} color="black" />
          <Text style={styles.navBackText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navNext} onPress={increment}>
          <Text style={styles.navNextText}>Next</Text>
          <Ionicons name="caret-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateEvent;
