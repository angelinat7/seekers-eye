import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Avatar from "../../components/UI/Avatar";
import FormInput from "../../components/UI/FormInput";
import Header from "../../components/UI/Header";
import ButtonLink from "../../components/UI/buttons/ButtonLink";
import ButtonPrimary from "../../components/UI/buttons/ButtonPrimary";
import { useAuth } from "../../context/auth/AuthContext";
import { useTheme } from "../../context/theme/ThemeContext";
import { EDIT_PROFILE_FIELDS } from "../../constants/input-fields";
import { useForm } from "../../hooks/useForm";
import { validateInputField } from "../../utils/validate-input-field";

export default function EditProfileScreen() {
  const { theme } = useTheme();
  const { profile, updateProfile } = useAuth();
  const navigation = useNavigation();

  const [avatar, setAvatar] = useState(profile.avatar ?? null);
  const [loading, setLoading] = useState(profile.username);

  const initialValues = {
    username: "",
  };

  const { values, errors, handleInputChange, validateForm } = useForm({
    initialValues,
    fields: EDIT_PROFILE_FIELDS,
    validateField: validateInputField,
  });

  const openPhotoModal = () => {
    navigation.navigate("EditPhotoModal", {
      onSave: (newImage) => {
        setAvatar(newImage);
        // TODO Move the logic to a hook
      },
    });
  };
  const handleSave = () => {
    // TODO add logic for picture upload

    const formErrors = validateForm(EDIT_PROFILE_FIELDS);

    if (Object.keys(formErrors).length > 0) {
      Alert.alert("Form Error", "please review the form and try again");
      return;
    }

    try {
      setLoading(true);
      updateProfile(profile.uid, {
        username: values.username,
      });
    } catch (error) {
      Alert.alert("Form error", "Failed to update user profile");
    }
    navigation.goBack();
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
            placeholder={profile.username}
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
              title="Save Changes"
              iconName="save-outline"
              size={18}
              onPress={handleSave}
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
