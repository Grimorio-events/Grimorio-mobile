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
  useAnimatedRef,
  useScrollViewOffset,
} from "react-native-reanimated";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { colors } from "@/app/styles/colors";
import { AntDesign, Fontisto, Foundation, Ionicons } from "@expo/vector-icons";
import { getUserByClerkId } from "@/app/utils/userDataClerk";
import useAuthToken from "@/app/hooks/useAuthToken";
import Swiper from "react-native-swiper";
import { styles } from "./styles";
import { EventData } from "@/app/interface/event.interface";

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

interface TicketEventProps {
  data: EventData;
}

interface OwnerType {
  image_url?: string;
  first_name?: string;
  last_name?: string;
}

const TicketEvent: React.FC<TicketEventProps> = ({ data }) => {
  const { token } = useAuthToken();
  const userId = data.ownerId;

  const [owner, setOwner] = useState<OwnerType | null>(null);
  const [imgCover, setImgCover] = useState<string>(data.images[0]);
  const [images, setImages] = useState<string[]>(data.images);
  const [dateStar, setDataStar] = useState(new Date(data.eventDate));
  const [dateEnd, setDateEnd] = useState(
    data.eventEndDate ? new Date(data.eventEndDate) : null
  );
  const [addressParts, setAddressParts] = useState<string[]>([]);
  const [region, setRegion] = useState({
    latitude: data.latitude || 37.33,
    longitude: data.longitude || -122,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [ticketPurchaseDead, setTicketPurchaseDead] = useState(
    data.ticketPurchaseDeadline
  );

  const day = semana[dateStar.getDay()];
  const month = Mes[dateStar.getMonth()];

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const initialRegion = {
    latitude: data.latitude || 37.33,
    longitude: data.longitude || -122,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useEffect(() => {
    const ownerUser = async () => {
      if (token) {
        console.log("🚀 ~ useEffect ~ Bring Owner data");
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
    const parts = data.address.split(",").map((part) => part.trim());
    setAddressParts(parts);
  }, [data.address, data.ownerId, token]);

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
              <Text style={styles.title}>{data.title}</Text>
              <Text style={styles.contentText}>{data.categories}</Text>
            </View>

            <View style={styles.ticketPrice}>
              <Text style={styles.price}>
                {data.ticketPrice === 0
                  ? "Entrada libre"
                  : `$ ${data.ticketPrice}`}
              </Text>
            </View>
          </View>

          <View style={styles.containterDesc}>
            <View style={styles.containerDescStar}>
              <Text style={styles.subTitle}>Acerca del evento</Text>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <AntDesign name="star" size={18} color="black" />
                <Text>{data.rating === 0 ? "5,0" : data.rating}</Text>
              </View>
            </View>
            <Text style={styles.contentText}>{data.description}</Text>
          </View>

          <View style={styles.availableTickets}>
            <Ionicons name="ticket-outline" size={20} color="black" />
            <Text>{data.availableTickets}</Text>
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

          {data.ageRestriction && (
            <View style={styles.importanInfo}>
              <Foundation
                name="prohibited"
                size={24}
                color={colors.black}
                style={{ marginRight: 10 }}
              />
              <Text>{data.ageRestriction}</Text>
            </View>
          )}
          {data.accessibilityInfo && (
            <View style={styles.importanInfo}>
              <Fontisto
                name="paralysis-disability"
                size={24}
                color={colors.black}
                style={{ marginRight: 10 }}
              />
              <Text>{data.accessibilityInfo}</Text>
            </View>
          )}

          <Text>{data.refundPolicy}</Text>
        </View>
      </Animated.ScrollView>
    </Animated.View>
  );
};

export default TicketEvent;
