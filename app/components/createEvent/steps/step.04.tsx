import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import React from "react";

const DateEvent = () => {
  return (
    <Animated.View
      style={styles.container}
      entering={FadeInRight}
      exiting={FadeOutLeft}
    >
      <Text>Date Event</Text>
      <Text>Capacity: 10</Text>
      <Text>Avaible Tickets: 10</Text>
      <Text>Ticket price $10.0</Text>
      <Text>Start Event 01/01/2024</Text>
      <Text>End Event 01/01/2024</Text>
      <Text>Ticket purchase dead line</Text>
    </Animated.View>
  );
};

export default DateEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
