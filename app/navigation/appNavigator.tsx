import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "@clerk/clerk-expo";
import TabNavigator from "./tabNavigarot";
import ResetPass from "../screens/profile/loginAndRegister/reset/_layout";
import { RootStackParamList } from "../types/types";
import DetailsPage from "../screens/listing/[id]";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;
  }, [isSignedIn]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailsPage"
        component={DetailsPage}
        options={{ headerShown: false, headerTitle: "" }}
      />
      <Stack.Screen
        name="ResetPass"
        component={ResetPass}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
