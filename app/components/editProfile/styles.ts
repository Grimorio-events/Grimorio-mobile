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
  buttons: {
    marginTop: 50,
    width: "100%",
    flex: 1,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inputProfle: {
    width: "100%",
    height: 30,
    paddingHorizontal: 10,
    marginVertical: 7,
    color: colors.text,
    fontSize: 15,
    justifyContent: "center",
    borderBottomColor: colors.secundary,
  },
  inputEditProfle: {
    width: "100%",
    height: 50,
    paddingHorizontal: 10,
    marginVertical: 7,
    color: colors.text,
    fontSize: 15,
    justifyContent: "center",
    borderBottomWidth: 1,
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
  inputIOS: {
    // estilos para iOS
  },
  inputAndroid: {
    // estilos para Android
  },
});
