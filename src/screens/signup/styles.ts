import { StyleSheet } from "react-native";
import { colors } from "../../styles/styles";

export default StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  buttons: {
    marginTop: 50,
    width: "100%",
    flex: 1,
  },
  inputIOS: {
    // estilos para iOS
  },
  inputAndroid: {
    // estilos para Android
  },
});
