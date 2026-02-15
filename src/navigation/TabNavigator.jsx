import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "../context/auth/AuthContext";

import { TAB_SCREENS } from "../constants/tab-screens";
import { useTheme } from "../context/theme/ThemeContext";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();

  const handleAuthRequiredPress = (e, navigation, redirectTarget) => {
    if (!isAuthenticated) {
      e.preventDefault();
      navigation.navigate("AuthNavigator", {
        screen: "Login",
        params: { redirectTo: redirectTarget },
      });
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.tab.active,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.border,
          height: 110,
          paddingTop: 4,
          paddingVertical: 2,
        },
        tabBarIconStyle: { marginBottom: 2 },
        tabBarHideOnKeyboard: true,
        headerShown: false,
      })}
    >
      {TAB_SCREENS.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{
            title: screen.title,
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name={screen.icon} color={color} />
            ),
          }}
          listeners={
            screen.requiresAuth
              ? ({ navigation }) => ({
                  tabPress: (e) =>
                    handleAuthRequiredPress(
                      e,
                      navigation,
                      screen.redirectTarget,
                    ),
                })
              : undefined
          }
        />
      ))}
    </Tab.Navigator>
  );
}

// export default function TabNavigator() {
//   const Tab = createBottomTabNavigator();
//   const { isAuthenticated } = useAuth();

//   const redirectToAuth = (navigation, target) => {
//     navigation.navigate("AuthNavigator", {
//       screen: "Login",
//       params: { redirectTo: target },
//     });
//   };

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarActiveTintColor: Colors.primary,
//         tabBarIconStyle: { marginBottom: 2 },
//         tabBarHideOnKeyboard: true,
//         headerShown: false,
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color }) => (
//             <Ionicons size={28} name="home" color={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Upload"
//         component={UploadPhoto}
//         options={{
//           title: "Add Photo",
//           tabBarIcon: ({ color }) => (
//             <Ionicons size={28} name="add-circle-outline" color={color} />
//           ),
//         }}
//         listeners={({ navigation }) => ({
//           tabPress: (e) => {
//             if (!isAuthenticated) {
//               e.preventDefault();
//               redirectToAuth(navigation, RedirectTargets.ADD_PHOTO);
//             }
//           },
//         })}
//       />
//       <Tab.Screen
//         name="ProfileTab"
//         component={ProfileNavigator}
//         options={{
//           title: "Profile",
//           headerShown: false,
//           tabBarIcon: ({ color }) => (
//             <Ionicons size={28} name="person" color={color} />
//           ),
//         }}
//         listeners={({ navigation }) => ({
//           tabPress: (e) => {
//             if (!isAuthenticated) {
//               e.preventDefault();
//               redirectToAuth(navigation, RedirectTargets.PROFILE);
//             }
//           },
//         })}
//       />
//     </Tab.Navigator>
//   );
// }

