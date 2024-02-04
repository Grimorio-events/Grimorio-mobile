import { Text, View } from "react-native";
import { useUser } from "@clerk/clerk-expo";

import styles from "./styles";

const HomeScreen = () => {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <Text>Bienvenido {user?.emailAddresses[0].emailAddress}</Text>
      <Text>Grimorio v0.1.0</Text>
      <View></View>
    </View>
  );
};

export default HomeScreen;
