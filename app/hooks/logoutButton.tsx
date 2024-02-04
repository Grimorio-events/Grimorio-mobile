import { useAuth } from "@clerk/clerk-expo";
import { Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/styles";

export const LogOutButton = () => {
  const { signOut } = useAuth();

  const onPressLogOut = () => {
    signOut();
  };

  return (
    <TouchableOpacity
      style={globalStyles.buttonPrimary}
      onPress={onPressLogOut}
    >
      <Text style={globalStyles.textButton}>Log Out</Text>
    </TouchableOpacity>
  );
};
