import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreScren from "../screens/explore/_layout";
import Profile from "../screens/profile/_layout";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import ExploreHeader from "../components/exploreHeader/_layout";
import Message from "../screens/message/_layout";
import { colors } from "../styles/colors";
import { LogOutButton } from "../hooks/logoutButton";
import Create from "../screens/create/_layout";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [category, setCategory] = useState("Trending");
  const { isLoaded, isSignedIn, getToken } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;
    console.log("🚀 isSignedIn tabNav: ", isSignedIn);
  }, [isSignedIn]);

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { height: 60 },
        tabBarLabelStyle: {
          // Estilos aplicados a la etiqueta del texto de la tabBar
          fontSize: 12,
          marginBottom: 5,
        },
        tabBarIconStyle: {
          // Estilo para el ícono
          marginTop: 5,
        },
      }}
    >
      <Tab.Screen
        name="Events"
        options={{
          headerShown: true,
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ticket-outline" color={color} size={size} />
          ),
        }}
      >
        {() => <ExploreScren category={category} />}
      </Tab.Screen>
      <Tab.Screen
        name="Create"
        component={Create}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="pencil-square-o" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          tabBarBadge: 3,
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="message1" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: isSignedIn ? true : false,
          header: () => <LogOutButton />,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome
              name={!isSignedIn ? "user-circle-o" : "user-circle"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
