import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { colors } from "@/app/styles/colors";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/types/types";
import useFormEventStore from "@/app/stores/formEventStore";

import * as Location from "expo-location";

interface LocationState {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface LocationUpdate {
  latitude: number;
  longitude: number;
}

interface MapPressEvent {
  nativeEvent: {
    coordinate: {
      latitude: number;
      longitude: number;
    };
  };
}

interface StepComponentProps {
  updateStepValidity: (isValid: boolean) => void;
}

type NavigationType = NativeStackNavigationProp<
  RootStackParamList,
  "LocationEvent"
>;

const LocationEvent: React.FC<StepComponentProps> = ({
  updateStepValidity,
}) => {
  const { stateFormEvent, updateFormEvent, stateAddress } = useFormEventStore();
  const [region, setRegion] = useState<LocationState | LocationUpdate>({
    latitude: stateFormEvent.latitude || 37.33,
    longitude: stateFormEvent.longitude || -122,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const INITIAL_REGION = {
    latitude: stateFormEvent.latitude || 37.33,
    longitude: stateFormEvent.longitude || -122,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const navigation = useNavigation<NavigationType>();
  const mapRef = useRef<any>(null);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }
    mapRef.current?.animateToRegion(region);
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const handleMapPress = (event: MapPressEvent) => {
    const newLocation = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    };
    setRegion(newLocation);

    updateFormEvent("latitude", event.nativeEvent.coordinate.latitude);
    updateFormEvent("longitude", event.nativeEvent.coordinate.longitude);
  };

  const isValidStep = () => {
    const latitude = stateFormEvent.latitude !== 0.0;
    const longitude = stateFormEvent.longitude !== 0.0;
    const addressComplete = stateAddress;
    return latitude && longitude && addressComplete;
  };

  useEffect(() => {
    const isValid = isValidStep();
    updateStepValidity(isValid);
  }, [stateFormEvent.latitude, stateFormEvent.longitude, stateAddress]);

  return (
    <Animated.View
      style={styles.container}
      entering={FadeInRight}
      exiting={FadeOutLeft}
    >
      <Text style={styles.title}>Location Event</Text>
      <View style={styles.container}>
        <MapView
          style={StyleSheet.absoluteFill}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton
          initialRegion={INITIAL_REGION}
          ref={mapRef}
          onPress={handleMapPress}
        >
          <Marker coordinate={region} />
        </MapView>
        <View style={styles.absoluteModal}>
          <TouchableOpacity
            style={styles.addressModal}
            onPress={() => navigation.navigate("ModalLocation")}
          >
            <Entypo name="location-pin" size={24} color="black" />
            <Text>Set your address</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default LocationEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.background,
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 30,
    paddingLeft: 40,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "500",
    paddingLeft: 40,
  },
  absoluteModal: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  addressModal: {
    width: "80%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 15,
    padding: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
