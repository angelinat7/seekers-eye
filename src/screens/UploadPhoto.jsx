import { View, Text, StyleSheet } from "react-native";

export default function UploadPhoto() {
  return (
    <View style={styles.container}>
      <Text>Upload Photo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
