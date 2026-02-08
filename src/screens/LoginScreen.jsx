import { Button, StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <>
      <View style={StyleSheet.container}>
        <Text>Login Screen</Text>
      </View>

      <Button title="Login" onPress={() => {}} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
