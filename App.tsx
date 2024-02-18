import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import AppNavigator from "./app/navigation/app.navigation";

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
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ClerkProvider>
  );
}
