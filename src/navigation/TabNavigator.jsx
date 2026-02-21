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
