import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import ButtonLink from "../../components/UI/buttons/ButtonLink";
import ButtonOutlined from "../../components/UI/buttons/ButtonOutlined";
import ButtonPrimary from "../../components/UI/buttons/ButtonPrimary";
import FormInput from "../../components/UI/FormInput";
import Header from "../../components/UI/Header";
import { EDIT_PHOTO_FIELDS } from "../../constants/input-fields";
import { useTheme } from "../../context/theme/ThemeContext";
import { useForm } from "../../hooks/useForm";
import { updatePhotoDocument } from "../../services/firestore-photos-service";
import { validateInputField } from "../../utils/validate-input-field";

export default function EditPhotoScreen({ route }) {
  const { theme } = useTheme();
  const { photo } = route.params;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const initialValues = {
    title: "",
    description: "",
  };

  const { values, setValues, errors, handleInputChange, validateForm } =
    useForm({
      initialValues,
      fields: EDIT_PHOTO_FIELDS,
      validateField: validateInputField,
    });

  useEffect(() => {
    if (!photo) return;

    setValues((prev) => ({
      ...prev,
      title: photo?.title ?? "",
      description: photo.description ?? "",
    }));
  }, [photo]);

  const onPressHandler = () => {
    navigation.goBack();
  };

  const onSaveHandler = async () => {
    const formErrors = validateForm(EDIT_PHOTO_FIELDS);

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
    // Check title change
    if (values.title && values.title.trim() !== photo.title) {
      updates.title = values.title.trim();
    }
    // Check description change
    if (values.description && values.description.trim() !== photo.description) {
      updates.description = values.description.trim();
    }
    console.log("EditPhotoScreen, updates: ", updates);
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
      await updatePhotoDocument(photo.id, updates);
      Toast.show({
        type: "success",
        text1: "Photo successfully updated",
        position: "bottom",
        bottomOffset: 200,
      });
      navigation.goBack();
    } catch (error) {
      console.warn(error);
      Toast.show({
        type: "error",
        text1: "Failed to update",
        text2: `${error.message}`,
        position: "bottom",
        bottomOffset: 200,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header variant="EDIT_PHOTO" />
      <View style={{ paddingLeft: 20, paddingVertical: 6 }}>
        <ButtonLink
          iconName="arrow-back"
          iconSize={18}
          colorKey="accent"
          title="Back"
          onPress={onPressHandler}
        />
      </View>

      <KeyboardAvoidingView
        style={[styles.inputContainer, { backgroundColor: theme.background }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.imgContainer}>
            <Image source={{ uri: photo.downloadURL }} style={styles.image} />
          </View>
          <View>
            <FormInput
              label="Title"
              value={values.title}
              onChangeText={(text) => handleInputChange("title", text)}
              errorMessage={errors.title}
              theme={theme}
            />
            <FormInput
              label="Description"
              value={values.description}
              onChangeText={(text) => handleInputChange("description", text)}
              errorMessage={errors.description}
              multiline
              numberOfLines={2}
              theme={theme}
            />
          </View>

          <View style={styles.buttonContainer}>
            <ButtonPrimary
              title="Save Changes"
              iconName="save-outline"
              style={{ width: "80%" }}
              onPress={onSaveHandler}
              loading={loading}
            />
            <ButtonOutlined
              iconName="trash-outline"
              color={theme.error}
              style={{ width: "16%" }}
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
  imgContainer: {
    alignItems: "center",
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: "cover",
    borderRadius: 8,
  },
  inputContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    gap: 16,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 14,
  },
});
