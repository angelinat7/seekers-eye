import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "../context/theme/ThemeContext";
import ButtonPrimary from "../components/UI/buttons/ButtonPrimary";
import { Ionicons } from "@expo/vector-icons";
import ButtonLink from "../components/UI/buttons/ButtonLink";
import { useAuth } from "../context/auth/AuthContext";
import { useState } from "react";

export default function PhotoDetailsScreen({ route, navigation }) {
  const { item } = route.params;
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      </View>
      <View style={{ paddingLeft: 20, paddingTop: 6 }}>
        <ButtonLink
          iconName="arrow-back"
          iconSize={18}
          colorKey="accent"
          title="Back"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: theme.label }]}>
            {item.title}
          </Text>
          <Text style={[styles.author, { color: theme.textSecondary }]}>
            by {item.author}
          </Text>
        </View>
        {/* <View style={styles.descriptionScroll}> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.descriptionContent}
          style={styles.descriptionScroll}
        >
          <Text style={[styles.description, { color: theme.label }]}>
            {item.description}
          </Text>
        </ScrollView>
        {/* </View> */}

        <View style={styles.cardWrapper}>
          <View style={[styles.votingCard, { backgroundColor: theme.surface }]}>
            <View style={styles.cardRowContainer}>
              <View style={styles.likesContainer}>
                <Ionicons
                  name="heart-outline"
                  size={18}
                  color={theme.textSecondary}
                />
                <Text
                  style={[styles.photoLikes, { color: theme.textSecondary }]}
                >
                  {item.likes} votes
                </Text>
              </View>
              <View style={styles.timerContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={16}
                  color={theme.textSecondary}
                />
                <Text style={[styles.time, { color: theme.textSecondary }]}>
                  Voting closed
                </Text>
              </View>
            </View>
            <ButtonPrimary
              title="Vote for this photo"
              iconName="heart-outline"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  imageContainer: {},
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  titleContainer: {
    paddingHorizontal: 28,
    paddingTop: 20,
  },
  descriptionContent: {
    paddingHorizontal: 28,
    // paddingVertical: 16,
  },
  descriptionScroll: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    letterSpacing: 1.6,
  },
  author: {
    fontSize: 12,
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    lineHeight: 24,
  },
  cardWrapper: {
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 4,
  },
  votingCard: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 16,
    borderRadius: 8,
  },
  cardRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingHorizontal: 2,
  },
  likesContainer: {
    flexDirection: "row",
    gap: 6,
  },
  timerContainer: {
    flexDirection: "row",
    gap: 10,
  },
  time: {
    fontSize: 12,
  },
});
