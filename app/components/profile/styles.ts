import { colors } from "@/app/styles/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 30,
  },
  containerOptions: {
    flexDirection: "row",
    gap: 45,
    alignContent: "center",
    justifyContent: "center",
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  textProfile: {
    color: colors.text,
    fontSize: 15,
    justifyContent: "center",
    borderBottomColor: colors.secundary,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 50,
    marginRight: 24,
    marginTop: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    alignItems: "center",
    gap: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.black,
  },
  containerContent: {
    backgroundColor: "green",
  },
  inputIOS: {
    // estilos para iOS
  },
  inputAndroid: {
    // estilos para Android
  },
});
