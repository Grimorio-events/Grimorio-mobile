import { colors } from "@/app/styles/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  main: {
    flex: 1,
    // justifyContent: "center",
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
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inputProfle: {
    width: "100%",
    height: 30,
    color: colors.text,
    paddingHorizontal: 10,
    fontSize: 15,
    marginVertical: 7,
    justifyContent: "center",
    borderBottomColor: colors.secundary,
  },
  inputEditProfle: {
    width: "100%",
    height: 50,
    color: colors.text,
    paddingHorizontal: 10,
    fontSize: 15,
    marginVertical: 7,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.secundary,
  },
  card: {
    backgroundColor: "#fff",
    // padding: 24,
    borderRadius: 50,
    marginHorizontal: 24,
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
    marginBottom: 24,
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
