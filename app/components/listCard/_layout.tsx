import { Image, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { colors } from "@/app/styles/colors";
import { ListingItem } from "@/interfaces/listing";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/types/types";

import { styles } from "./styles";

type NavigationType = NativeStackNavigationProp<RootStackParamList, "ListCard">;

const ListCard = ({ item }: { item: ListingItem }) => {
  const navigation = useNavigation<NavigationType>();

  return (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <View style={styles.cardInfoDate}>
          <Text style={styles.cardInfoDateDay}>12</Text>
          <Text style={styles.cardInfoDateText}>AUG</Text>
        </View>
        <View style={styles.cardInfoHosts}>
          <Image
            source={{ uri: item.host_thumbnail_url }}
            style={styles.hostImage}
          />
          <Image
            source={{ uri: item.host_thumbnail_url }}
            style={styles.hostImage}
          />
          <View style={styles.moreHost}>
            <Feather name="more-horizontal" size={24} color="white" />
          </View>
        </View>
        <View style={styles.cardInfoDate}>
          <Ionicons name="ticket-outline" size={24} color={colors.primary} />
          <Text style={styles.cardInfoDateText}>$12K</Text>
        </View>
      </View>
      <View style={styles.cardImage}>
        <TouchableOpacity
          onPress={() => navigation.navigate("DetailsPage", { id: item.id })}
          style={styles.imageContent}
        >
          <Image source={{ uri: item.medium_url }} style={styles.image} />
          <View style={styles.imageContentInfo}>
            <Text style={styles.eventTitle}>{item.name}</Text>
            <View style={styles.eventInfoContent}>
              <View style={styles.eventInfoContent}>
                <Entypo name="location-pin" size={18} color={colors.white} />
                <Text style={styles.eventTextInfo}>{item.host_location}</Text>
              </View>
              <View style={styles.eventInfoContent}>
                <AntDesign name="clockcircleo" size={14} color={colors.white} />
                <Text style={styles.eventTextInfo}>17:00</Text>
              </View>
            </View>
            <View style={styles.eventInfoContentQ}>
              <Ionicons name="people-sharp" size={16} color={colors.white} />
              <Text style={styles.eventTextInfo}>
                {item.host_listings_count} quotas
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListCard;
