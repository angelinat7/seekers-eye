import React from "react";
import { Text, StyleSheet } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import LinearGradient from "react-native-linear-gradient";

const GradientText = ({ text, style }) => {
  return (
    <MaskedView
      maskElement={<Text style={[style, styles.maskText]}>{text}</Text>}
    >
      <LinearGradient
        colors={["#1a73e8", "#34a853", "#fbbc05", "#ea4335"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        {/* This text just defines the size */}
        <Text style={[style, styles.hiddenText]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  maskText: {
    backgroundColor: "transparent",
  },
  hiddenText: {
    opacity: 0,
  },
});

export default GradientText;
