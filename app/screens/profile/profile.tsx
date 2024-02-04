import { useUser } from "@clerk/clerk-expo";
import { Text, View } from "react-native";
import { LogOutButton } from "../../hooks/logoutButton";

const UserProfile = () => {
  const { user } = useUser();

  return (
    <View>
      <Text>User Profile</Text>
      <View>
        <LogOutButton />
      </View>
    </View>
  );
};

export default UserProfile;
