import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { colors } from "@/app/styles/colors";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import useFormEventStore from "@/app/stores/formEventStore";

import * as ImagePicker from "expo-image-picker";

interface StepComponentProps {
  updateStepValidity: (isValid: boolean) => void;
}

const ContentEvent: React.FC<StepComponentProps> = ({ updateStepValidity }) => {
  const { stateFormEvent, updateFormEvent } = useFormEventStore();
  const [images, setImages] = useState<string[]>(stateFormEvent.images);

  const pickImage = async () => {
    if (images.length >= 10) {
      return; // Detener la función si ya hay 10 o más imágenes
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 6],
      quality: 1,
    });

    if (!result.canceled) {
      const newImg = result.assets[0].uri;
      setImages((currentImage: string[]) => [...currentImage, newImg]);
    }
  };

  const isValidStep = () => {
    const imagesState = stateFormEvent.images?.length > 0;
    return imagesState;
  };

  useEffect(() => {
    if (images.length > 0) {
      updateFormEvent("images", images);
    }

    const isValid = isValidStep();
    updateStepValidity(isValid);
  }, [images, stateFormEvent.images]);

  const removeImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Animated.View
      style={styles.container}
      entering={FadeInRight}
      exiting={FadeOutLeft}
    >
      <Text style={styles.title}>Contenido </Text>
      <Text style={styles.contentText}>
        Contar con una imagen de portada o una selección de imágenes contribuye
        a despertar un mayor interés.
      </Text>
      <View style={styles.contentTitleBtn}>
        <Text style={styles.subTitle}>Imágenes</Text>
        {images.length < 10 && (
          <TouchableOpacity style={styles.btnPickTitle} onPress={pickImage}>
            <Text>Agregar Imagen</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView style={styles.contentImgs}>
        <View style={styles.imagesGrid}>
          {images.map((img: string, index: number) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri: img }} key={index} style={styles.image} />
              {index === 0 && (
                <View style={styles.coverLabel}>
                  <Text style={styles.coverLabelText}>Portada</Text>
                </View>
              )}
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => removeImage(index)}
              >
                <MaterialCommunityIcons
                  name="delete-circle"
                  size={28}
                  style={{
                    backgroundColor: "white",
                    borderRadius: 50,
                  }}
                  color={colors.black}
                />
              </TouchableOpacity>
            </View>
          ))}
          {images.length < 10 && (
            <TouchableOpacity style={styles.btnPickImg} onPress={pickImage}>
              <Entypo name="plus" size={34} color={colors.grey} />
              <Text>Agregar mas</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </Animated.View>
  );
};

export default ContentEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.background,
    padding: 30,
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
    fontSize: 14,
    marginBottom: 20,
    letterSpacing: 1,
    lineHeight: 15,
  },
  contentTitleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  contentImgs: {
    marginTop: 20,
  },
  imagesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 10,
  },
  imageContainer: {
    position: "relative",
    width: "47%",
    height: 200,
  },
  deleteIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  btnPickTitle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.grey,
    paddingVertical: 7,
    paddingHorizontal: 30,
  },
  btnPickImg: {
    width: "47%",
    height: 200,
    borderWidth: 3,
    borderColor: colors.grey,
    borderRadius: 10,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  coverLabel: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: colors.grey,
    padding: 5,
    borderRadius: 5,
  },
  coverLabelText: {
    color: "white",
    fontWeight: "bold",
  },
});
