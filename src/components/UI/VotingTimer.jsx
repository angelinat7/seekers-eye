import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function VotingTimer({ votingEndsAt, color }) {
  const [timeRemaining, setTimeRemaining] = useState("");
  const [iconName, setIconName] = useState("stopwatch-outline");

  useEffect(() => {
    if (!votingEndsAt) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const end = new Date(votingEndsAt).getTime();
      const distance = end - now;

      if (distance <= 0) {
        setTimeRemaining("Voting closed");
        setIconName("lock-closed-outline");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeRemaining(`${days}d ${hours}h remaining`);
      } else if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m remaining`);
      } else {
        setTimeRemaining(`${minutes}m remaining`);
      }
    };

    updateTimer(); // run immediately
    const interval = setInterval(updateTimer, 60000); // update every minute

    return () => clearInterval(interval);
  }, [votingEndsAt]);

  return (
    <View style={styles.container}>
      <Ionicons color={color} size={16} name={iconName} />
      <Text style={[styles.text, { color: color }]}>{timeRemaining}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 6,
  },
  text: {
    fontSize: 12,
  },
});
