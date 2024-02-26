import { StyleSheet, Text, TextInput, View } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import React, { useEffect, useState } from "react";
import { colors } from "@/app/styles/colors";
import useFormEventStore from "@/app/stores/formEventStore";

interface StepComponentProps {
  updateStepValidity: (isValid: boolean) => void;
}

const AboutEvent: React.FC<StepComponentProps> = ({ updateStepValidity }) => {
  const { stateFormEvent, updateFormEvent } = useFormEventStore();
  const [title, setTitle] = useState<string>(stateFormEvent.title || "");
  const [description, setDescription] = useState<string>(
    stateFormEvent.description || ""
  );

  const handleChange = (field: "title" | "description", text: string) => {
    if (field === "description") {
      const words = text.split(/\s+/).filter(Boolean);
      if (words.length <= 17) {
        setDescription(text);
        updateFormEvent("description", text);
      } else {
        console.log("La descripción no debe exceder las 20 palabras.");
      }
    } else if (field === "title") {
      if (text.length <= 20) {
        setTitle(text);
        updateFormEvent("title", text);
      } else {
        console.log("El título no debe exceder los 17 caracteres.");
      }
    }
  };

  const isValidStep = () => {
    return description.trim().length > 0 && title.trim().length > 0;
  };

  useEffect(() => {
    const isValid = isValidStep();
    updateStepValidity(isValid);
  }, [stateFormEvent.description, stateFormEvent.title]);

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
        onChangeText={(text) => handleChange("description", text)}
        placeholder="Aca tu descripción"
        style={styles.inputText}
        multiline={true}
        value={description}
      />
      <Text style={styles.title}>Titulo de tu evento</Text>
      <Text style={styles.contentText}>
        Dale un titulo llamativo a tu evento (maximo 17 caracteres).
      </Text>
      <TextInput
        onChangeText={(text) => handleChange("title", text)}
        placeholder="Titulo"
        style={styles.inputTextTitle}
        multiline={false}
        value={title}
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
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
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
    marginBottom: 30,
  },
  inputTextTitle: {
    marginTop: 20,
    height: 50,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
