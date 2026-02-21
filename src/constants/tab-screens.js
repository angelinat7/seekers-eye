import HomeScreen from "../screens/HomeScreen";
import AddPhotoScreen from "../screens/AddPhotoScreen";
import ProfileNavigator from "../navigation/ProfileNavigator";
import { RedirectTargets } from "../constants/navigation";
import HomeNavigator from "../navigation/HomeNavigator";
import InformationScreen from "../screens/InformationScreen";

export const TAB_SCREENS = [
  {
    name: "HomeTab",
    component: HomeNavigator,
    title: "Home",
    icon: "home",
    requiresAuth: false,
  },
  {
    name: "Info",
    component: InformationScreen,
    title: "Info",
    icon: "information-circle",
    requiresAuth: false,
  },
  {
    name: "Add Photo",
    component: AddPhotoScreen,
    title: "Add Photo",
    icon: "camera-outline",
    requiresAuth: true,
    redirectTarget: RedirectTargets.ADD_PHOTO,
  },
  {
    name: "ProfileTab",
    component: ProfileNavigator,
    title: "Profile",
    icon: "person",
    requiresAuth: true,
    redirectTarget: RedirectTargets.PROFILE,
    nestedNavigator: true,
  },
];
