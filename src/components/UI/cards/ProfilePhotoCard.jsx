import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { deletePhoto } from "../../../services/firestore-photos-service";
import Toast from "react-native-toast-message";
import { useState } from "react";
import ConfirmModal from "../../modals/ConfirmModal";

export default function ProfilePhotoCard({ item, theme }) {
  const navigation = useNavigation();
  const [confirmVisible, setConfirmVisible] = useState(false);

  const editPhotoHandler = () => {
    navigation.navigate("EditPhoto", { photo: item });
  };

  const onDeleteHandler = async () => {
    try {
      await deletePhoto(item.id, item.downloadURL);
      Toast.show({
        type: "success",
        text1: "Picture deleted successfully",
        position: "bottom",
        bottomOffset: 200,
      });
    } catch (error) {
      console.warn(error);
      Toast.show({
        type: "error",
        text1: "Error deleting picture",
        text2: "Please try again",
        position: "bottom",
        bottomOffset: 200,
      });
    }
  };
  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <Image source={{ uri: item.downloadURL }} style={styles.image} />

      <View style={styles.textContent}>
        <Text style={[styles.photoTitle, { color: theme.textPrimary }]}>
          {item.title}
        </Text>

        <View style={styles.cardRowContainer}>
          {/* Likes */}
          <View style={styles.likesContainer}>
            <Ionicons name="heart" size={14} color={theme.accent} />
            <Text style={[styles.photoLikes, { color: theme.textSecondary }]}>
              {item.likes} {item.likes === 1 ? "vote" : "votes"}
            </Text>
          </View>
          {/* Buttons */}
          <View style={styles.actionButtonsContainer}>
            <Pressable style={styles.actionButton} onPress={editPhotoHandler}>
              <Ionicons name="create-outline" size={12} color={theme.info} />
              <Text style={[styles.actionText, { color: theme.info }]}>
                Edit
              </Text>
            </Pressable>

            <Pressable
              style={styles.actionButton}
              onPress={() => setConfirmVisible(true)}
            >
              <Ionicons name="trash-outline" size={12} color={theme.error} />
              <Text style={[styles.actionText, { color: theme.error }]}>
                Delete
              </Text>
            </Pressable>
          </View>
        </View>
        <ConfirmModal
          visible={confirmVisible}
          title="Delete  photo"
          message={`You are about to delete a photo from your collection.\n This action cannot be undone`}
          onCancel={() => setConfirmVisible(false)}
          onConfirm={() => {
            setConfirmVisible(false);
            onDeleteHandler();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  textContent: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    borderRadius: 8,
  },
  photoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },
  cardRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  photoLikes: {
    fontSize: 13,
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionText: {
    fontSize: 14,
  },
});
