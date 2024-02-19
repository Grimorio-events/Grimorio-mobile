import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import React from "react";

const EventType = () => {
  return (
    <Animated.View
      style={styles.container}
      entering={FadeInRight}
      exiting={FadeOutLeft}
    >
      <Text>Event Type</Text>
      <Text>Que tipo de evento vas a realziar?</Text>
      <Text>Listado de categorias:</Text>
      <Text>Privado</Text>
    </Animated.View>
  );
};

export default EventType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
