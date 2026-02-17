import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ProfilePhotoCard({ item, theme }) {
  const navigation = useNavigation();
  const editPhotoHandler = () => {
    navigation.navigate("EditPhoto", { photo: item });
  };
  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />

      <View style={styles.textContent}>
        <View>
          <Text style={[styles.photoTitle, { color: theme.textPrimary }]}>
            {item.title}
          </Text>

          <View style={styles.rowCenter}>
            <Ionicons name="heart" size={12} color={theme.accent} />
            <Text style={[styles.photoLikes, { color: theme.textSecondary }]}>
              {item.likes} votes
            </Text>
          </View>
        </View>

        <View style={styles.actionButtonsContainer}>
          <Pressable style={styles.actionButton} onPress={editPhotoHandler}>
            <Ionicons name="create-outline" size={12} color={theme.info} />
            <Text style={[styles.actionText, { color: theme.info }]}>Edit</Text>
          </Pressable>

          <Pressable style={styles.actionButton}>
            <Ionicons name="trash-outline" size={12} color={theme.error} />
            <Text style={[styles.actionText, { color: theme.error }]}>
              Delete
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  textContent: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    justifyContent: "space-between",
    borderRadius: 8,
  },
  photoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  photoLikes: {
    fontSize: 12,
    marginLeft: 4,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionText: {
    fontSize: 12,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
