import { useEffect, useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import Header from "../components/UI/Header";
import ContestPhotoCard from "../components/UI/cards/ContestPhotoCard";
import { useTheme } from "../context/theme/ThemeContext";
import { getAllPhotos } from "../services/firestore-photos-service";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const data = await getAllPhotos();
      setPhotos(data);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error fetching data",
        text2: `${error?.message}` ?? "Something went wrong",
        position: "bottom",
        bottomOffset: 200,
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPhotos();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPhotos();
    }, []),
  );

  const onRefresh = () => {
    fetchPhotos();
  };

  if (loading && photos.length === 0)
    return (
      <View
        style={[
          styles.indicatorContainer,
          { backgroundColor: theme.background },
        ]}
      >
        <ActivityIndicator size="large" />
      </View>
    );

  if (!loading && photos.length === 0)
    return (
      <View
        style={[
          styles.indicatorContainer,
          { backgroundColor: theme.background },
        ]}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: theme.accent }}>
          No photos yet
        </Text>
      </View>
    );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header purpose="HOME" />
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContestPhotoCard
            photo={item}
            imageSource={{ uri: item.downloadURL }}
            onPress={() => navigation.navigate("Details", { item })}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            colors={[theme.accent]}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  indicatorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listContent: {
    padding: 16,
  },
});
