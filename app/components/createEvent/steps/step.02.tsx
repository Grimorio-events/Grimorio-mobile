import { StyleSheet, Text, TextInput, View } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import React, { useEffect, useState } from "react";
import { colors } from "@/app/styles/colors";
import { EventData } from "@/app/interface/event.interface";

interface StepComponentProps {
  updateFormEvent: (field: string, value: any) => void;
  formEvent: EventData;
  updateStepValidity: (isValid: boolean) => void;
}

const AboutEvent: React.FC<StepComponentProps> = ({
  updateFormEvent,
  updateStepValidity,
  formEvent,
}) => {
  const [description, setDescription] = useState<string>(
    formEvent.description || ""
  );

  const handleChange = (text: string) => {
    const words = text.split(/\s+/).filter(Boolean);
    if (words.length <= 20) {
      setDescription(text);
      updateFormEvent("description", text);
    } else {
      console.log("La descripción no debe exceder las 20 palabras.");
    }
  };

  const isValidStep = () => {
    return description.trim().length > 0;
  };

  useEffect(() => {
    const isValid = isValidStep();
    updateStepValidity(isValid);
  }, [formEvent.description]);

  return (
    <Animated.View
      style={styles.container}
      entering={FadeInRight}
      exiting={FadeOutLeft}
    >
      <Text style={styles.title}>Cuéntanos de tu evento</Text>
      <Text style={styles.contentText}>
        Escribe una breve descripción de tu evento en 20 palabras o menos.
      </Text>
      <TextInput
        onChangeText={handleChange}
        placeholder="Aca tu descripción"
        style={styles.inputText}
        multiline={true}
        value={description}
      />
    </Animated.View>
  );
};

export default AboutEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.background,
    padding: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    // marginBottom: 30,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  contentText: {
    fontSize: 16,
    marginVertical: 10,
    letterSpacing: 1,
    lineHeight: 20,
  },
  inputText: {
    marginTop: 20,
    height: 200,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
  },
});
