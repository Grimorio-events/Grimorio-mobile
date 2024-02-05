import { useUser } from "@clerk/clerk-expo";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { LogOutButton } from "../../hooks/logoutButton";
import { globalStyles } from "../../styles/styles";
import { useState } from "react";

const UserProfile = () => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [phoneNumber, setPhoneNumber] = useState("");

  const onSaveUser = async () => {
    try {
      const result = await user?.update({
        firstName: firstName!,
        lastName: lastName!,
      });
      console.log("🚀 ~ onSaveUser ~ result:", result);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("UserProfile error: ", error);
      alert("Failed to update profile."); // Opcional
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text>Hello, {user?.firstName}</Text>
      <TextInput
        style={globalStyles.textInput}
        placeholder="First name"
        value={firstName || ""}
        onChangeText={setFirstName}
      />
      <TextInput
        style={globalStyles.textInput}
        placeholder="Last name"
        value={lastName || ""}
        onChangeText={setLastName}
      />
      <TextInput
        style={globalStyles.textInput}
        placeholder="Phone Number"
        value={phoneNumber || ""}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad" // Esto asegura que el teclado sea el adecuado para ingresar números de teléfono
      />
      <TouchableOpacity style={globalStyles.buttonPrimary} onPress={onSaveUser}>
        <Text style={globalStyles.textButton}>Update Profile</Text>
      </TouchableOpacity>
      <View>
        <LogOutButton />
      </View>
    </View>
  );
};

export default UserProfile;
