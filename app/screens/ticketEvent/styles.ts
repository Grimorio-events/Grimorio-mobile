import { colors } from "@/app/styles/colors";
import { Dimensions, StyleSheet } from "react-native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

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
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  btnModal: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerModal: {
    width: 250,
    paddingBottom: 30,
  },
  InfoModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInfoModal: {
    fontSize: 16,
    letterSpacing: 1,
  },
  textTotalModal: {
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: "700",
    marginTop: 20,
  },
});
