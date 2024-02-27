import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeInRight,
  FadeOutLeft,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import React, { useEffect, useState } from "react";
import useFormEventStore from "@/app/stores/formEventStore";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { colors } from "@/app/styles/colors";
import { AntDesign, Fontisto, Foundation, Ionicons } from "@expo/vector-icons";
import { getUserByClerkId } from "@/app/utils/userDataClerk";
import useAuthToken from "@/app/hooks/useAuthToken";
import Swiper from "react-native-swiper";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 600;

const semana = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

const Mes = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

interface OwnerType {
  image_url: string;
  first_name?: string;
  last_name?: string;
}

const FinishAndPublish = () => {
  const { stateFormEvent } = useFormEventStore();

  const { token } = useAuthToken();
  const userId = stateFormEvent.ownerId;

  const [owner, setOwner] = useState<OwnerType | null>(null);
  const [imgCover, setImgCover] = useState<string>(stateFormEvent.images[0]);
  const [images, setImages] = useState<string[]>(stateFormEvent.images);
  const [dateStar, setDataStar] = useState(stateFormEvent.eventDate);
  const [dateEnd, setDateEnd] = useState(stateFormEvent.eventEndDate);
  const [addressParts, setAddressParts] = useState<string[]>([]);
  const [region, setRegion] = useState({
    latitude: stateFormEvent.latitude || 37.33,
    longitude: stateFormEvent.longitude || -122,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [ticketPurchaseDead, setTicketPurchaseDead] = useState(
    stateFormEvent.ticketPurchaseDeadline
  );

  const day = semana[dateStar.getDay()];
  const month = Mes[dateStar.getMonth()];

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  // const imageAnimatedStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         translateY: interpolate(
  //           scrollOffset.value,
  //           [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
  //           [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
  //         ),
  //       },
  //       {
  //         scale: interpolate(
  //           scrollOffset.value,
  //           [-IMG_HEIGHT, 0, IMG_HEIGHT],
  //           [1, 1, 1]
  //         ),
  //       },
  //     ],
  //   };
  // });

  const initialRegion = {
    latitude: stateFormEvent.latitude || 37.33,
    longitude: stateFormEvent.longitude || -122,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useEffect(() => {
    const ownerUser = async () => {
      if (token) {
        try {
          const response = await getUserByClerkId(userId, token);
          setOwner(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    ownerUser();

    // Dividimos la dirección basada en las comas y almacenar los fragmentos
    const parts = stateFormEvent.address.split(",").map((part) => part.trim());
    setAddressParts(parts);
  }, [stateFormEvent.address, stateFormEvent.ownerId]);

  return (
    <Animated.View
      style={styles.container}
      entering={FadeInRight}
      exiting={FadeOutLeft}
    >
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        scrollEventThrottle={16}
        ref={scrollRef}
      >
        <Swiper
          style={{ height: IMG_HEIGHT }}
          autoplay={false}
          index={0}
          dotColor={colors.grey}
          activeDotColor={colors.white}
        >
          {images.map((img: string, index: number) => (
            <View key={index} style={{ flex: 1 }}>
              <Image
                source={{ uri: img }}
                style={styles.imageCover}
                resizeMode="cover"
              />
            </View>
          ))}
        </Swiper>

        <View style={styles.containerEvent}>
          <View style={styles.titleAndTicket}>
            <View>
              <Text style={styles.title}>{stateFormEvent.title}</Text>
              <Text style={styles.contentText}>
                {stateFormEvent.categories}
              </Text>
            </View>

            <View style={styles.ticketPrice}>
              <Text style={styles.price}>
                {stateFormEvent.ticketPrice === 0
                  ? "Entrada libre"
                  : `$ ${stateFormEvent.ticketPrice}`}
              </Text>
            </View>
          </View>

          <View style={styles.containterDesc}>
            <View style={styles.containerDescStar}>
              <Text style={styles.subTitle}>Acerca del evento</Text>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <AntDesign name="star" size={18} color="black" />
                <Text>
                  {stateFormEvent.rating === 0 ? "5,0" : stateFormEvent.rating}
                </Text>
              </View>
            </View>
            <Text style={styles.contentText}>{stateFormEvent.description}</Text>
          </View>

          <View style={styles.availableTickets}>
            <Ionicons name="ticket-outline" size={20} color="black" />
            <Text>{stateFormEvent.availableTickets}</Text>
            <Text style={styles.label}>Disponibles</Text>
          </View>

          <TouchableOpacity
            style={styles.ownerContainer}
            onPress={() => console.log(owner?.first_name)}
          >
            <Image
              source={{ uri: owner?.image_url }}
              style={styles.avatarOwner}
            />
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.label}>Organizador</Text>
              <Text>
                {owner?.first_name} {owner?.last_name}
              </Text>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <AntDesign name="star" size={16} color="black" />
                <Text>5.0</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.containerStartAndEnd}>
            <View style={styles.containerEvenDate}>
              <Text style={styles.label}>Comienza</Text>
              <View style={styles.containerDate}>
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.subTitle}>
                    {dateStar instanceof Date
                      ? `${dateStar.getDate()}`
                      : "Invalid date"}
                  </Text>
                  <Text style={styles.contentText}>
                    {dateStar instanceof Date ? `${month}` : "Invalid date"}
                  </Text>
                </View>
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.subTitle}>
                    {dateStar instanceof Date ? `${day}` : "Invalid date"}
                  </Text>
                  <Text style={styles.contentText}>
                    {dateStar instanceof Date
                      ? `${dateStar.getHours()}:${dateStar.getMinutes()}`
                      : "Invalid Time"}
                  </Text>
                </View>
              </View>
            </View>
            {dateStar instanceof Date !== dateEnd instanceof Date && (
              <View style={styles.containerEvenDate}>
                <Text style={styles.label}>Termina</Text>
                <View style={styles.containerDate}>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.subTitle}>
                      {dateEnd instanceof Date
                        ? `${dateEnd.getDate()}`
                        : "Invalid date"}
                    </Text>
                    <Text style={styles.contentText}>
                      {dateEnd instanceof Date ? `${month}` : "Invalid date"}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.subTitle}>
                      {dateEnd instanceof Date ? `${day}` : "Invalid date"}
                    </Text>
                    <Text style={styles.contentText}>
                      {dateEnd instanceof Date
                        ? `${dateEnd.getHours()}:${dateEnd.getMinutes()}`
                        : "Invalid Time"}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* <View>
              <Text>End ticket purchase limit:</Text>
              <Text>
              {ticketPurchaseDead instanceof Date
                ? `${ticketPurchaseDead.getDate()} / ${
                  ticketPurchaseDead.getMonth() + 1
                } / ${ticketPurchaseDead.getFullYear()}`
                : "Invalid date"}
                </Text>
            </View> */}

          <View style={styles.containterDesc}>
            <View style={styles.labelGroup}>
              <View>
                <Text style={styles.label}>Dirección</Text>
                <Text style={styles.contentText}>{addressParts[0]}</Text>
              </View>
              <View>
                <Text style={styles.label}>Nivel, Local, Bloq, Piso</Text>
                <Text style={styles.contentText}>{addressParts[1]}</Text>
              </View>
            </View>
            <View style={styles.labelGroup}>
              <View>
                <Text style={styles.label}>Ciudad</Text>
                <Text style={styles.contentText}>{addressParts[2]}</Text>
              </View>
              <View>
                <Text style={styles.label}>Departamento</Text>
                <Text style={styles.contentText}>{addressParts[3]}</Text>
              </View>
            </View>
          </View>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={region}
              scrollEnabled={false}
              zoomEnabled={false}
              rotateEnabled={false}
              pitchEnabled={false}
              scrollDuringRotateOrZoomEnabled={false}
            >
              <Marker
                coordinate={{
                  latitude: initialRegion.latitude,
                  longitude: initialRegion.longitude,
                }}
              />
            </MapView>
          </View>

          {/* <Text>
            {stateFormEvent.status ? stateFormEvent.status : "Pending"}
          </Text> */}

          {stateFormEvent.ageRestriction && (
            <View style={styles.importanInfo}>
              <Foundation
                name="prohibited"
                size={24}
                color={colors.black}
                style={{ marginRight: 10 }}
              />
              <Text>{stateFormEvent.ageRestriction}</Text>
            </View>
          )}
          {stateFormEvent.accessibilityInfo && (
            <View style={styles.importanInfo}>
              <Fontisto
                name="paralysis-disability"
                size={24}
                color={colors.black}
                style={{ marginRight: 10 }}
              />
              <Text>{stateFormEvent.accessibilityInfo}</Text>
            </View>
          )}

          <Text>{stateFormEvent.refundPolicy}</Text>
        </View>
      </Animated.ScrollView>
    </Animated.View>
  );
};

export default FinishAndPublish;

const styles = StyleSheet.create({
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
