import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { colors } from "../src/theme/colors";

export default function AboutPage() {
  const { width } = useWindowDimensions();
  const isMobile = width < 760;

  return (
    <View style={styles.page}>
      <Text style={styles.eyebrow}>About Us</Text>
      <Text style={StyleSheet.flatten([styles.heading, isMobile && styles.headingMobile])}>
        Engineering support for dependable water treatment.
      </Text>
      <Text style={styles.body}>
        Equinox Engineering supplies water treatment products and practical guidance for
        customers who need cleaner, safer, and more reliable water systems.
      </Text>
      <View style={StyleSheet.flatten([styles.grid, isMobile && styles.gridMobile])}>
        {["Product selection", "System thinking", "After-sales clarity"].map((item) => (
          <View key={item} style={styles.card}>
            <Text style={styles.cardTitle}>{item}</Text>
            <Text style={styles.cardText}>
              This section can be expanded with your company story, values, service model,
              certifications, and team details.
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
    paddingVertical: 54,
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
  body: {
    color: colors.steel,
    fontSize: 18,
    lineHeight: 30,
    marginTop: 18,
    maxWidth: 760,
  },
  grid: {
    flexDirection: "row",
    gap: 16,
    marginTop: 34,
  },
  gridMobile: {
    flexDirection: "column",
  },
  card: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    padding: 20,
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
    marginTop: 10,
  },
});
