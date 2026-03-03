import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/auth/AuthContext";
import { useTheme } from "../../context/theme/ThemeContext";
import { pickFromCamera, pickFromGallery } from "../../utils/pick-image";
import Avatar from "../UI/Avatar";
import Header from "../UI/Header";
import ButtonLink from "../UI/buttons/ButtonLink";
import ButtonPrimary from "../UI/buttons/ButtonPrimary";

export default function EditProfilePhotoModal({ navigation, route }) {
  const { theme } = useTheme();
  const { profile } = useAuth();

  const { setAvatar } = route.params;

  const [image, setImage] = useState(profile.photoUrl ?? null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!image) return;
    setAvatar(image); // pass local uri back to parent
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
        <View style={styles.scrollContent}>
          <TouchableOpacity
            style={[
              styles.buttonCard,
              {
                backgroundColor: theme.tab.background,
                color: theme.textSecondary,
                borderColor: theme.border,
              },
            ]}
            onPress={() =>
              pickFromCamera((img) => setImage(img.uri), setLoading)
            }
            disabled={loading}
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
              <Text
                style={[styles.buttonTitle, { color: theme.textSecondary }]}
              >
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
            onPress={() =>
              pickFromGallery((img) => setImage(img.uri), setLoading)
            }
            disabled={loading}
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
              <Text
                style={[styles.buttonTitle, { color: theme.textSecondary }]}
              >
                Choose from Gallery
              </Text>
              <Text style={[styles.buttonText, { color: theme.textSecondary }]}>
                Select a photo from your library
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.submitButtonContainer}>
            <ButtonPrimary
              title="Save picture"
              iconName="save-outline"
              onPress={handleSave}
              loading={loading}
            />
          </View>
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
    flex: 1,
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
    paddingTop: 16,
  },
  infoText: {
    fontSize: 12,
  },
  scrollContent: {
    flex: 1,
    gap: 16,
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
  submitButtonContainer: {
    width: "100%",
    paddingHorizontal: 16,
    rowGap: 10,
    paddingTop: 20,
  },
});
