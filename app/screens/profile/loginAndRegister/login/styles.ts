import { colors } from "@/app/styles/colors";
import { StyleSheet } from "react-native";

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
  seperatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30,
  },
  seperator: {},
  crateAccount: {
    flexDirection: "row",
  },
});
