import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { Image } from "expo-image";

interface StepComponentProps {
  updateStepValidity: (isValid: boolean) => void;
}

const InfoCreateEvent: React.FC<StepComponentProps> = ({
  updateStepValidity,
}) => {
  useEffect(() => {
    updateStepValidity(true);
  }, []);

  return (
    <Animated.View
      style={styles.container}
      entering={FadeInRight}
      exiting={FadeOutLeft}
    >
      <View style={styles.containerImg}>
        <Image
          style={styles.image}
          source={require("../../../../assets/imgEventSteps/step01_00.png")}
          // source={{ uri: "../../../../assets/imgEventSteps/step01_00.png" }} // Para imagenes remotas
          contentFit="contain"
          transition={1000}
        />
      </View>
      {/* <Text style={styles.subTitle}>Step 1</Text> */}
      <Text style={styles.title}>Cuentanos sobre tu Evento</Text>
      <Text style={styles.contentText}>
        Queremos saber qué tipo de evento tienes en mente y nos encantaría que
        nos compartas algunos detalles sobre él. También, nos interesa conocer
        la capacidad de asistentes que esperas y el lugar donde planeas llevarlo
        a cabo.
      </Text>
    </Animated.View>
  );
};

export default InfoCreateEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    padding: 40,
  },
  containerImg: {
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250,
    marginVertical: 40,
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
});
