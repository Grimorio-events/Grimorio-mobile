import { colors } from "@/app/styles/colors";
import { Dimensions, StyleSheet } from "react-native";

const IMG_HEIGHT = 600;
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  containerEvent: {
    paddingHorizontal: 20,
  },
  containerStartAndEnd: {
    flexDirection: "row",
    gap: 40,
  },
  containerEvenDate: {
    marginTop: 30,
  },
  containerDate: {
    flexDirection: "row",
    gap: 20,
  },
  containterDesc: {
    marginTop: 30,
  },
  containerDescStar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageCover: {
    height: IMG_HEIGHT,
    width: width,
  },
  containerImg: {
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "500",
    marginTop: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  contentText: {
    fontSize: 14,
    letterSpacing: 1,
  },
  labelGroup: {
    flexDirection: "row",
    gap: 20,
    marginVertical: 4,
  },
  label: {
    color: colors.grey,
    fontSize: 14,
    fontWeight: "300",
  },
  textInput: {
    height: 40,
    borderColor: colors.grey,
    borderBottomWidth: 1,
    padding: 10,
    fontSize: 18,
  },
  image: {
    height: 200,
    width: 150,
    borderRadius: 10,
  },
  mapContainer: {
    width: "100%",
    height: 200,
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20, // Esto no es necesario si ya existe overflow: 'hidden' en mapContainer
  },
  titleAndTicket: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ticketPrice: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.white,
  },
  importanInfo: {
    marginVertical: 10,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.black,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  ownerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    justifyContent: "space-between",
  },
  avatarOwner: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  availableTickets: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    gap: 10,
  },
});
