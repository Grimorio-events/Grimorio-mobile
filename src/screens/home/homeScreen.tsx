import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/types";
import { Button, Text, View } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { LogOutButton } from "../../hooks/logoutButton";

import styles from "./styles";

type SignupScreen = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const HomeScreen: React.FC<SignupScreen> = ({ navigation }) => {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <Text>Bienvenido {user?.emailAddresses[0].emailAddress}</Text>
      <Text>Grimorio v0.1.0</Text>
      <View>
        <LogOutButton />
      </View>
      {/* <Button
        title="Cerrar sesión"
        onPress={() => navigation.navigate("Login")}
      /> */}
    </View>
  );
};

export default HomeScreen;
