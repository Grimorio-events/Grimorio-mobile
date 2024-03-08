import { colors } from "@/app/styles/colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "@/app/styles/styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/types/types";

interface ModalLoginProps {
  setModalSate: (isValid: boolean) => void;
}

type NavigationType = NativeStackNavigationProp<
  RootStackParamList,
  "Requiredlogin"
>;

const ModalLogin: React.FC<ModalLoginProps> = ({ setModalSate }) => {
  const navigation = useNavigation<NavigationType>();

  return (
    <View style={styles.modalView}>
      <View style={styles.containetModal}>
        <View style={styles.container}>
          <Text style={styles.textTitle}>
            Registration or login is required to access this page.
          </Text>
          <Text style={styles.textInfo}>
            You can enter and if you do not have an account in the same link you
            can register.
          </Text>
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={globalStyles.buttonPrimary}
              onPress={() => navigation.navigate("Profile")}
            >
              <Text style={globalStyles.textButton}>log in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={globalStyles.buttonSecundary}
              onPress={() => setModalSate(false)}
            >
              <Text style={globalStyles.textButtonSecundary}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  textInfo: {
    fontSize: 16,
  },
  containerButton: {
    marginVertical: 30,
  },
  modalView: {
    margin: 20,
    paddingVertical: 20,
    backgroundColor: colors.background,
    borderRadius: 20,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  containetModal: {
    height: 300,
    alignItems: "center",
  },
  containerModal: {
    width: 250,
    paddingBottom: 30,
  },
  InfoModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInfoModal: {
    fontSize: 16,
    letterSpacing: 1,
  },
  textTotalModal: {
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: "700",
    marginTop: 20,
  },
});

export default ModalLogin;
