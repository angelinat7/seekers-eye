import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Badge from "../Badge";
import { useTheme } from "../../../context/theme/ThemeContext";

export default function ContestPhotoCard({ photo, voted = false, onPress }) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.surface }]}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={[styles.imgContainer, { shadowColor: theme.shadowColor }]}>
        <Image source={{ uri: photo.imageUrl }} style={styles.image} />
        <View style={styles.badgeContainer}>
          <Badge state="OPEN" />
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          {photo.title}
        </Text>
        <View>
          <View style={styles.userLikesRow}>
            <Text style={[styles.user, { color: theme.textPrimary }]}>
              by {photo.author}
            </Text>
            <View style={styles.likesContainer}>
              {voted ? (
                <Ionicons name="heart" size={18} color={theme.error} />
              ) : (
                <Ionicons name="heart-outline" size={18} color={theme.error} />
              )}
              <Text style={[styles.likes, { color: theme.error }]}>212</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginBottom: 12,
    overflow: "hidden",
  },
  imgContainer: {
    width: "100%",
    aspectRatio: 4 / 3,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 8,
  },
  badgeContainer: {
    position: "absolute",
    top: 12,
    right: 15,
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  user: {
    fontSize: 12,
  },
  userLikesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2,
  },
  likesContainer: {
    flexDirection: "row",
    gap: 6,
  },
  likes: {
    fontSize: 12,
    fontWeight: "600",
  },
});
