import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "@/app/styles/colors";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import useFormEventStore from "@/app/stores/formEventStore";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app/types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationType = NativeStackNavigationProp<
  RootStackParamList,
  "ModalLocation"
>;

const ModalLocation = () => {
  const navigation = useNavigation<NavigationType>();
  const { stateFormEvent, updateFormEvent, updateStatusAddress } =
    useFormEventStore();

  const parts = stateFormEvent.address.split(", ");

  const [streetAddress, setStreetAddress] = useState(parts[0] || "");
  const [apartment, setApartment] = useState(parts[1] || "");
  const [city, setCity] = useState(parts[2] || "");
  const [department, setDepartment] = useState(parts[3] || "");
  const [postalCode, setPostalCode] = useState("");

  const updateAddress = () => {
    const parts = [streetAddress, apartment, city, department, postalCode];
    const fullAddress = parts.filter(Boolean).join(", ");
    updateFormEvent("address", fullAddress);
  };

  const [region, setRegion] = useState({
    latitude: stateFormEvent.latitude || 37.33,
    longitude: stateFormEvent.longitude || -122,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const initialRegion = {
    latitude: stateFormEvent.latitude || 37.33,
    longitude: stateFormEvent.longitude || -122,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const renderTextInputWithLabel = (
    label: string,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={(text) => {
          setValue(text);
          updateAddress();
        }}
      />
    </View>
  );

  const isFormValid = () => {
    return streetAddress && apartment && city && department;
  };

  const handleSubmit = () => {
    updateStatusAddress(true);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.conteinerInputs}>
          {renderTextInputWithLabel(
            "Dirección",
            streetAddress,
            setStreetAddress
          )}
          {renderTextInputWithLabel(
            "Apt, Casa, Bloq (Si aplica)",
            apartment,
            setApartment
          )}
          {renderTextInputWithLabel("Ciudad", city, setCity)}
          {renderTextInputWithLabel("Departamento", department, setDepartment)}
          {renderTextInputWithLabel(
            "Codigo postal (opcional)",
            postalCode,
            setPostalCode
          )}
        </View>
        <View style={styles.containerInfo}>
          <Text style={styles.subTitle}>Ubicación del Evento</Text>
          <Text style={styles.contentText}>
            Procura ser lo más claro posible al indicarles a los asistentes la
            ubicación. Esto facilitará su llegada y acomodo al empezar el
            evento.
          </Text>
        </View>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={region}
            scrollEnabled={false}
            zoomEnabled={false}
            rotateEnabled={false}
            pitchEnabled={false}
            scrollDuringRotateOrZoomEnabled={false}
          >
            <Marker
              coordinate={{
                latitude: initialRegion.latitude,
                longitude: initialRegion.longitude,
              }}
            />
          </MapView>
        </View>
      </ScrollView>
      <View style={styles.containerBtn}>
        <TouchableOpacity
          style={
            (styles.btnActive,
            isFormValid() ? styles.btnActive : styles.btnInactive)
          }
          disabled={!isFormValid()}
          onPress={handleSubmit}
        >
          <Text style={styles.btnText}>Luce bien</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 120,
    backgroundColor: colors.background,
  },
  containerInfo: {
    paddingTop: 30,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "500",
    paddingHorizontal: 40,
  },
  contentText: {
    fontSize: 16,
    marginVertical: 10,
    letterSpacing: 1,
    lineHeight: 20,
    paddingHorizontal: 40,
  },
  scrollContainer: {
    width: "100%",
  },
  conteinerInputs: {
    width: "100%",
    alignItems: "center",
  },
  textInput: {
    height: 40,
    borderColor: colors.grey,
    borderBottomWidth: 1,
    padding: 10,
    fontSize: 18,
  },
  inputGroup: {
    width: "80%",
    marginVertical: 8,
  },
  label: {
    color: colors.grey,
    fontSize: 14,
    fontWeight: "300",
  },
  mapContainer: {
    width: "80%",
    height: 300,
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20, // Esto no es necesario si ya existe overflow: 'hidden' en mapContainer
  },
  containerBtn: {
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  btnActive: {
    width: "90%",
    height: 45,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnInactive: {
    width: "90%",
    height: 45,
    backgroundColor: colors.grey,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 16,
    color: colors.white,
  },
});
