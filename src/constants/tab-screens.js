import HomeScreen from "../screens/HomeScreen";
import AddPhotoScreen from "../screens/AddPhotoScreen";
import ProfileNavigator from "../navigation/ProfileNavigator";
import { RedirectTargets } from "../constants/navigation";

export const TAB_SCREENS = [
  {
    name: "Home",
    component: HomeScreen,
    title: "Home",
    icon: "home",
    requiresAuth: false,
  },
  {
    name: "Add Photo",
    component: AddPhotoScreen,
    title: "Add Photo",
    icon: "add-circle-outline",
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
