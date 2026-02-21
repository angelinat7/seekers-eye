import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "../context/theme/ThemeContext";
import Header from "../components/UI/Header";
import { Ionicons } from "@expo/vector-icons";

export default function InformationScreen() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header variant="INFO" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* About */}
        <View style={styles.section}>
          <View style={styles.headingSection}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={theme.secondary}
            />
            <Text style={[styles.heading, { color: theme.secondary }]}>
              About the App
            </Text>
          </View>
          <Text style={[styles.text, { color: theme.textPrimary }]}>
            Seeker's Eye Photo Contest is a community-driven photography
            competition app where users can upload their photos and compete for
            the highest number of votes. Each contest runs for a limited time,
            and when voting closes, the photo with the most votes wins.
          </Text>
        </View>
        {/*Voting */}
        <View style={styles.section}>
          <View style={styles.headingSection}>
            <Ionicons name="timer-outline" size={20} color={theme.secondary} />
            <Text style={[styles.heading, { color: theme.secondary }]}>
              How Voting Works
            </Text>
          </View>
          <Text style={[styles.text, { color: theme.textPrimary }]}>
            • Each uploaded photo participates in the current contest round.
            {"\n"}• Logged-in users can vote for their favorite photos.{"\n"}•
            Voting is available only while the contest is active.{"\n"}• When
            the voting period ends, the photo with the highest number of votes
            becomes the winner.{"\n"}• Once voting is closed, no additional
            votes can be submitted.
          </Text>
        </View>
        {/*Add Photo */}
        <View style={styles.section}>
          <View style={styles.headingSection}>
            <Ionicons name="camera-outline" size={20} color={theme.secondary} />
            <Text style={[styles.heading, { color: theme.secondary }]}>
              Add Photo
            </Text>
          </View>
          <Text style={[styles.text, { color: theme.textPrimary }]}>
            Authenticated users can participate in the contest by uploading a
            photo. Photos can be selected from the device gallery or captured
            instantly using the device camera.{"\n\n"}
            Each submission requires a photo, a title, and a short description.
            Once submitted, the photo becomes visible in the contest feed and
            can receive votes from other users.
          </Text>
        </View>
        {/*Profile */}
        <View style={styles.section}>
          <View style={styles.headingSection}>
            <Ionicons name="person-outline" size={18} color={theme.secondary} />
            <Text style={[styles.heading, { color: theme.secondary }]}>
              User Profile
            </Text>
          </View>
          <Text style={[styles.text, { color: theme.textPrimary }]}>
            Inside the Profile tab, users can:{"\n"}• View their uploaded photos
            {"\n"}• See their total votes{"\n"}• Edit their username{"\n"}•
            Change their profile avatar{"\n"}• Toggle light - dark theme.
          </Text>
        </View>
        {/*Authentication */}
        <View style={styles.section}>
          <View style={styles.headingSection}>
            <Ionicons
              name="lock-closed-outline"
              size={18}
              color={theme.secondary}
            />
            <Text style={[styles.heading, { color: theme.secondary }]}>
              Authentication
            </Text>
          </View>
          <Text style={[styles.text, { color: theme.textPrimary }]}>
            Only authenticated users can upload photos and vote. Guests can
            browse photos but cannot interact with voting. This ensures fairness
            and prevents anonymous vote manipulation.
          </Text>
        </View>
        {/*App Purpose */}
        <View style={styles.section}>
          <View style={styles.headingSection}>
            <Ionicons name="ribbon-outline" size={20} color={theme.secondary} />
            <Text style={[styles.heading, { color: theme.secondary }]}>
              App Purpose
            </Text>
          </View>
          <Text style={[styles.text, { color: theme.textPrimary }]}>
            The Seeker's Eye app is designed to let users easily showcase their
            photography skills, participate in contests, and engage with the
            community.{"\n\n"}
            Users can:{"\n"}• Upload and share photos directly from their device
            or camera.{"\n"}• Vote for their favorite photos during active
            contests.{"\n"}• Track their own submissions and total votes in
            their profile.{"\n"}• Customize their profile by updating username
            and avatar.{"\n\n"}
            The app provides a simple, fair, and engaging experience for
            discovering and celebrating creative photography.
          </Text>
        </View>
        {/*Future Improvements */}
        <View style={styles.section}>
          <View style={styles.headingSection}>
            <Ionicons name="rocket-outline" size={20} color={theme.secondary} />
            <Text style={[styles.heading, { color: theme.secondary }]}>
              Future Improvements
            </Text>
          </View>
          <Text style={[styles.text, { color: theme.textPrimary }]}>
            Planned features for future versions include:{"\n"}• Live
            leaderboard screen{"\n"}• Countdown timer for voting{"\n"}• Push
            notifications for winners{"\n"}• Comment section under photos{"\n"}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 0,
  },
  section: {
    marginBottom: 18,
  },
  headingSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
  },
});
