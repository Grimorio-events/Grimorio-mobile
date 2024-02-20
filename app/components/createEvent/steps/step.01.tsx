import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/app/styles/colors";
import { EventData } from "@/app/interface/event.interface";

type IconType = "FontAwesome5" | "MaterialIcons";

const categories: { name: string; icon: string; iconType: IconType }[] = [
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

interface StepComponentProps {
  updateFormEvent: (field: string, value: any) => void;
  formEvent: EventData;
  updateStepValidity: (isValid: boolean) => void;
}

const EventType: React.FC<StepComponentProps> = ({
  updateFormEvent,
  formEvent,
  updateStepValidity,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    formEvent?.eventType || null
  );

  const iconComponents: { [key in IconType]: any } = {
    FontAwesome5: FontAwesome5,
    MaterialIcons: MaterialIcons,
  };

  const handleChange = (categoryName: string) => {
    setSelectedCategory(categoryName);

    updateFormEvent("eventType", categoryName);
    updateFormEvent("categories", [categoryName]);
  };

  const isValidStep = () => {
    const categoriesLength = formEvent.categories?.length || 0;
    return formEvent.eventType !== "" && categoriesLength > 0;
  };

  useEffect(() => {
    const isValid = isValidStep(); // Llama a tu función de validación local
    updateStepValidity(isValid);
  }, [formEvent.eventType, formEvent.categories]); // Dependencias basadas en tu lógica de validación

  return (
    <Animated.View
      style={styles.container}
      entering={FadeInRight}
      exiting={FadeOutLeft}
    >
      <Text style={styles.title}>Que tipo de evento realizaras?</Text>
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 20, paddingBottom: 30 }}
        >
          {categories.map((item, index) => {
            const IconComponent = iconComponents[item.iconType];

            return (
              <TouchableOpacity
                key={index}
                style={
                  selectedCategory === item.name
                    ? styles.categoryBtnSelect
                    : styles.categoryBtn
                }
                onPress={() => handleChange(item.name)}
              >
                <IconComponent name={item.icon} size={30} color="black" />
                <Text style={styles.catBtnText}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </Animated.View>
  );
};

export default EventType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.background,
    padding: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 30,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  contentText: {
    fontSize: 16,
    marginVertical: 10,
    letterSpacing: 1,
    lineHeight: 20,
  },
  categoryBtn: {
    height: 80,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 10,
    alignItems: "center",
    gap: 20,
    paddingLeft: 20,
  },
  categoryBtnSelect: {
    height: 80,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.grey,
    backgroundColor: colors.backgorundEventList,
    borderRadius: 10,
    alignItems: "center",
    gap: 20,
    paddingLeft: 20,
  },
  catBtnText: {
    fontSize: 18,
  },
});
