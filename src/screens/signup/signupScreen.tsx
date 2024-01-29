import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/types";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import PicerSelect from "../../components/picker";
import { globalStyles } from "../../styles/styles";

import styles from "./styles";

type SignupScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Signup">;
};

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [singup, setSingup] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    country: "",
    city: "",
  });

  const handleChange = (name: string, value: string) => {
    setSingup((preventSingup) => ({
      ...preventSingup,
      [name]: value,
    }));
  };

  const handleSignup = () => {
    console.log("🚀 ~ singup:", singup);
    // navigation.navigate("Login");
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
            placeholder="Name"
            value={singup.name}
            onChangeText={(value) => handleChange("name", value)}
          />
          <TextInput
            style={globalStyles.textInput}
            placeholder="Email"
            value={singup.email}
            onChangeText={(value) => handleChange("email", value)}
          />
          <TextInput
            style={globalStyles.textInput}
            placeholder="Contraseña"
            secureTextEntry
            value={singup.password}
            onChangeText={(value) => handleChange("password", value)}
          />
          <TextInput
            style={globalStyles.textInput}
            placeholder="Contraseña"
            secureTextEntry
            value={singup.password}
            onChangeText={(value) => handleChange("password", value)}
          />
          <TextInput
            style={globalStyles.textInput}
            placeholder="Phone Number"
            value={singup.phone}
            onChangeText={(value) => handleChange("phone", value)}
          />
          <PicerSelect singup={singup} setSingup={setSingup} />
          <TextInput
            style={globalStyles.textInput}
            placeholder="City"
            value={singup.city}
            onChangeText={(value) => handleChange("city", value)}
          />
          <View style={styles.buttons}>
            <TouchableOpacity
              style={globalStyles.buttonPrimary}
              onPress={handleSignup}
            >
              <Text style={globalStyles.textButton}>Registrarse</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={globalStyles.buttonSecundary}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={globalStyles.textButtonSecundary}>
                Ya tienes una cuenta? Iniciar sesión
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
