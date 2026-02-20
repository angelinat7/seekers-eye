import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditProfileScreen from "../screens/EditProfileScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditPhotoScreen from "../screens/EditPhotoScreen";
import EditProfilePhotoModal from "../components/modals/EditProfilePhotoModal";

const Stack = createNativeStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="EditPhoto" component={EditPhotoScreen} />
      <Stack.Screen
        name="EditPhotoModal"
        component={EditProfilePhotoModal}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}
