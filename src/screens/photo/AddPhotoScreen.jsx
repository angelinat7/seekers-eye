import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import ButtonPrimary from "../../components/UI/buttons/ButtonPrimary";
import FormInput from "../../components/UI/FormInput";
import Header from "../../components/UI/Header";
import ImagePickerField from "../../components/UI/ImagePickerField";
import { ADD_PHOTO_FIELDS } from "../../constants/input-fields";
import { useAuth } from "../../context/auth/AuthContext";
import { useTheme } from "../../context/theme/ThemeContext";
import { useForm } from "../../hooks/useForm";
import { uploadImageToStorage } from "../../services/firebase-storage-service";
import { uploadContestPhoto } from "../../services/firestore-photos-service";
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
      Toast.show({
        type: "error",
        text1: "Form Error",
        text2: "Please review the form and try again",
        position: "bottom",
        bottomOffset: 200,
      });
      return;
    }

    if (!selectedImage) {
      Toast.show({
        type: "error",
        text1: "No image selected",
        text2: "Please select an image and try again",
        position: "bottom",
        bottomOffset: 200,
      });
      return;
    }

    try {
      setLoading(true);
      // Create Firestore document first to get its ID

      const photo = await uploadContestPhoto({
        uri: selectedImage.uri,
        authorId: profile.uid,
        authorName: profile.username,
        title: values.title,
        description: values.description,
      });

      // Use the document ID as the Storage file name
      const storagePath = `photos/${profile.uid}/${photo.photoId}.jpg`;

      const { downloadURL } = await uploadImageToStorage(
        selectedImage.uri,
        storagePath,
      );

      Toast.show({
        type: "success",
        text1: "Photo uploaded successfully",
        text2: "Your photo is now live in the contest!",
        position: "bottom",
        bottomOffset: 200,
      });
      setSelectedImage(null);

      navigation.reset({
        index: 0,
        routes: [{ name: "HomeTab" }],
      });
    } catch (error) {
      console.warn("Upload error: ", error);
      Toast.show({
        type: "error",
        text1: "Uploading Error",
        text2: "Something went wrong during upload. Please try again",
        position: "bottom",
        bottomOffset: 200,
      });
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
              loading={loading}
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
