import { useAuth, useUser } from "@clerk/clerk-expo";
import { globalStyles } from "../../styles/styles";
import { useEffect, useState } from "react";
import { colors } from "@/app/styles/colors";
import { ticketByUserId } from "@/app/utils/ticket.byUser";
import useAuthToken from "@/app/hooks/useAuthToken";
import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import OptionProfileSelect from "../profileEvents/_layout";
import { EventData } from "@/app/interface/event.interface";
import { TicketData } from "@/app/interface/ticket.interface";
import OptionProfileTickets from "../profileTickets/_layout";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import styles from "./styles";

interface EventItem {
  event: EventData;
}

interface TicketItem {
  tickets: TicketData;
}

const UserProfile = () => {
  const { isLoaded } = useAuth();
  const { token, sessionId } = useAuthToken();
  const { user } = useUser();

  const { orgRole, orgSlug, has, orgId } = useAuth();
  console.log("🚀 ~ UserProfile ~ orgId:", orgId);
  console.log("🚀 ~ orgRole:", orgRole);

  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [selectedOption, setSelectedOption] = useState("alerts");
  const [ticketByUser, setTicketByUser] = useState([]);
  const [dataEvent, setDataEvent] = useState<EventData[]>([]);
  const [dataTicket, setDataTicket] = useState<TicketData[]>([]);

  const userId = user?.id;

  useEffect(() => {
    if (!user) return;

    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setEmail(user?.emailAddresses[0].emailAddress);

    if (token && sessionId && userId) {
      const ticketByUser = async () => {
        const response = await ticketByUserId(token, sessionId, userId);
        setTicketByUser(response);

        // Eventos
        const uniqueEventsMap = new Map();
        response.forEach((item: EventItem) => {
          const event = item.event;
          uniqueEventsMap.set(event.id, event);
        });
        setDataEvent(Array.from(uniqueEventsMap.values()));

        // Tickets
        const ticketsOnly = response
          .map((item: TicketItem) => {
            // Mapea cada grupo de tickets para extraer solo los tickets sin incluir la información del evento
            return item.tickets.map(({ event, ...ticket }) => ticket);
          })
          .flat(); // Utiliza flat para aplanar el array en caso de que haya múltiples grupos

        setDataTicket(ticketsOnly);
      };

      ticketByUser();
    }
  }, [user, token, sessionId]);

  const onCaptureImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    console.log("image picker: ", result);

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      user?.setProfileImage({
        file: base64,
      });
    }
  };

  if (!isLoaded) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.card}>
          <TouchableOpacity onPress={onCaptureImage}>
            <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
          </TouchableOpacity>
        </View>
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textProfile}>
              {firstName || ""} {lastName || ""}
            </Text>
          </View>
          <Text style={styles.textProfile}> {email || ""}</Text>
        </View>
      </View>
      <View style={{ padding: 10 }}>
        <View style={styles.containerOptions}>
          <TouchableOpacity
            style={styles.containerIcon}
            onPress={() => setSelectedOption("alertas")}
          >
            <Ionicons name="notifications-outline" size={30} color="black" />
            <Text>Alertas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.containerIcon}
            onPress={() => setSelectedOption("tickets")}
          >
            <Ionicons name="ticket-outline" size={28} color="black" />
            <Text>Tickets</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.containerIcon}
            onPress={() => setSelectedOption("eventos")}
          >
            <SimpleLineIcons name="event" size={24} color="black" />
            <Text>Eventos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.containerIcon}
            onPress={() => setSelectedOption("rating")}
          >
            <AntDesign name="staro" size={27} color="black" />
            <Text>Rating</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderBottomColor: colors.black,
            borderBottomWidth: 1,
            marginVertical: 30,
          }}
        ></View>
      </View>
      {selectedOption === "alertas" && <Text>Alertas</Text>}
      {selectedOption === "tickets" && (
        <OptionProfileTickets ticketData={dataTicket} />
      )}
      {selectedOption === "eventos" && (
        <OptionProfileSelect eventData={dataEvent} />
      )}
      {selectedOption === "rating" && <Text>Rating</Text>}
    </View>
  );
};

export default UserProfile;
