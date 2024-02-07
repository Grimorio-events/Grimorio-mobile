import { colors } from "@/app/styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";

const categories = [
  {
    name: "Trending",
    icon: "fire",
    component: <FontAwesome5 name="fire" size={24} color="black" />,
  },
  {
    name: "Music",
    icon: "music",
    component: <FontAwesome name="music" size={24} color="black" />,
  },
  {
    name: "Theater",
    icon: "theater-masks",
    component: <FontAwesome5 name="theater-masks" size={24} color="black" />,
  },
  {
    name: "Movies",
    icon: "movie",
    component: <MaterialIcons name="movie" size={24} color="black" />,
  },
  {
    name: "Virtual",
    icon: "desktop",
    component: <FontAwesome5 name="desktop" size={24} color="black" />,
  },
  {
    name: "Video Games",
    icon: "sports-esports",
    component: <MaterialIcons name="sports-esports" size={24} color="black" />,
  },
  {
    name: "Sports",
    icon: "sports-club",
    component: <Entypo name="sports-club" size={24} color="black" />,
  },
];

const ExploreHeader = () => {
  return (
    <SafeAreaView style={{ backgroundColor: colors.background }}>
      <View style={styles.containerHeader}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            gap: 20,
            paddingHorizontal: 16,
          }}
        >
          {categories.map((item, index) => (
            <TouchableOpacity key={index}>
              {item.component}
              <Text>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    height: 70,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
});

export default ExploreHeader;
