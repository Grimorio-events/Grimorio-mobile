import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import React, { useEffect, useState } from "react";
import { colors } from "@/app/styles/colors";
import useFormEventStore from "@/app/stores/formEventStore";

import * as DocumentPicker from "expo-document-picker";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

interface StepComponentProps {
  updateStepValidity: (isValid: boolean) => void;
}

interface DocumentInfo {
  mimeType: string;
  name: string;
  size: number;
  uri: string;
}

const EventDocuments: React.FC<StepComponentProps> = ({
  updateStepValidity,
}) => {
  const { stateFormEvent, updateFormEvent } = useFormEventStore();
  const [documents, setDocuments] = useState<DocumentInfo[] | any>(
    stateFormEvent.documents
  );

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const newDoc: DocumentInfo = {
        mimeType: result.assets[0].mimeType || "application/unknown",
        name: result.assets[0].name,
        size: result.assets[0].size || 0,
        uri: result.assets[0].uri,
      };
      setDocuments((currentDocument: DocumentInfo[]) => [
        ...currentDocument,
        newDoc,
      ]);
    }
  };

  useEffect(() => {
    updateFormEvent("documents", documents);
    updateStepValidity(true);
  }, [documents]);

  const removeDocument = (indexToRemove: number) => {
    setDocuments(
      documents.filter((_: any, index: number) => index !== indexToRemove)
    );
  };

  return (
    <Animated.View
      style={styles.container}
      entering={FadeInRight}
      exiting={FadeOutLeft}
    >
      <Text style={styles.title}>Documentación</Text>
      <Text style={styles.contentText}>
        Tener toda la documentación a mano es clave para que el equipo pueda
        validar y aprobar todo más rápido. Si cuentas con documentos legales que
        respalden el evento, esto realmente puede acelerar el proceso.
      </Text>
      <View style={styles.content}>
        <Text>Documentos</Text>
        <TouchableOpacity style={styles.btnPick} onPress={pickDocument}>
          <Text>Agregar documento</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ marginTop: 30 }}>
        <View style={styles.docGrid}>
          {documents.map((document: DocumentInfo, index: number) => (
            <View key={index} style={styles.contentDoc}>
              <Ionicons
                name="document-outline"
                style={{ marginBottom: 20 }}
                size={60}
                color={colors.black}
              />
              <Text>{document.name}</Text>
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => removeDocument(index)}
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
        </View>
      </ScrollView>
    </Animated.View>
  );
};

export default EventDocuments;

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
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnPick: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.grey,
    paddingVertical: 7,
    paddingHorizontal: 30,
  },
  docGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 12,
  },
  contentDoc: {
    position: "relative",
    width: 180,
    height: 180,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  deleteIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
});
