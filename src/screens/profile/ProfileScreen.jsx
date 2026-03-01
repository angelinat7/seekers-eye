import { CommonActions } from "@react-navigation/native";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ButtonOutlined from "../../components/UI/buttons/ButtonOutlined";
import ButtonPrimary from "../../components/UI/buttons/ButtonPrimary";
import ProfileCard from "../../components/UI/cards/ProfileCard";
import ProfilePhotoCard from "../../components/UI/cards/ProfilePhotoCard";
import Header from "../../components/UI/Header";
import ThemeSwitch from "../../components/UI/ThemeSwitch";
import { db } from "../../config/firebase-config";
import { useAuth } from "../../context/auth/AuthContext";
import { useTheme } from "../../context/theme/ThemeContext";
import { getPhotosByUser } from "../../services/firestore-photos-service";

export default function ProfileScreen({ navigation }) {
  const { theme, mode, changeMode, ready } = useTheme();
  const { profile, logout } = useAuth();
  const [userPhotos, setUserPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserPhotos = async () => {
    try {
      const data = await getPhotosByUser(profile.uid);
      setUserPhotos(data);
    } catch (error) {
      console.warn(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!profile?.uid) return;

    const q = query(
      collection(db, "photos"),
      where("authorId", "==", profile.uid),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const photos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUserPhotos(photos);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [profile?.uid]);

  const onEditProfileHandler = () => {
    navigation.navigate("EditProfile");
  };

  const logoutHandler = () => {
    logout();

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "HomeTab" }],
      }),
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header variant="PROFILE" />
      <View style={styles.innerContainer}>
        <ProfileCard
          profile={profile}
          onEditProfileHandler={onEditProfileHandler}
          theme={theme}
        />
        <View style={styles.sectionTitleContainer}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            My Photos ({userPhotos.length})
          </Text>
          <ThemeSwitch theme={theme} mode={mode} onChange={changeMode} />
        </View>

        <View style={styles.scrollContent}>
          {userPhotos.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyText, { color: theme.textPrimary }]}>
                You haven't uploaded any photos yet
              </Text>
              <View
                style={{ marginTop: 30, width: "100%", alignItems: "center" }}
              >
                <ButtonOutlined
                  title="Upload your first photo"
                  style={{ width: "80%" }}
                  color={theme.accent}
                  onPress={() => navigation.navigate("Add Photo")}
                />
              </View>
            </View>
          ) : (
            <FlatList
              contentContainerStyle={{ gap: 10 }}
              data={userPhotos}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ProfilePhotoCard
                  item={item}
                  theme={theme}
                  setUserPhotos={setUserPhotos}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
        <View style={styles.logoutButtonContainer}>
          <ButtonPrimary
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
    paddingVertical: 12,
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 16,
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
