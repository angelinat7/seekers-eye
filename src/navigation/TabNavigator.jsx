import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "../constants/Colors";
import { UseAuth } from "../context/auth/AuthContext";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import UploadPhoto from "../screens/UploadPhoto";
import ProfileNavigator from "./ProfileNavigator";

export default function TabNavigator() {
  const Tab = createBottomTabNavigator();
  const { isAuthenticated, user } = UseAuth();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarIconStyle: { marginBottom: 2 },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="home" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={user ? UploadPhoto : LoginScreen}
        options={{
          title: "Add Photo",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="add-circle-outline" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="person" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

