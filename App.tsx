import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/components/appNavigator";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";

const EXPO_PUBLIC_CLERK_KEY = process.env.EXPO_PUBLIC_CLERK_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (error) {
      return;
    }
  },
};

export default function App() {
  return (
    <ClerkProvider
      publishableKey={EXPO_PUBLIC_CLERK_KEY!}
      tokenCache={tokenCache}
    >
      <Provider store={store}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </Provider>
    </ClerkProvider>
  );
}
