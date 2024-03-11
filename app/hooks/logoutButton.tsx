import { useAuth } from "@clerk/clerk-expo";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export const LogOutButton = () => {
  const { signOut } = useAuth();

  const onPressLogOut = () => {
    signOut();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={onPressLogOut} style={styles.btnLogOut}>
        <Text>Log out</Text>
        <MaterialIcons name="logout" size={24} style={styles.icon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.background,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  btnLogOut: {
    flexDirection: "row",
    backgroundColor: colors.background,
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    color: colors.black,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});
