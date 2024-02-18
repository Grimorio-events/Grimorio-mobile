import { useAuth, useUser } from "@clerk/clerk-expo";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../styles/styles";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

import styles from "./styles";

const UserProfile = () => {
  const { isLoaded } = useAuth();
  const { user } = useUser();

  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (!user) return;

    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setEmail(user?.emailAddresses[0].emailAddress);
  }, [user]);

  const onSaveUser = async () => {
    try {
      const result = await user?.update({
        firstName: firstName!,
        lastName: lastName!,
      });
      // console.log("🚀 ~ onSaveUser ~ result:", result);
      setEdit(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("UserProfile error: ", error);
      alert("Failed to update profile."); // Opcional
    }
  };

  const onCaptureImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    console.log("image picker: ", result);

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      user?.setProfileImage({
        file: base64,
      });
    }
  };

  if (!isLoaded) {
    return (
      <View style={globalStyles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.card}>
          <TouchableOpacity onPress={onCaptureImage}>
            <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
          </TouchableOpacity>
        </View>
        <TextInput
          style={edit ? styles.inputEditProfle : styles.inputProfle}
          placeholder="First name"
          value={firstName || ""}
          onChangeText={setFirstName}
          editable={edit}
        />
        <TextInput
          style={edit ? styles.inputEditProfle : styles.inputProfle}
          placeholder="Last name"
          value={lastName || ""}
          onChangeText={setLastName}
          editable={edit}
        />
        <TextInput
          style={edit ? styles.inputEditProfle : styles.inputProfle}
          placeholder="Email"
          value={email || ""}
          onChangeText={setEmail}
          editable={edit}
        />
        <TextInput
          style={edit ? styles.inputEditProfle : styles.inputProfle}
          placeholder="Phone Number"
          value={phoneNumber || ""}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad" // Esto asegura que el teclado sea el adecuado para ingresar números de teléfono
          editable={edit}
        />
        <TouchableOpacity
          style={
            edit ? globalStyles.buttonPrimary : globalStyles.buttonSecundary
          }
          onPress={edit ? onSaveUser : () => setEdit(true)}
        >
          <Text
            style={
              edit ? globalStyles.textButton : globalStyles.textButtonSecundary
            }
          >
            {edit ? "Update Profile" : "Edit Profile"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserProfile;
