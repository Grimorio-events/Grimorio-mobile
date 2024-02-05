import React, { useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import { globalStyles } from "../../../../styles/styles";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import styles from "./styles";

const ResetPass = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const { signIn, setActive } = useSignIn();

  // Request a passowrd reset code by email
  const onRequestReset = async () => {
    try {
      await signIn!.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });
      setSuccessfulCreation(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  // Reset the password with the code and the new password
  const onReset = async () => {
    try {
      const result = await signIn!.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      alert("Password reset successfully");

      // Set the user session active, which will log in the user automatically
      await setActive!({ session: result.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  return (
    <View style={styles.main}>
      {!successfulCreation ? (
        <View style={styles.container}>
          <Text>ResetPass</Text>
          <TextInput
            style={globalStyles.textInput}
            autoCapitalize="none"
            placeholder="cp25@nouwer.dev"
            value={emailAddress}
            onChangeText={setEmailAddress}
          />
          <TouchableOpacity
            style={globalStyles.buttonPrimary}
            onPress={onRequestReset}
          >
            <Text style={globalStyles.textButton}>Send Reset Email</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <Text>ResetPass</Text>
          <TextInput
            style={globalStyles.textInput}
            placeholder="Code..."
            onChangeText={setCode}
          />
          <TextInput
            style={globalStyles.textInput}
            placeholder="New password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity
            style={globalStyles.buttonSecundary}
            onPress={onReset}
          >
            <Text style={globalStyles.textButtonSecundary}>
              Set new Password
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ResetPass;
