import { colors } from "@/app/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 20,
  },
  cardInfo: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "15%",
  },
  cardInfoDate: {
    alignItems: "center",
  },
  cardInfoDateDay: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.primary,
  },
  cardInfoDateText: {
    fontSize: 18,
    fontWeight: "900",
  },
  cardInfoHosts: {
    justifyContent: "center",
    alignItems: "center",
  },
  hostImage: {
    width: 30,
    height: 30,
    borderRadius: 8,
    margin: 2,
  },
  moreHost: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    borderRadius: 8,
    margin: 2,
    backgroundColor: colors.primary,
  },
  cardImage: {
    width: "85%",
  },
  imageContent: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  image: {
    width: "100%",
    height: 320,
    borderRadius: 12,
  },
  imageContentInfo: {
    position: "absolute",
    padding: 10,
    backgroundColor: colors.cardBgEvent,
    borderRadius: 12,
    width: "90%",
    bottom: "5%",
  },
  eventTitle: {
    fontSize: 26,
    marginBottom: 7,
    fontWeight: "700",
    color: colors.white,
  },
  eventInfoContent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
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
});
