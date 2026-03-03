import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../context/theme/ThemeContext";
import Badge from "../Badge";
import { isVotingClosed } from "../../../utils/is-voting-closed";
import { useState } from "react";
import { useAuth } from "../../../context/auth/AuthContext";

export default function ContestPhotoCard({ photo, onPress }) {
  const { theme } = useTheme();
  const { profile } = useAuth();

  const voted = photo?.likedBy?.includes(profile.uid) ?? false;

  const votingClosed = isVotingClosed(photo.votingEndsAt);

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.surface }]}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={[styles.imgContainer, { shadowColor: theme.shadowColor }]}>
        <Image source={{ uri: photo.downloadURL }} style={styles.image} />
        <View style={styles.badgeContainer}>
          <Badge state={votingClosed ? "CLOSED" : "OPEN"} />
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          {photo.title}
        </Text>
        <View>
          <View style={styles.userLikesRow}>
            <Text style={[styles.user, { color: theme.textPrimary }]}>
              by {photo.authorName}
            </Text>
            <View style={styles.likesContainer}>
              {voted ? (
                <Ionicons name="heart" size={18} color={theme.error} />
              ) : (
                <Ionicons name="heart-outline" size={18} color={theme.error} />
              )}
              <Text style={[styles.likes, { color: theme.error }]}>
                {photo.likes}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    borderRadius: 8,
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
