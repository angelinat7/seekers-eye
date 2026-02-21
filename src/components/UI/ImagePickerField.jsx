import * as ImagePicker from "expo-image-picker";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../context/theme/ThemeContext";
import ButtonOutlined from "./buttons/ButtonOutlined";
import { Ionicons } from "@expo/vector-icons";

export default function ImagePickerField({
  value,
  onChange,
  aspect = [1, 1],
  allowsEditing = true,
  containerStyle,
}) {
  const { theme } = useTheme();

  const pickImage = async (fromCamera) => {
    try {
      if (fromCamera) {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Camera permission required");
          return;
        }

        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ["images"],
          allowsEditing,
          aspect,
          quality: 0.8,
        });

        if (!result.canceled) {
          onChange(result.assets[0]);
        }
      } else {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
          Alert.alert("Gallery permission required");
          return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsEditing,
          aspect,
          quality: 0.8,
        });

        if (!result.canceled) {
          onChange(result.assets[0]);
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.label }]}>Photo</Text>

      <TouchableOpacity
        style={[styles.imageBox, containerStyle, { borderColor: theme.border }]}
        onPress={() => pickImage(false)}
      >
        {value ? (
          <Image source={{ uri: value.uri }} style={styles.image} />
        ) : (
          <>
            <View style={{ marginBottom: 10 }}>
              <Ionicons name="images-outline" color={theme.label} size={28} />
            </View>
            <Text style={[styles.placeholder, { color: theme.label }]}>
              Click to add photo{" "}
            </Text>
            <Text style={[styles.placeholder, { color: theme.label }]}>
              JPG, PNG up to 10MB{" "}
            </Text>
          </>
        )}
      </TouchableOpacity>

      <View style={styles.buttons}>
        <ButtonOutlined
          color={theme.accent}
          iconName="camera-outline"
          title="Take photo"
          style={{ width: "48%" }}
          onPress={() => pickImage(true)}
        />
        <ButtonOutlined
          color={theme.accent}
          iconName="images-outline"
          title="From Gallery"
          style={{ width: "48%" }}
          onPress={() => pickImage(false)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  imageBox: {
    height: 230,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 16,
  },
  placeholder: {
    fontSize: 12,
    marginBottom: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  link: {
    color: "#007aff",
    fontWeight: "600",
  },
});
