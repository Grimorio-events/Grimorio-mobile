import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Keyboard } from "react-native";
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
import useFormEventStore from "@/app/stores/formEventStore";
import { createEvent } from "@/app/utils/event.service";
import useAuthToken from "@/app/hooks/useAuthToken";

import styles from "./styles";

const CreateEvent = () => {
  const { user } = useUser();
  const { token, sessionId } = useAuthToken();
  const [loading, setLoading] = useState(false);
  const { stateEvent, increment, decrement } = useEventStore();
  const { stateFormEvent } = useFormEventStore();
  const [isCurrentStepValid, setIsCurrentStepValid] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const { updateFormEvent } = useFormEventStore();

  const updateStepValidity = (isValid: boolean) => {
    setIsCurrentStepValid(isValid);
  };

  const handleSubmitEvent = async (event: any) => {
    event.preventDefault();
    if (token && sessionId) {
      try {
        const creteEvent = await createEvent(stateFormEvent, token, sessionId);
        console.log("🚀 ~ handleSubmitEvent ~ creteEvent:", creteEvent);
      } catch (error) {
        console.error("Error Create Event:", error);
      }
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 1:
        return <InfoCreateEvent updateStepValidity={updateStepValidity} />;
      case 2:
        return <EventType updateStepValidity={updateStepValidity} />;
      case 3:
        return <AboutEvent updateStepValidity={updateStepValidity} />;
      case 4:
        return <LocationEvent updateStepValidity={updateStepValidity} />;
      case 5:
        return <DateEvent updateStepValidity={updateStepValidity} />;
      case 6:
        return <ContentEvent updateStepValidity={updateStepValidity} />;
      case 7:
        return <EventImportantInfo updateStepValidity={updateStepValidity} />;
      case 8:
        return <EventDocuments updateStepValidity={updateStepValidity} />;
      case 9:
        return <FinishAndPublish />;
      default:
        // Código que se ejecuta si `step` no coincide con los casos anteriores
        return <Text>Unknown Step</Text>;
    }
  };

  useEffect(() => {
    console.log("🚀 ~ CreateEvent ~ stateEvent:", stateEvent);
    setLoading(true);

    updateFormEvent("ownerId", user?.id);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [stateEvent]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // Establece el estado a true cuando el teclado se muestra
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // Establece el estado a false cuando el teclado se oculta
      }
    );

    return () => {
      // Limpieza de los listeners
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <>
      {stateEvent !== 9 ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.navHeader}>
            <TouchableOpacity>
              <Text>Exit</Text>
            </TouchableOpacity>
          </View>
          {getStepContent(stateEvent)}
          {!keyboardVisible && (
            <View style={styles.navCreate}>
              <TouchableOpacity style={styles.navBack} onPress={decrement}>
                <Ionicons name="caret-back" size={24} color="black" />
                <Text style={styles.navBackText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  isCurrentStepValid ? styles.navNext : styles.navNextDisable
                }
                onPress={increment}
                disabled={!isCurrentStepValid}
              >
                <Text style={styles.navNextText}>Next</Text>
                <Ionicons name="caret-forward" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      ) : (
        <View style={styles.container}>
          {getStepContent(stateEvent)}
          {!keyboardVisible && (
            <View style={styles.navCreate}>
              <TouchableOpacity style={styles.navBack} onPress={decrement}>
                <Ionicons name="caret-back" size={24} color="black" />
                <Text style={styles.navBackText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  isCurrentStepValid ? styles.navNext : styles.navNextDisable
                }
                onPress={handleSubmitEvent}
                disabled={!isCurrentStepValid}
              >
                <Text style={styles.navNextText}>Finalizar y Publicar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default CreateEvent;
