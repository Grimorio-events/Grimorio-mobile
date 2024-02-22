import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import React, { useEffect, useState } from "react";
import { colors } from "@/app/styles/colors";
import useFormEventStore from "@/app/stores/formEventStore";
import { Fontisto, Foundation } from "@expo/vector-icons";

interface StepComponentProps {
  updateStepValidity: (isValid: boolean) => void;
}

const EventImportantInfo: React.FC<StepComponentProps> = ({
  updateStepValidity,
}) => {
  const { stateFormEvent, updateFormEvent } = useFormEventStore();
  const [isAgeRestrictionSelected, setIsAgeRestrictionSelected] = useState(
    stateFormEvent.ageRestriction ? true : false
  );
  const [isAccessibilitySelected, setIsAccessibilitySelected] = useState(
    stateFormEvent.accessibilityInfo ? true : false
  );

  const toggleAgeRestriction = () => {
    const newState = !isAgeRestrictionSelected;
    setIsAgeRestrictionSelected(newState);
    updateFormEvent(
      "ageRestriction",
      newState ? "Este evento es exclusivamente para mayores de 18 años." : ""
    );
  };

  const toggleAccessibility = () => {
    const newState = !isAccessibilitySelected;
    setIsAccessibilitySelected(newState);
    updateFormEvent(
      "accessibilityInfo",
      newState
        ? "Dispone de facilidades de acceso para personas con discapacidad, garantizando su comodidad y adaptación."
        : ""
    );
  };

  useEffect(() => {
    updateStepValidity(true);
  }, [isAgeRestrictionSelected, isAccessibilitySelected]);

  return (
    <Animated.View
      style={styles.container}
      entering={FadeInRight}
      exiting={FadeOutLeft}
    >
      <Text style={styles.title}>Información importante</Text>
      <Text style={styles.contentText}>
        Si tu evento incluye restricciones de edad o cuenta con facilidades de
        acceso para personas con discapacidad, por favor, presta atención a la
        siguiente sección.
      </Text>
      <View style={styles.content}>
        <TouchableOpacity
          style={[
            styles.btnSelect,
            isAgeRestrictionSelected && styles.btnSelected,
          ]}
          onPress={toggleAgeRestriction}
        >
          <View style={styles.iconSection}>
            <Foundation name="prohibited" size={40} color="black" />
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.subTitle}>Restricciones</Text>
            <Text style={styles.contentText}>
              Este evento es exclusivamente para mayores de 18 años.
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btnSelect,
            isAccessibilitySelected && styles.btnSelected,
          ]}
          onPress={toggleAccessibility}
        >
          <View style={styles.iconSection}>
            <Fontisto name="paralysis-disability" size={40} color="black" />
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.subTitle}>Accesibilidad</Text>
            <Text style={styles.contentText}>
              Dispone de facilidades de acceso para personas con discapacidad,
              garantizando su comodidad y adaptación.
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default EventImportantInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.background,
    padding: 30,
  },
  content: {
    alignItems: "center",
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 30,
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
  btnSelect: {
    width: "90%",
    height: 150,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.black,
    backgroundColor: colors.background,
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  btnSelected: {
    width: "90%",
    height: 150,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.black,
    backgroundColor: colors.backgorundEventList,
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  iconSection: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  infoSection: {
    width: "75%",
  },
});
