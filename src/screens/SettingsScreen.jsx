import { View, Text, StyleSheet } from "react-native";
import ThemeSwitch from "../components/UI/ThemeSwitch";
import { useTheme } from "../context/theme/ThemeContext";
import Header from "../components/UI/Header";
import ButtonLink from "../components/UI/buttons/ButtonLink";

export default function SettingsScreen({ navigation }) {
  const { theme, mode, changeMode } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header variant="SETTINGS" />
      <View style={{ paddingLeft: 20, paddingVertical: 10 }}>
        <ButtonLink
          iconName="arrow-back"
          iconSize={18}
          colorKey="accent"
          title="Back"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.accent }]}>
            Appearance
          </Text>
          <View style={[styles.card, { borderColor: theme.border }]}>
            <ThemeSwitch
              theme={theme}
              mode={mode}
              onChange={changeMode}
              variant="full"
            />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.accent }]}>
            App version
          </Text>
          <Text style={[styles.text, { color: theme.textPrimary }]}>1.0.0</Text>
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
    flex: 0,
    padding: 20,
  },
  card: {
    // paddingVertical: 16,
    // paddingHorizontal: 8,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1.5,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    paddingLeft: 20,
    fontSize: 14,
    fontWeight: "regular",
  },
});
