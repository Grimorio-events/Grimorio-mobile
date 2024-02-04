import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/login/_layout";
import SignupScreen from "../screens/signup/_layout";
import HomeScreen from "../screens/home/_layout";
import { useAuth, useUser } from "@clerk/clerk-expo";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (!isLoaded) return;
    console.log("🚀 isSignedIn appNav: ", isSignedIn);
  }, [isSignedIn]);

  return (
    <Stack.Navigator initialRouteName="Home">
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
