import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

const pickImage = async ({ source, onPick, options, onLoadingChange }) => {
  const { allowsEditing = true, aspect = [1, 1], quality = 0.6 } = options;
  try {
    onLoadingChange?.(true);
    let permissionResult;
    if (source === "camera") {
      permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission required",
          "Permission to access camera is required.",
        );
        return;
      }
    } else if (source === "gallery") {
      permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission required",
          "Permission to access media library is required.",
        );
        return;
      }
    }

    const result =
      source === "camera"
        ? await ImagePicker.launchCameraAsync({
            mediaTypes: ["images"],
            allowsEditing,
            aspect,
            quality,
          })
        : await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing,
            aspect,
            quality,
          });

    if (!result.canceled) {
      onPick(result.assets[0]);
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    onLoadingChange?.(false);
  }
};

export const pickFromCamera = (onPick, options = {}, onLoadingChange) => {
  pickImage({ source: "camera", onPick, options, onLoadingChange });
};
export const pickFromGallery = (onPick, options = {}, onLoadingChange) => {
  pickImage({ source: "gallery", onPick, options, onLoadingChange });
};
