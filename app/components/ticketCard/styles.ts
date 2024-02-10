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
    backgroundColor: colors.background,
    padding: 10,
    borderRadius: 16,
  },
  ticketLeftContent: {
    flex: 1,
    padding: 5,
    borderTopEndRadius: 12,
    borderTopStartRadius: 12,
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
    borderRadius: 16,
    backgroundColor: colors.background,
  },
  imageContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "80%",
    height: "80%",
    borderRadius: 16,
  },
  ticketInfoHost: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  hostImage: {
    width: 30,
    height: 30,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  moreHost: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    borderRadius: 8,
    marginHorizontal: 2,
    backgroundColor: colors.primary,
  },
  eventTitle: {
    fontSize: 24,
    marginBottom: 7,
    fontWeight: "700",
    color: colors.black,
  },
  event: {
    height: 27,
    flexDirection: "row",
    backgroundColor: colors.primary,
    justifyContent: "center",
    borderBottomEndRadius: 12,
    borderBottomStartRadius: 12,
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
    color: colors.black,
    marginLeft: 5,
  },
  icons: {
    width: 16,
    color: colors.black,
  },
  dottedBorderRight: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: "transparent",
    borderRightWidth: 2,
    borderRightColor: colors.backgorundEventList,
    borderStyle: "dashed",
    marginVertical: 14,
  },
});
