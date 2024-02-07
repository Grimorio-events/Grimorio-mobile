import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreScren from "../screens/explore/_layout";
import Profile from "../screens/profile/_layout";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import ExploreHeader from "../components/exploreHeader/_layout";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (!isLoaded) return;
    console.log("🚀 isSignedIn tabNav: ", isSignedIn);
  }, [isSignedIn]);

  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={{
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreScren}
        options={{
          headerShown: true,
          header: () => <ExploreHeader />,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarBadge: 3,
          headerShown: false,
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
