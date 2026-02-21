export const RedirectTargets = {
  HOME: "home",
  ADD_PHOTO: "add-photo",
  PROFILE: "profile",
};

export const REDIRECT_ROUTES = {
  [RedirectTargets.ADD_PHOTO]: { screen: "Add Photo" },
  [RedirectTargets.PROFILE]: { screen: "ProfileTab" },
  [RedirectTargets.HOME]: { screen: "Home" },
};
