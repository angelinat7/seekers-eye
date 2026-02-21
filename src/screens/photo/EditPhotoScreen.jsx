import { useNavigation } from "@react-navigation/native";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Header from "../../components/UI/Header";

import { useState } from "react";
import ButtonLink from "../../components/UI/buttons/ButtonLink";
import ButtonOutlined from "../../components/UI/buttons/ButtonOutlined";
import ButtonPrimary from "../../components/UI/buttons/ButtonPrimary";
import FormInput from "../../components/UI/FormInput";
import { useTheme } from "../../context/theme/ThemeContext";

export default function EditPhotoScreen({ route }) {
  const { theme } = useTheme();
  const { photo } = route.params;
  const [title, setTitle] = useState(photo.title ?? "");
  const [description, setDescription] = useState(photo.description ?? "");
  const navigation = useNavigation();

  const onPressHandler = () => {
    navigation.goBack();
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
            <Image source={{ uri: photo.imageUrl }} style={styles.image} />
          </View>
          <View>
            <FormInput
              label="Title"
              placeholder=""
              value={title}
              onChangeText={setTitle}
              theme={theme}
            />
            <FormInput
              label="Description"
              placeholder=""
              value={description}
              onChangeText={setDescription}
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
            />
            <ButtonOutlined
              iconName="trash-outline"
              color={theme.error}
              style={{ width: "16%" }}
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
