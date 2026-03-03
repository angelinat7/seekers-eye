import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../../context/auth/AuthContext";
import Avatar from "../Avatar";

export default function ProfileCard({ profile, theme, onEditProfileHandler }) {
  return (
    <TouchableOpacity
      onPress={onEditProfileHandler}
      style={[styles.card, { backgroundColor: theme.surface }]}
    >
      <View style={styles.userInfoContainer}>
        <View style={styles.userDetails}>
          <Avatar />

          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: theme.textPrimary }]}>
              {profile?.username}
            </Text>
            <Text style={[styles.userEmail, { color: theme.textPrimary }]}>
              {profile.email} {profile.initials}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={onEditProfileHandler}
          style={{ paddingTop: 2 }}
        >
          <Ionicons name="settings-outline" size={20} color={theme.accent} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    paddingRight: 14,
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: "center",
  },
  userInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userDetails: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },

  userInfo: {},
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 12,
  },
});
