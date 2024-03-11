import { colors } from "@/app/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerMessage: {
    flex: 1,
    width: "90%",
    gap: 20,
    alignContent: "flex-start",
    justifyContent: "flex-end",
    // backgroundColor: colors.alert,
  },
  input: {
    flexDirection: "row",
    gap: 10,
  },
  textInput: {
    width: "70%",
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  button: {
    width: "20%",
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    marginVertical: 5,
  },
});
