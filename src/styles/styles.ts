import { StyleSheet } from "react-native";

export const colors = {
  primary: "#FF6B6B",
  secundary: "#B2A59B",
  text: "#333333",
  yellow: "#FFC107",
  blue: "#0047AB",
  white: "#F5F5F5",
  background: "#FFF",
};

export const globalStyles = StyleSheet.create({
  textInput: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: colors.secundary,
    color: colors.text,
    padding: 10,
    borderRadius: 5,
    fontSize: 15,
    marginVertical: 7,
    justifyContent: "center",
  },

  buttonPrimary: {
    width: "100%",
    height: 50,
    padding: 10,
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
    padding: 10,
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
});
