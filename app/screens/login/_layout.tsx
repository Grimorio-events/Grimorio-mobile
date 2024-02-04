import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import SignInWithOAuth from "../../components/signInWithOAuth/SignInWithOAuth";

import styles from "./styles";
import { globalStyles } from "../../styles/styles";

type LoginSCreenProps = {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginScreen: React.FC<LoginSCreenProps> = ({ setIsLogin }) => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.main}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <TextInput
            style={globalStyles.textInput}
            placeholder="Email"
            value={emailAddress}
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          />
          <TextInput
            style={globalStyles.textInput}
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          <TouchableOpacity
            style={globalStyles.buttonPrimary}
            onPress={onSignInPress}
          >
            <Text style={globalStyles.textButton}>Iniciar sesión</Text>
          </TouchableOpacity>
          <SignInWithOAuth />
          <TouchableOpacity
            style={globalStyles.buttonSecundary}
            onPress={() => setIsLogin(false)}
          >
            <Text style={globalStyles.textButtonSecundary}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
