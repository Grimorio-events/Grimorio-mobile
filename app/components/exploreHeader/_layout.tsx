import { colors } from "@/app/styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";

type IconType = "FontAwesome5" | "MaterialIcons";

const categories: { name: string; icon: string; iconType: IconType }[] = [
  {
    name: "Trending",
    icon: "fire",
    iconType: "FontAwesome5",
  },
  {
    name: "Music",
    icon: "music",
    iconType: "FontAwesome5",
  },
  {
    name: "Theater",
    icon: "theater-masks",
    iconType: "FontAwesome5",
  },
  {
    name: "Movies",
    icon: "video",
    iconType: "FontAwesome5",
  },
  {
    name: "Virtual",
    icon: "laptop",
    iconType: "FontAwesome5",
  },
  {
    name: "Video Games",
    icon: "gamepad",
    iconType: "FontAwesome5",
  },
  {
    name: "Sports",
    icon: "sports-soccer",
    iconType: "MaterialIcons",
  },
];

interface Props {
  onCategoryChanged: (category: string) => void;
}

const ExploreHeader = ({ onCategoryChanged }: Props) => {
  const itemsRef = useRef<Array<TouchableOpacity>>([]);
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategorie = (index: number) => {
    setActiveIndex(index);
    onCategoryChanged(categories[index].name);
  };

  const iconComponents: { [key in IconType]: any } = {
    FontAwesome5: FontAwesome5,
    MaterialIcons: MaterialIcons,
  };

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
          {categories.map((item, index) => {
            const IconComponent = iconComponents[item.iconType];

            return (
              <TouchableOpacity
                key={index}
                ref={(element) => itemsRef.current[index] === element}
                onPress={() => selectCategorie(index)}
                style={
                  activeIndex === index
                    ? styles.categoriesbtnActive
                    : styles.categoriesbtn
                }
              >
                <IconComponent
                  name={item.icon}
                  size={24}
                  color={activeIndex === index ? colors.primary : "black"}
                />
                <Text
                  style={
                    activeIndex === index
                      ? styles.categoriesTextActive
                      : styles.categoriesText
                  }
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
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
  categoriesText: {
    fontSize: 14,
    color: colors.black,
  },
  categoriesbtn: {
    flex: 1,
    height: "70%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 2,
  },
  categoriesTextActive: {
    fontSize: 14,
    color: colors.primary,
  },
  categoriesbtnActive: {
    flex: 1,
    height: "70%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 2,
  },
});

export default ExploreHeader;
