import { View, Text } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { globalStyles } from "../../styles/styles";

const ExploreScren = () => {
  const { user } = useUser();

  return (
    <View style={globalStyles.container}>
      <Text>Explore</Text>
    </View>
  );
};

export default ExploreScren;
