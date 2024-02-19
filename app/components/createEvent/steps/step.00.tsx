import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import React from "react";

const InfoCreateEvent = () => {
  return (
    <Animated.View
      style={styles.container}
      entering={FadeInRight}
      exiting={FadeOutLeft}
    >
      <Text>Info Create Event</Text>
    </Animated.View>
  );
};

export default InfoCreateEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
