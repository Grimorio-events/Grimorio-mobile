import { useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import SignInWithOAuth from "../../../../components/signInWithOAuth/SignInWithOAuth";
import { globalStyles } from "../../../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../types/types";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import styles from "./styles";

type LoginSCreenProps = {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

// Define el tipo de navegación para este componente
type NavigationType = NativeStackNavigationProp<RootStackParamList, "Login">;

const LoginScreen: React.FC<LoginSCreenProps> = ({ setIsLogin }) => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation<NavigationType>();

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
          <Text style={styles.title}>Log in</Text>
          <SignInWithOAuth />
          <View style={styles.seperatorView}>
            <View
              style={{
                flex: 1,
                borderBottomColor: "#000",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <Text style={styles.seperator}>or</Text>
            <View
              style={{
                flex: 1,
                borderBottomColor: "#000",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
          </View>
          <Text style={styles.loginInfo}>Log in using email address</Text>
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
          <Text
            style={styles.forgotpass}
            onPress={() => navigation.navigate("ResetPass")}
          >
            Forgot password?
          </Text>
          <TouchableOpacity
            style={globalStyles.buttonPrimary}
            onPress={onSignInPress}
          >
            <Text style={globalStyles.textButton}>Log in</Text>
          </TouchableOpacity>
          <View style={styles.crateAccount}>
            <Text style={{ marginRight: 10 }}>Need to create an account?</Text>
            <Text
              style={globalStyles.textButtonSecundary}
              onPress={() => setIsLogin(false)}
            >
              Sign Up
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
