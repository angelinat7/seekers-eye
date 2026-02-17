import { FlatList, StyleSheet, Text, View } from "react-native";
import ButtonOutlined from "../components/UI/buttons/ButtonOutlined";
import Header from "../components/UI/Header";
import PhotoCard from "../components/UI/PhotoCard";
import ThemeSwitch from "../components/UI/ThemeSwitch";
import { useAuth } from "../context/auth/AuthContext";
import { useTheme } from "../context/theme/ThemeContext";
import { CommonActions } from "@react-navigation/native";

const mockUser = {
  name: "John Doe",
  email: "john@example.com",
};

const userPhotos = [
  {
    id: "1",
    title: "Sunset Beach",
    likes: 128,
    description:
      "A peaceful beach glowing under a vibrant sunset sky. Waves gently roll onto the shore as the horizon fades into warm orange and pink tones.",
    imageUrl:
      "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?w=400",
  },
  {
    id: "2",
    title: "Mountain Lake",
    likes: 98,
    description:
      "A crystal-clear lake surrounded by towering mountain peaks. The calm water perfectly reflects the sky and rugged landscape.",
    imageUrl:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400",
  },
  {
    id: "3",
    title: "Forest Trail",
    likes: 76,
    description:
      "A quiet trail winding through a dense green forest. Sunlight filters softly through the trees, creating a serene atmosphere.",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400",
  },
  {
    id: "4",
    title: "City Skyline",
    likes: 214,
    description:
      "A stunning city skyline illuminated against the evening sky. Skyscrapers glow with lights as the city comes alive after sunset.",
    imageUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=400",
  },
  {
    id: "5",
    title: "Desert Dunes",
    likes: 64,
    description:
      "Golden sand dunes stretch endlessly under the bright sun. Wind-sculpted patterns create a dramatic and timeless desert scene.",
    imageUrl:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400",
  },
  {
    id: "6",
    title: "Autumn Leaves",
    likes: 143,
    description:
      "Colorful autumn leaves blanket the ground in shades of red and gold. A crisp breeze carries the feeling of a changing season.",
    imageUrl:
      "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?w=400",
  },
  {
    id: "7",
    title: "Starry Night",
    likes: 189,
    description:
      "A breathtaking view of a sky filled with countless stars. The quiet night is illuminated by the soft glow of the Milky Way.",
    imageUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400",
  },
  {
    id: "8",
    title: "Tropical Paradise",
    likes: 201,
    description:
      "Turquoise waters meet soft white sands beneath swaying palm trees. A perfect escape into a warm and relaxing island setting.",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
  },
  {
    id: "9",
    title: "Snowy Peaks",
    likes: 167,
    description:
      "Snow-covered mountain peaks rise sharply into the clear sky. The crisp air and untouched snow create a pure winter landscape.",
    imageUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400",
  },
];

// const userPhotos = [];
export default function ProfileScreen({ navigation }) {
  const { theme, mode, changeMode, ready } = useTheme();
  const { logout } = useAuth();

  if (!ready || !theme) return null;

  const logoutHandler = () => {
    logout();

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }],
      }),
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header purpose="HOME" />
      <View style={styles.innerContainer}>
        <View style={[styles.userCard, { backgroundColor: theme.surface }]}>
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: theme.primary }]}>
              {mockUser.name}
            </Text>
            <Text style={[styles.userEmail, { color: theme.primary }]}>
              {mockUser.email}
            </Text>
          </View>
          <View style={styles.editButton}>
            <ButtonOutlined title="Edit" iconName="create-outline" size={18} />
          </View>
        </View>

        <ThemeSwitch theme={theme} mode={mode} onChange={changeMode} />

        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
          My Photos ({userPhotos.length})
        </Text>
        <View style={styles.scrollContent}>
          {userPhotos.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyText, { color: theme.textPrimary }]}>
                You haven't uploaded any photos yet
              </Text>
              <ButtonOutlined
                title="Upload your first photo"
                style={{ width: "75%" }}
                color={theme.info}
                onPress={() => {}}
              />
            </View>
          ) : (
            <FlatList
              contentContainerStyle={{ gap: 10 }}
              data={userPhotos}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <PhotoCard item={item} theme={theme} />}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
        <View style={styles.logoutButtonContainer}>
          <ButtonOutlined
            title="Logout"
            onPress={logoutHandler}
            iconName={"log-out-outline"}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  userCard: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: "row",
  },
  userInfo: {
    flex: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginHorizontal: 5,
  },
  emptyState: {
    marginTop: 20,
    alignItems: "center",
    gap: 20,
  },
  emptyText: {
    marginBottom: 12,
  },
  logoutButtonContainer: {
    marginTop: 16,
  },
});

