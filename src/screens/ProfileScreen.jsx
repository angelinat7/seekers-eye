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
    imageUrl:
      "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?w=400",
  },
  {
    id: "2",
    title: "Mountain Lake",
    likes: 98,
    imageUrl:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400",
  },
  {
    id: "3",
    title: "Forest Trail",
    likes: 76,
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400",
  },
  // {
  //   id: "4",
  //   title: "City Skyline",
  //   likes: 214,
  //   imageUrl:
  //     "https://upload.wikimedia.org/wikipedia/commons/9/9c/Golden_city_skyline_%28Unsplash%29.jpg",
  // },
  {
    id: "5",
    title: "Desert Dunes",
    likes: 64,
    imageUrl:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400",
  },
  {
    id: "6",
    title: "Autumn Leaves",
    likes: 143,
    imageUrl:
      "https://images.unsplash.com/photo-1506224477730-7ce69f3e389e?w=400",
  },
  {
    id: "7",
    title: "Starry Night",
    likes: 189,
    imageUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400",
  },
  {
    id: "8",
    title: "Tropical Paradise",
    likes: 201,
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
  },
  {
    id: "9",
    title: "Snowy Peaks",
    likes: 167,
    imageUrl:
      "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=400",
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

