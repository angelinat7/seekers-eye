import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/auth/AuthContext";
import { useTheme } from "../../context/theme/ThemeContext";
import Avatar from "../UI/Avatar";
import Header from "../UI/Header";
import ButtonLink from "../UI/buttons/ButtonLink";
import ButtonPrimary from "../UI/buttons/ButtonPrimary";

export default function EditProfilePhotoModal({ navigation, route }) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [image, setImage] = useState(user.avatar ?? null);

  const pickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission required",
          "Permission to access camera is required.",
        );
        return;
      }

      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.6,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const chooseImageFromGallery = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission required",
          "Permission to access media library is required.",
        );
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.6,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSave = () => {
    if (!image) return;

    route.params?.onSave?.(image);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header variant="EDIT_PROFILE_PHOTO" />
      <View
        style={{
          paddingLeft: 20,
          paddingVertical: 10,
          backgroundColor: theme.background,
        }}
      >
        <ButtonLink
          iconName="arrow-back"
          iconSize={18}
          colorKey="accent"
          title="Back"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={[styles.content, { backgroundColor: theme.tab.background }]}>
        <View style={styles.avatarContainer}>
          <Avatar size="xl" avatar={image} />
          {image && (
            <View style={styles.infoMessage}>
              <Ionicons
                name="checkmark-outline"
                size={20}
                color={theme.success}
              />
              <Text style={[styles.infoText, { color: theme.success }]}>
                Image selected
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.buttonCard,
            {
              backgroundColor: theme.tab.background,
              color: theme.textSecondary,
              borderColor: theme.border,
            },
          ]}
          onPress={pickImage}
        >
          <LinearGradient
            style={styles.linearGradient}
            colors={[theme.gradient.start, theme.gradient.end]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="camera-outline" size={20} color={theme.surface} />
          </LinearGradient>
          <View style={styles.textContainer}>
            <Text style={[styles.buttonTitle, { color: theme.textSecondary }]}>
              Take Photo
            </Text>
            <Text style={[styles.buttonText, { color: theme.textSecondary }]}>
              Use your camera to capture a photo
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buttonCard,
            {
              backgroundColor: theme.tab.background,
              color: theme.textSecondary,
              borderColor: theme.border,
            },
          ]}
          onPress={chooseImageFromGallery}
        >
          <LinearGradient
            style={styles.linearGradient}
            colors={[theme.gradient.start, theme.gradient.end]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="images-outline" size={20} color={theme.surface} />
          </LinearGradient>
          <View style={styles.textContainer}>
            <Text style={[styles.buttonTitle, { color: theme.textSecondary }]}>
              Choose from Gallery
            </Text>
            <Text style={[styles.buttonText, { color: theme.textSecondary }]}>
              Select a photo from your library
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.buttonsContainer}>
          <ButtonPrimary
            title="Save picture"
            iconName="save-outline"
            onPress={handleSave}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 20,
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    width: 140,
    height: 140,
    borderRadius: 75,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  infoMessage: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 16,
  },
  infoText: {
    fontSize: 12,
  },
  buttonCard: {
    borderWidth: 2,
    borderRadius: 8,
    flexDirection: "row",
    gap: 16,
    padding: 16,
  },
  linearGradient: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {},
  buttonTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  buttonText: {
    fontSize: 12,
  },
  buttonsContainer: {
    width: "100%",
    paddingHorizontal: 16,
    rowGap: 10,
    paddingTop: 20,
  },
});
