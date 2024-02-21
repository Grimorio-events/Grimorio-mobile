import { colors } from "@/app/styles/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  navHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: colors.background,
  },
  navCreate: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    height: 80,
    paddingHorizontal: 30,
    backgroundColor: colors.background,
  },
  navBack: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 5,
  },
  navBackText: {
    color: colors.black,
    fontSize: 16,
  },
  navNext: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: colors.black,
    backgroundColor: colors.black,
    borderRadius: 5,
  },
  navNextDisable: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: colors.grey,
    backgroundColor: colors.grey,
    borderRadius: 5,
  },
  navNextText: {
    color: colors.white,
    fontSize: 16,
  },
});
