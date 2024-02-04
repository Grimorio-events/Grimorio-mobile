import * as WebBrowser from "expo-web-browser";
import { Text, TouchableOpacity } from "react-native";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";
import { useCallback } from "react";
import { useOAuth } from "@clerk/clerk-expo";
import { AntDesign } from "@expo/vector-icons";
import { globalStyles } from "../../styles/styles";

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <TouchableOpacity style={globalStyles.buttonPrimary} onPress={onPress}>
      <AntDesign name="google" size={20} color="white" />
      <Text style={globalStyles.textButton}>Sign in with Google</Text>
    </TouchableOpacity>
  );
};

export default SignInWithOAuth;
