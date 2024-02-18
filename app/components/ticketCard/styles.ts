import { colors } from "@/app/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 220,
    backgroundColor: colors.backgorundEventList,
  },
  ticketLeft: {
    justifyContent: "space-between",
    width: "60%",
    backgroundColor: colors.backgroundBlack,
    padding: 10,
    paddingRight: 0,
  },
  ticketLeftContent: {
    flex: 1,
    paddingTop: 5,
    paddingLeft: 5,
  },
  cardInfoDate: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardInfoDateDay: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.white,
  },
  ticketInfoText: {
    flexDirection: "row",
    fontSize: 14,
    fontWeight: "900",
    marginHorizontal: 5,
  },
  ticketRight: {
    flex: 1,
    width: "40%",
    justifyContent: "center",
    paddingRight: 15,
    backgroundColor: colors.backgroundBlack,
  },
  imageContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },

  // Seccion para host y icono ->
  // ticketInfoHost: {
  //   justifyContent: "center",
  //   alignItems: "center",
  //   flexDirection: "row",
  // },
  // hostImage: {
  //   width: 30,
  //   height: 30,
  //   borderRadius: 8,
  //   marginHorizontal: 2,
  // },
  // moreHost: {
  //   justifyContent: "center",
  //   alignItems: "center",
  //   width: 30,
  //   height: 30,
  //   borderRadius: 8,
  //   marginHorizontal: 2,
  //   backgroundColor: colors.primary,
  // },

  eventTitle: {
    fontSize: 24,
    marginBottom: 7,
    fontWeight: "700",
    color: colors.white,
  },
  event: {
    height: 27,
    flexDirection: "row",
    backgroundColor: colors.primary,
    justifyContent: "center",
  },
  eventInfoContent: {
    alignItems: "center",
    flexDirection: "row",
  },
  eventInfoContentQ: {
    alignItems: "center",
    flexDirection: "row",
  },
  eventTextInfo: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.white,
    marginLeft: 5,
  },
  icons: {
    width: 16,
    color: colors.white,
  },
  dottedBorderRight: {
    position: "absolute",
    right: -6,
    top: 5,
    bottom: 0,
    backgroundColor: "transparent",
    borderRightWidth: 10,
    borderRightColor: colors.backgorundEventList,
    borderStyle: "dotted",
  },
  dottedBorderLeft: {
    position: "absolute",
    left: -6,
    top: 5,
    bottom: 0,
    backgroundColor: "transparent",
    borderRightWidth: 10,
    borderRightColor: colors.backgorundEventList,
    borderStyle: "dotted",
  },
});
