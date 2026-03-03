import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../components/UI/Header";
import { useTheme } from "../context/theme/ThemeContext";

export default function InformationScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header variant="INFO" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* About the App */}
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
            Seeker's Eye is a community-driven photo contest app where users
            upload photos and compete for votes. Contests run for a limited
            time, and the top-voted photo wins.
          </Text>
        </View>

        {/* Voting */}
        <View style={styles.section}>
          <View style={styles.headingSection}>
            <Ionicons name="timer-outline" size={20} color={theme.secondary} />
            <Text style={[styles.heading, { color: theme.secondary }]}>
              Voting
            </Text>
          </View>
          <Text style={[styles.text, { color: theme.textPrimary }]}>
            • Each photo is open for voting for one week after upload.{"\n"}•
            Logged-in users can vote once per photo.{"\n"}• Votes are visible
            during the voting period, which counts down in the UI.{"\n"}• Once
            the week is over, voting closes, but the photo remains viewable.
          </Text>
        </View>

        {/* Add Photo */}
        <View style={styles.section}>
          <View style={styles.headingSection}>
            <Ionicons name="camera-outline" size={20} color={theme.secondary} />
            <Text style={[styles.heading, { color: theme.secondary }]}>
              Add Photo
            </Text>
          </View>
          <Text style={[styles.text, { color: theme.textPrimary }]}>
            Authenticated users can upload photos from the device gallery or
            camera. Each submission requires a photo, title, and description,
            and is visible in the contest feed.
          </Text>
        </View>

        {/* Profile */}
        <View style={styles.section}>
          <View style={styles.headingSection}>
            <Ionicons name="person-outline" size={18} color={theme.secondary} />
            <Text style={[styles.heading, { color: theme.secondary }]}>
              Profile
            </Text>
          </View>
          <Text style={[styles.text, { color: theme.textPrimary }]}>
            Users can view their photos, total votes, edit their username and
            avatar, and toggle the theme.
          </Text>
        </View>

        {/* Authentication */}
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
            browse photos but cannot vote, ensuring fair contests.
          </Text>
        </View>

        {/* App Purpose */}
        <View style={styles.section}>
          <View style={styles.headingSection}>
            <Ionicons name="ribbon-outline" size={20} color={theme.secondary} />
            <Text style={[styles.heading, { color: theme.secondary }]}>
              App Purpose
            </Text>
          </View>
          <Text style={[styles.text, { color: theme.textPrimary }]}>
            Seeker's Eye lets users showcase photography, participate in
            contests, vote on favorites, and track submissions. The app
            emphasizes simplicity, fairness, and positive engagement.
          </Text>
        </View>

        {/* Future Improvements */}
        <View style={styles.section}>
          <View style={styles.headingSection}>
            <Ionicons name="rocket-outline" size={20} color={theme.secondary} />
            <Text style={[styles.heading, { color: theme.secondary }]}>
              Future Improvements
            </Text>
          </View>
          <Text style={[styles.text, { color: theme.textPrimary }]}>
            Planned features include a live leaderboard, push notifications for
            winners, and a photo comment section.
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
