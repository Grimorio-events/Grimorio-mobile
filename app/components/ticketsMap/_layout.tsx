import React, { useEffect, useRef, useState } from "react";
import { globalStyles } from "@/app/styles/styles";
import { View, StyleSheet, Text } from "react-native";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { ListingGeo } from "@/interfaces/listingGeo";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app/types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors } from "@/app/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import MapView from "react-native-map-clustering";

import * as Location from "expo-location";

interface Props {
  ticketsMap: any;
}

const INITIAL_REGION = {
  latitude: 37.33,
  longitude: -122,
  latitudeDelta: 2,
  longitudeDelta: 2,
};

type NavigationType = NativeStackNavigationProp<
  RootStackParamList,
  "TicketsMaps"
>;

const TicketsMaps = ({ ticketsMap }: Props) => {
  const navigation = useNavigation<NavigationType>();
  const mapRef = useRef<any>(null);

  // Permisos para ingresar a la locacion
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Cuando el componente este montado, localiceme
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 1,
        longitudeDelta: 1,
      };

      mapRef.current?.animateToRegion(region);

      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;
    const points = properties.point_count;

    return (
      <Marker
        key={`cluster-${id}`}
        onPress={onPress}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
      >
        <View style={styles.markerCluster}>
          <Text style={styles.markerTextCluster}>{points}</Text>
        </View>
      </Marker>
    );
  };

  return (
    <View style={globalStyles.defaultContainer}>
      <MapView
        animationEnabled={false}
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation={true}
        showsMyLocationButton
        clusterColor={colors.primary}
        clusterTextColor={colors.white}
        renderCluster={renderCluster}
        spiralEnabled={false}
      >
        {ticketsMap.features.map((item: ListingGeo) => (
          <Marker
            key={item.properties.id}
            onPress={() =>
              navigation.navigate("DetailsPage", { id: item.properties.id })
            }
            coordinate={{
              latitude: +item.properties.latitude,
              longitude: +item.properties.longitude,
            }}
          >
            <View style={styles.marker}>
              <Ionicons name="ticket-outline" size={24} color={colors.white} />
              {/* <Text style={styles.markerText}>$ {item.properties.price}</Text> */}
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  marker: {
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 8,
  },
  markerCluster: {
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 8,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  markerTextCluster: {
    color: colors.primary,
  },
  markerText: {
    color: colors.white,
  },
});

export default TicketsMaps;
