import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";
import { globalStyles } from "@/app/styles/styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/types/types";

import styles from "./styles";

type NavigationType = NativeStackNavigationProp<
  RootStackParamList,
  "Requiredlogin"
>;

const Requiredlogin = () => {
  const navigation = useNavigation<NavigationType>();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={globalStyles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.textTitle}>
            Registration or login is required to access this page.
          </Text>
          <Text style={styles.textInfo}>
            You can enter and if you do not have an account in the same link you
            can register.
          </Text>
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={globalStyles.buttonPrimary}
              onPress={() => navigation.navigate("Profile")}
            >
              <Text style={globalStyles.textButton}>log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Requiredlogin;
