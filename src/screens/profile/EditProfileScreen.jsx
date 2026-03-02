import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import Avatar from "../../components/UI/Avatar";
import FormInput from "../../components/UI/FormInput";
import Header from "../../components/UI/Header";
import ButtonLink from "../../components/UI/buttons/ButtonLink";
import ButtonPrimary from "../../components/UI/buttons/ButtonPrimary";
import { EDIT_PROFILE_FIELDS } from "../../constants/input-fields";
import { useAuth } from "../../context/auth/AuthContext";
import { useTheme } from "../../context/theme/ThemeContext";
import { useForm } from "../../hooks/useForm";
import { uploadImageToStorage } from "../../services/firebase-storage-service";
import { validateInputField } from "../../utils/validate-input-field";

export default function EditProfileScreen() {
  const { theme } = useTheme();
  const { profile, updateProfile } = useAuth();
  const navigation = useNavigation();

  const [avatar, setAvatar] = useState(profile.photoUrl ?? null);
  const [loading, setLoading] = useState(false);

  const initialValues = { username: "" };

  const { values, setValues, errors, handleInputChange, validateForm } =
    useForm({
      initialValues,
      fields: EDIT_PROFILE_FIELDS,
      validateField: validateInputField,
    });

  useEffect(() => {
    if (profile?.username) {
      setValues((prev) => ({
        ...prev,
        username: profile.username,
      }));
    }
  }, [profile]);

  const openPhotoModal = () => {
    navigation.navigate("EditPhotoModal", { setAvatar });
  };

  const handleSave = async () => {
    const formErrors = validateForm(EDIT_PROFILE_FIELDS);
    if (Object.keys(formErrors).length > 0) {
      Toast.show({
        type: "error",
        text1: "Form Error",
        text2: "Please review the form and try again",
        position: "bottom",
        bottomOffset: 200,
      });
      return;
    }

    const updates = {};

    // Check avatar change
    if (avatar && avatar !== profile.photoUrl) {
      if (avatar.startsWith("file://")) {
        setLoading(true);
        try {
          const avatarPath = `avatars/${profile.uid}/avatar.jpg`;
          const { downloadURL } = await uploadImageToStorage(
            avatar,
            avatarPath,
          );
          updates.photoUrl = downloadURL;
        } catch (error) {
          console.warn("Avatar upload failed", error);
        } finally {
          setLoading(false);
        }
      } else {
        updates.photoUrl = avatar;
      }
    }

    // Username changed
    if (values.username && values.username.trim() !== profile.username) {
      updates.username = values.username.trim();
    }

    if (Object.keys(updates).length === 0) {
      Toast.show({
        type: "error",
        text1: "No changes made",
        text2: "Please review the form and try again",
      });
      return;
    }

    // Firestore update
    setLoading(true);
    try {
      await updateProfile(profile.uid, updates);
      Toast.show({
        type: "success",
        text1: "Upload completed",
        position: "bottom",
        bottomOffset: 200,
      });
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Update failed",
        text2:
          "Something went wrong while updating your profile. Please try again.",
        position: "bottom",
        bottomOffset: 200,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header variant="EDIT_PROFILE" />
        <View style={{ paddingLeft: 20, paddingVertical: 10 }}>
          <ButtonLink
            iconName="arrow-back"
            iconSize={18}
            colorKey="accent"
            title="Back"
            onPress={() => navigation.goBack()}
          />
        </View>

        <View style={styles.content}>
          {/* Avatar preview */}
          <View style={styles.avatarContainer}>
            <Avatar size="lg" avatar={avatar} />

            <TouchableOpacity
              style={[
                styles.camButton,
                {
                  backgroundColor: theme.background,
                  borderColor: theme.border,
                },
              ]}
              onPress={openPhotoModal}
            >
              <Ionicons
                name="camera-outline"
                size={16}
                color={theme.shadowColor}
              />
            </TouchableOpacity>

            <ButtonLink
              title="Change profile picture"
              colorKey="accent"
              size="sm"
              onPress={() => navigation.navigate("EditPhotoModal")}
            />
          </View>

          <FormInput
            label="Name"
            theme={theme}
            value={values.username}
            onChangeText={(text) => handleInputChange("username", text)}
            errorMessage={errors.username}
          />
          <FormInput
            label="Email"
            message="Email cannot be changed"
            theme={theme}
            placeholder={profile.email}
            editable={false}
          />

          <View style={styles.buttonContainer}>
            <ButtonPrimary
              title={loading ? "Saving changes..." : "Save Changes"}
              iconName="save-outline"
              size={18}
              onPress={handleSave}
              disabled={loading}
              loading={loading}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: 16,
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    position: "relative",
  },
  buttonContainer: {
    marginTop: 48,
  },
  camButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    overflow: "hidden",
    position: "absolute",
    right: 140,
    top: 62,
  },
});
