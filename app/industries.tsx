import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { colors } from "../src/theme/colors";

const industries = [
  "Residential",
  "Commercial Buildings",
  "Hospitality",
  "Food & Beverage",
  "Light Industry",
  "Agriculture",
];

export default function IndustriesPage() {
  const { width } = useWindowDimensions();
  const isMobile = width < 720;

  return (
    <View style={styles.page}>
      <Text style={styles.eyebrow}>Industries</Text>
      <Text style={StyleSheet.flatten([styles.heading, isMobile && styles.headingMobile])}>
        Products for the places water quality matters.
      </Text>
      <View style={styles.grid}>
        {industries.map((industry) => (
          <View key={industry} style={StyleSheet.flatten([styles.card, isMobile && styles.cardMobile])}>
            <Text style={styles.cardTitle}>{industry}</Text>
            <Text style={styles.cardText}>
              Match filtration, purification, dosing, and conditioning products to this
              industry's flow rate, quality, and maintenance needs.
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    marginHorizontal: "auto",
    maxWidth: 1180,
    paddingHorizontal: 20,
    paddingVertical: 46,
    width: "100%",
  },
  eyebrow: {
    color: colors.lagoon,
    fontSize: 14,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  heading: {
    color: colors.graphite,
    fontSize: 42,
    fontWeight: "900",
    lineHeight: 50,
    marginTop: 12,
    maxWidth: 820,
  },
  headingMobile: {
    fontSize: 32,
    lineHeight: 39,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 32,
  },
  card: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    flexBasis: "31%",
    flexGrow: 1,
    minWidth: 250,
    padding: 18,
  },
  cardMobile: {
    flexBasis: "100%",
  },
  cardTitle: {
    color: colors.graphite,
    fontSize: 18,
    fontWeight: "900",
  },
  cardText: {
    color: colors.steel,
    fontSize: 14,
    lineHeight: 23,
    marginTop: 9,
  },
});
