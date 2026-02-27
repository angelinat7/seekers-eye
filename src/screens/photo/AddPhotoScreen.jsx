import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
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
import { useTheme } from "../../context/theme/ThemeContext";

export default function AddPhotoScreen() {
  const { theme } = useTheme();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = () => {
    const payload = {
      image,
      title,
      description,
      createdOn: new Date(),
    };
    console.log(payload);
    navigation.reset({
      index: 0,
      routes: [{ name: "HomeTab" }],
    });
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
              value={title}
              onChangeText={setTitle}
              theme={theme}
            />
            <FormInput
              label="Description"
              placeholder="Tell us about your photo"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={2}
              theme={theme}
            />
          </View>

          <ImagePickerField
            value={image}
            onChange={setImage}
            loading={loading}
            setLoading={setLoading}
          />
          <View style={styles.submitButtonContainer}>
            <ButtonPrimary
              title="Submit your photo"
              iconName="cloud-upload-outline"
              onPress={handleSubmit}
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
