import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/types";
import { Button, TextInput, View } from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useSignIn } from "@clerk/clerk-expo";

import styles from "./styles";
import SignInWithOAuth from "../../components/signInWithOAuth/SignInWithOAuth";

type LoginSCreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
};

const LoginScreen: React.FC<LoginSCreenProps> = ({ navigation }) => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const isLoggedIn = useSelector((state: RootState) => state.auth);

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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={emailAddress}
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button title="Iniciar sesión" onPress={onSignInPress} />
      <Button
        title="Registrarse"
        onPress={() => navigation.navigate("Signup")}
      />
      <SignInWithOAuth />
    </View>
  );
};

export default LoginScreen;
