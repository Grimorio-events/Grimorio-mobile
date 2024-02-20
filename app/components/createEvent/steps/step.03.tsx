import { StyleSheet, Text, TextInput, View } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { colors } from "@/app/styles/colors";
import { EventData } from "@/app/interface/event.interface";
import axios from "axios";

import * as Location from "expo-location";

interface LocationState {
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
  updateFormEvent: (field: string, value: any) => void;
  formEvent: EventData;
  updateStepValidity: (isValid: boolean) => void;
}

const LocationEvent: React.FC<StepComponentProps> = ({
  formEvent,
  updateStepValidity,
  updateFormEvent,
}) => {
  const [location, setLocation] = useState<LocationState | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState({
    latitude: formEvent.latitude || 37.33,
    longitude: formEvent.longitude || -122,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const handleMapPress = (event: MapPressEvent) => {
    const newLocation = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    };
    setLocation(newLocation);

    updateFormEvent("latitude", event.nativeEvent.coordinate.latitude);
    updateFormEvent("longitude", event.nativeEvent.coordinate.longitude);
  };

  // Servicio de Google map con Costo
  // const searchLocation = async (searchTerm) => {
  //   const apiKey = "AIzaSyAUggwmx7i_gDxU-mC411Se1QNcep7y6ho"; // Costo adicional (Importante!)
  //   const response = await axios.get(
  //     `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  //       searchTerm
  //     )}&key=${apiKey}`
  //   );

  //   if (response.data.status === "OK") {
  //     const { lat, lng } = response.data.results[0].geometry.location;

  //     // Actualiza el estado o la referencia del mapa para centrarlo en estas coordenadas
  //     console.log(lat, lng);
  //     setRegion({
  //       ...region,
  //       latitude: lat,
  //       longitude: lng,
  //     });
  //   } else {
  //     console.error("No se encontraron resultados.");
  //   }
  // };

  const isValidStep = () => {
    const latitude = formEvent.latitude !== 0.0;
    const longitude = formEvent.longitude !== 0.0;
    return latitude && longitude;
  };

  useEffect(() => {
    const isValid = isValidStep();
    updateStepValidity(isValid);
  }, [formEvent.latitude, formEvent.longitude]);

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
          initialRegion={region}
          region={region}
          onPress={handleMapPress}
        >
          {location && <Marker coordinate={location} />}
        </MapView>
        <View style={styles.absoluteSearch}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar ubicación..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            // onSubmitEditing={() => searchLocation(searchTerm)}
          />
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
    paddingTop: 40,
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
  absoluteSearch: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  searchInput: {
    width: "80%",
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
