import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },

  defaultContainer: {
    flex: 1,
    // backgroundColor: colors.backgroundBlack,
  },

  btnIcon: {
    position: "absolute",
    left: 16,
  },

  textInput: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: colors.secundary,
    color: colors.text,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 15,
    marginVertical: 7,
    justifyContent: "center",
  },

  buttonPrimary: {
    width: "100%",
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    marginVertical: 10,
  },

  textButton: {
    color: colors.white,
    fontSize: 15,
  },

  buttonSecundary: {
    width: "100%",
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.primary,
    backgroundColor: colors.white,
    marginVertical: 10,
  },

  textButtonSecundary: {
    color: colors.primary,
    fontSize: 15,
  },

  buttonSocial: {
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: colors.grey,
    height: 50,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },

  textButtonSocial: {
    color: "#000",
    fontSize: 16,
  },
});
