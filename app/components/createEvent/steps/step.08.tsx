import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
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
import { AntDesign } from "@expo/vector-icons";
import { getUserByClerkId } from "@/app/utils/userDataClerk";
import useAuthToken from "@/app/hooks/useAuthToken";

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

const FinishAndPublish = () => {
  const { stateFormEvent } = useFormEventStore();

  const authToken = useAuthToken();
  const userId = stateFormEvent.ownerId;

  const [owner, setOwner] = useState(null);
  // console.log("🚀 ~ owner:", owner?.first_name, owner?.last_name);
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

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const initialRegion = {
    latitude: stateFormEvent.latitude || 37.33,
    longitude: stateFormEvent.longitude || -122,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useEffect(() => {
    const ownerUser = async () => {
      if (authToken) {
        try {
          const response = await getUserByClerkId(userId, authToken);
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
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        scrollEventThrottle={16}
        ref={scrollRef}
      >
        <Image
          source={{ uri: imgCover }}
          style={styles.imageCover}
          resizeMode="cover"
        />
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
            {/* <Text style={styles.subTitle}>Ubicación</Text> */}
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

          <Text>
            Tickets: {stateFormEvent.totalCapacity} /{" "}
            {stateFormEvent.availableTickets}
          </Text>

          {images.map((img: string, index: number) => (
            <Image key={index} source={{ uri: img }} style={styles.image} />
          ))}
          <Text>
            {stateFormEvent.status ? stateFormEvent.status : "Pending"}
          </Text>

          <Text>{stateFormEvent.ageRestriction}</Text>
          <Text>{stateFormEvent.accessibilityInfo}</Text>

          <Text>{stateFormEvent.refundPolicy}</Text>
        </View>
      </ScrollView>
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
});
