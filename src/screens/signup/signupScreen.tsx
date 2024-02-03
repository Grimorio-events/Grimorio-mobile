import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/types";
import React, { useState } from "react";
import { globalStyles } from "../../styles/styles";
import { useSignUp } from "@clerk/clerk-expo";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import styles from "./styles";

type SignupScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Signup">;
};

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [loading, setLoading] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.main}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        {!pendingVerification ? (
          <View style={styles.container}>
            <TextInput
              style={globalStyles.textInput}
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email"
              onChangeText={(email) => setEmailAddress(email)}
            />
            <TextInput
              style={globalStyles.textInput}
              value={password}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
            <TouchableOpacity
              style={globalStyles.buttonPrimary}
              onPress={onSignUpPress}
            >
              <Text style={globalStyles.textButton}>Sign up</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.container}>
            <TextInput
              style={globalStyles.textInput}
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
            />
            <TouchableOpacity
              style={globalStyles.buttonPrimary}
              onPress={onPressVerify}
            >
              <Text style={globalStyles.textButton}>Verify Email</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
