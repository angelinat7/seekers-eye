import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import ButtonPrimary from "../../components/UI/buttons/ButtonPrimary";
import FormInput from "../../components/UI/FormInput";
import Header from "../../components/UI/Header";
import ImagePickerField from "../../components/UI/ImagePickerField";
import { ADD_PHOTO_FIELDS } from "../../constants/input-fields";
import { useAuth } from "../../context/auth/AuthContext";
import { useTheme } from "../../context/theme/ThemeContext";
import { useForm } from "../../hooks/useForm";
import {
  createPhotoDocument,
  uploadImageToStorage,
} from "../../services/firestore-photos-service";
import { validateInputField } from "../../utils/validate-input-field";

export default function AddPhotoScreen() {
  const { theme } = useTheme();
  const { profile } = useAuth();

  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const initialValues = {
    title: "",
    description: "",
  };

  const { values, errors, handleInputChange, validateForm } = useForm({
    initialValues,
    fields: ADD_PHOTO_FIELDS,
    validateField: validateInputField,
  });

  const handleUploadPhoto = async () => {
    // validate form
    const formErrors = validateForm(ADD_PHOTO_FIELDS);
    if (Object.keys(formErrors).length > 0) {
      Alert.alert("Form Error", "Please review the form and try again");
      return;
    }

    if (!selectedImage) {
      Alert.alert("No image selected", "Please select an image and try again");
      return;
    }

    try {
      setLoading(true);
      // Generate a consistent timestamp for file naming
      const timestamp = Date.now();
      const fileName = `${timestamp}.jpg`;
      const storagePath = `photos/${profile.uid}/${fileName}`;

      // Upload to Firebase storage
      const { downloadURL } = await uploadImageToStorage(
        selectedImage.uri,
        storagePath,
      );

      // Create Firestore document
      const photoDoc = await createPhotoDocument({
        downloadURL,
        storagePath,
        authorId: profile.uid,
        title: values.title,
        description: values.description,
        likes: 0,
      });

      alert("Photo uploaded successfully");
      setSelectedImage(null);

      navigation.reset({
        index: 0,
        routes: [{ name: "HomeTab" }],
      });
    } catch (error) {
      console.warn("Upload error: ", error);
      alert("Something went wrong during upload");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header variant="ADD_PHOTO" />

      <KeyboardAvoidingView
        style={[styles.contentContainer, { backgroundColor: theme.background }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.inputContainer}>
            <FormInput
              label="Title"
              placeholder="Give your photo a title"
              value={values.title}
              onChangeText={(text) => handleInputChange("title", text)}
              errorMessage={errors.title}
              theme={theme}
            />
            <FormInput
              label="Description"
              placeholder="Tell us about your photo"
              value={values.description}
              onChangeText={(text) => handleInputChange("description", text)}
              errorMessage={errors.description}
              multiline
              numberOfLines={2}
              theme={theme}
            />
          </View>

          <ImagePickerField
            value={selectedImage}
            onChange={setSelectedImage}
            loading={loading}
            setLoading={setLoading}
          />
          <View style={styles.submitButtonContainer}>
            <ButtonPrimary
              title="Submit your photo"
              iconName="cloud-upload-outline"
              disabled={loading}
              onPress={handleUploadPhoto}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  imgDataContainer: {
    alignItems: "center",
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: "cover",
    borderRadius: 8,
  },
  inputContainer: {
    paddingTop: 20,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  submitButtonContainer: {
    marginTop: 16,
  },
});
