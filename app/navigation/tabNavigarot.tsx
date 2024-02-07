import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreScren from "../screens/explore/_layout";
import Profile from "../screens/profile/_layout";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import ExploreHeader from "../components/exploreHeader/_layout";
import Message from "../screens/message/_layout";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [category, setCategory] = useState("Trending");
  const { isLoaded, isSignedIn } = useAuth();

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
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Explore"
        options={{
          headerShown: true,
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" color={color} size={size} />
          ),
        }}
      >
        {() => <ExploreScren category={category} />}
      </Tab.Screen>
      <Tab.Screen
        name="Message"
        component={Message}
        options={{
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
