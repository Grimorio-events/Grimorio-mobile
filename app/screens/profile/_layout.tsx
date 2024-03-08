import { useEffect, useState } from "react";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import UserProfile from "../../components/profile/_layout";
import LoginScreen from "@/app/components/login/_layout";
import SignupScreen from "@/app/components/signup/_layout";
import { globalStyles } from "@/app/styles/styles";
import { ActivityIndicator, Text, View } from "react-native";
import { colors } from "@/app/styles/colors";

const Profile = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  console.log("🚀 ~ Profile ~ isLoaded:", isLoaded);

  useEffect(() => {
    if (!isLoaded) return;
    console.log("🚀 isSignedIn Profile: ", isSignedIn);
  }, [isSignedIn]);

  if (!isLoaded) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <>
      <SignedIn>
        <UserProfile />
      </SignedIn>
      <SignedOut>
        {isLogin ? (
          <LoginScreen setIsLogin={setIsLogin} />
        ) : (
          <>
            <SignupScreen setIsLogin={setIsLogin} />
          </>
        )}
      </SignedOut>
    </>
  );
};

export default Profile;
