import { Image, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { colors } from "@/app/styles/colors";
import { EventData } from "@/app/interface/event.interface";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/types/types";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

import { styles } from "./styles";

type NavigationType = NativeStackNavigationProp<RootStackParamList, "ListCard">;

const ListCard = ({ item }: { item: EventData }) => {
  const navigation = useNavigation<NavigationType>();

  // Función para recortar el string
  const truncateString = (str: string, num: number) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <Animated.View
      style={styles.card}
      entering={FadeInRight}
      exiting={FadeOutLeft}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("DetailsPage", { id: item.id as string })
        }
        style={styles.ticketLeft}
      >
        <View style={styles.dottedBorderLeft} />
        <View style={styles.ticketLeftContent}>
          <Text style={styles.eventTitle}>
            {truncateString(item.title, 20)}
          </Text>
          <View style={styles.eventInfoContent}>
            <FontAwesome name="location-arrow" size={14} style={styles.icons} />
            <Text style={styles.eventTextInfo}>{item.address}</Text>
          </View>
          <View style={styles.eventInfoContent}>
            <AntDesign name="clockcircleo" size={14} style={styles.icons} />
            <Text style={styles.eventTextInfo}>17:00</Text>
          </View>
          <View style={styles.eventInfoContentQ}>
            <Ionicons name="people-sharp" size={14} style={styles.icons} />
            <Text style={styles.eventTextInfo}>
              {item.totalCapacity} quotas
            </Text>
          </View>
        </View>
        <View style={styles.event}>
          <View style={styles.cardInfoDate}>
            <Text style={styles.cardInfoDateDay}>12</Text>
            <Text style={styles.ticketInfoText}>AUGUST</Text>
          </View>
          <View style={styles.cardInfoDate}>
            <Ionicons name="ticket-outline" size={24} color={colors.white} />
            <Text style={styles.ticketInfoText}>$ {item.ticketPrice}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.ticketRight}>
        <View style={styles.dottedBorderRight} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("DetailsPage", { id: item.id as string })
          }
          style={styles.imageContent}
        >
          <Image source={{ uri: item.images[0] }} style={styles.image} />
        </TouchableOpacity>
        {/* <View style={styles.ticketInfoHost}>
          <Image
            source={{ uri: item.host_thumbnail_url }}
            style={styles.hostImage}
          />
          <View style={styles.moreHost}>
            <Feather name="more-horizontal" size={24} color="white" />
          </View>
        </View> */}
      </View>
    </Animated.View>
  );
};

export default ListCard;
