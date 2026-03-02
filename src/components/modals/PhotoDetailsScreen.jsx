import { Ionicons } from "@expo/vector-icons";
import { useMemo, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import { useAuth } from "../../context/auth/AuthContext";
import { useTheme } from "../../context/theme/ThemeContext";
import { toggleLike } from "../../services/firestore-photos-service";
import { isVotingClosed } from "../../utils/is-voting-closed";
import ButtonLink from "../UI/buttons/ButtonLink";
import ButtonPrimary from "../UI/buttons/ButtonPrimary";
import VotingTimer from "../UI/VotingTimer";

export default function PhotoDetailsScreen({ route, navigation }) {
  const { item } = route.params;
  const { theme } = useTheme();
  const { isAuthenticated, profile } = useAuth();
  const [isLiked, setIsLiked] = useState(
    item.likedBy?.includes(profile.uid) ?? false,
  );
  const [likes, setLikes] = useState(item?.likes ?? 0);
  const [loading, setLoading] = useState(false);

  const votingClosed = useMemo(
    () => isVotingClosed(item.votingEndsAt),
    [item.votingEndsAt],
  );

  const handleLike = async () => {
    if (!isAuthenticated) {
      navigation.navigate("Login");
      return;
    }
    if (votingClosed || loading) return;

    const newLikedState = !isLiked;
    setIsLiked(newLikedState);

    setLikes((prev) => prev + (newLikedState ? 1 : -1));

    setLoading(true);
    try {
      await toggleLike(item.id, profile.uid);
    } catch (error) {
      console.warn(error);
      setIsLiked(newLikedState);
      setLikes((prev) => prev + (newLikedState ? -1 : 1));
      Toast.show({
        type: "error",
        text1: "Error toggling like",
        text1: "Please try again",
        position: "bottom",
        bottomOffset: 200,
      });
    } finally {
      setLoading(false);
    }
  };

  const { buttonTitle, buttonIcon } = useMemo(() => {
    if (!isAuthenticated)
      return {
        buttonTitle: "Login to vote",
        buttonIcon: "lock-closed-outline",
      };
    if (votingClosed) {
      return {
        buttonTitle: "Voting closed",
        buttonIcon: "lock-closed",
      };
    }

    return isLiked
      ? {
          buttonTitle: "Remove vote",
          buttonIcon: "heart",
        }
      : {
          buttonTitle: "Vote for this photo",
          buttonIcon: "heart-outline",
        };
  }, [isAuthenticated, votingClosed, isLiked]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.downloadURL }} style={styles.image} />
      </View>
      <View style={{ paddingLeft: 20, paddingTop: 16 }}>
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
            by {item.authorName}
          </Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.descriptionContent}
          style={styles.descriptionScroll}
        >
          <Text style={[styles.description, { color: theme.label }]}>
            {item.description}
          </Text>
        </ScrollView>

        <View style={styles.cardWrapper}>
          <View style={[styles.votingCard, { backgroundColor: theme.surface }]}>
            <View style={styles.cardRowContainer}>
              <View style={styles.likesContainer}>
                <Ionicons
                  name={isLiked ? "heart" : "heart-outline"}
                  size={18}
                  color={theme.error}
                />

                <Text
                  style={[styles.photoLikes, { color: theme.textSecondary }]}
                >
                  {likes} votes
                </Text>
              </View>
              <View style={styles.timerContainer}>
                <VotingTimer
                  votingEndsAt={item.votingEndsAt.toDate()}
                  color={theme.accent}
                />
              </View>
            </View>

            <ButtonPrimary
              title={buttonTitle}
              iconName={buttonIcon}
              disabled={loading || votingClosed}
              onPress={handleLike}
              loading={loading}
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
