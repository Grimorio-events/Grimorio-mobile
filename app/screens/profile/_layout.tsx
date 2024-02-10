import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import LoginAndRegister from "./loginAndRegister/_layout";
import UserProfile from "./profile";
import { useEffect } from "react";

const Profile = () => {
  const { isLoaded, isSignedIn } = useAuth();
  console.log("🚀 ~ Profile ~ isLoaded:", isLoaded);

  useEffect(() => {
    if (!isLoaded) return;
    console.log("🚀 isSignedIn Profile: ", isSignedIn);
  }, [isSignedIn]);

  return (
    <>
      <SignedIn>
        <UserProfile />
      </SignedIn>
      <SignedOut>
        <LoginAndRegister />
      </SignedOut>
    </>
  );
};

export default Profile;
