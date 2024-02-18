import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "@/app/styles/styles";
import Requiredlogin from "@/app/components/requiredLogin/_layout";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { RootStackParamList } from "@/app/types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { colors } from "@/app/styles/colors";

type NavigationType = NativeStackNavigationProp<RootStackParamList, "Create">;

const Create = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const navigation = useNavigation<NavigationType>();

  if (!isLoaded) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <SignedIn>
        <View>
          <TouchableOpacity
            style={globalStyles.buttonSecundary}
            onPress={() => navigation.navigate("CreateEvent")}
          >
            <Text>Go to create Event!</Text>
          </TouchableOpacity>
        </View>
      </SignedIn>
      <SignedOut>
        <Requiredlogin />
      </SignedOut>
    </View>
  );
};

export default Create;
