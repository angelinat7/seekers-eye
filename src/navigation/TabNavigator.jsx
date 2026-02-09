import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "../constants/Colors";
import { UseAuth } from "../context/auth/AuthContext";
import HomeScreen from "../screens/HomeScreen";
import UploadPhoto from "../screens/UploadPhoto";
import ProfileNavigator from "./ProfileNavigator";
import { RedirectTargets } from "../constants/navigation";

export default function TabNavigator() {
  const Tab = createBottomTabNavigator();
  const { isAuthenticated } = UseAuth();

  const redirectToAuth = (navigation, target) => {
    navigation.navigate("AuthNavigator", {
      screen: "Login",
      params: { redirectTo: target },
    });
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarIconStyle: { marginBottom: 2 },
        tabBarHideOnKeyboard: true,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="home" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={UploadPhoto}
        options={{
          title: "Add Photo",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="add-circle-outline" color={color} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (!isAuthenticated) {
              e.preventDefault();
              // navigation.navigate("AuthNavigator", {
              //   screen: "Login",
              //   params: { redirectTo: RedirectTargets.ADD_PHOTO },
              // });
              redirectToAuth(navigation, RedirectTargets.ADD_PHOTO);
            }
          },
        })}
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
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (!isAuthenticated) {
              e.preventDefault();
              // navigation.navigate("AuthNavigator", {
              //   params: { redirectTo: RedirectTargets.PROFILE },
              // });
              redirectToAuth(navigation, RedirectTargets.PROFILE);
            }
          },
        })}
      />
    </Tab.Navigator>
  );
}

