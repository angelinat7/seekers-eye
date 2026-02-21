import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import PhotoDetailsScreen from "../screens/PhotoDetailsScreen";

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Details"
        component={PhotoDetailsScreen}
        options={{
          presentation: "modal",
          animation: "fade_from_bottom",
        }}
      />
    </Stack.Navigator>
  );
}
