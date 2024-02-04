import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import LoginAndRegister from "./loginAndRegister/_layout";
import UserProfile from "./profile";

const Profile = () => {
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
