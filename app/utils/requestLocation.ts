import * as Location from "expo-location";

const requestLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    alert("Permission to access location was denied");
    return;
  }
};

export { requestLocationPermission };
