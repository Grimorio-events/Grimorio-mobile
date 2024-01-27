import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/types";
import { Button, TextInput, View } from "react-native";
import { useState } from "react";

import styles from "./styles";

type SignupScreen = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Signup">;
};

const SignupScreen: React.FC<SignupScreen> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    // Aquí se implementaría la lógica de registro
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Registrarse" onPress={handleSignup} />
      <Button
        title="Ya tienes una cuenta? Iniciar sesión"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default SignupScreen;
