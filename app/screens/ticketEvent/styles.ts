import { colors } from "@/app/styles/colors";
import { Dimensions, StyleSheet } from "react-native";

// const screenHeight = Dimensions.get("window").height;
// const screenWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  navBuy: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    height: 60,
    paddingHorizontal: 30,
    backgroundColor: colors.background,
  },
  selectQuantity: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  btnBuy: {
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  btnCancel: {
    backgroundColor: colors.alertSoft,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  textBtn: {
    color: colors.white,
    fontWeight: "700",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
