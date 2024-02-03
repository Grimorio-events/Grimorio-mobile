import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../screens/login/loginScreen";
import SignupScreen from "../../screens/signup/signupScreen";
import HomeScreen from "../../screens/home/homeScreen";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import { useAppDispatch } from "../../store/store";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoaded) return;
    console.log("🚀 isSignedIn: ", isSignedIn);
  }, [isSignedIn]);

  return (
    <Stack.Navigator initialRouteName="Login">
      {isSignedIn ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
