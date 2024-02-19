import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { useAuth } from "@clerk/clerk-expo";
import TabNavigator from "./tab.navigation";
import ResetPass from "../components/reset/_layout";
import DetailsPage from "../screens/ticketEvent/[id]";
import CreateEvent from "../components/createEvent/_layout";

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
      <Stack.Screen
        name="CreateEvent"
        component={CreateEvent}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
