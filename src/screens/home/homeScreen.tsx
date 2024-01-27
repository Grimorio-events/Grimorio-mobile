import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/types";
import { Button, Text, View } from "react-native";

import styles from "./styles";

type SignupScreen = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const HomeScreen: React.FC<SignupScreen> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Bienvenido al Grimorio v0.1.0</Text>
      <Button
        title="Cerrar sesión"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default HomeScreen;
