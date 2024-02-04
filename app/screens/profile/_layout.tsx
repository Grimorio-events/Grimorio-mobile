import { Text, View } from "react-native";
import { LogOutButton } from "../../hooks/logoutButton";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import LoginAndRegister from "./components/loginAndRegister/_layout";

const Profile = () => {
  return (
    <>
      <SignedIn>
        <View>
          <Text>Profile</Text>
          <View>
            <LogOutButton />
          </View>
        </View>
      </SignedIn>
      <SignedOut>
        <LoginAndRegister />
      </SignedOut>
    </>
  );
};

export default Profile;
