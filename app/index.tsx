import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { products } from "../src/data/products";
import { colors } from "../src/theme/colors";

export default function HomePage() {
  const { width } = useWindowDimensions();
  const isMobile = width < 820;

  return (
    <View style={styles.page}>
      <View style={StyleSheet.flatten([styles.hero, isMobile && styles.heroMobile])}>
        <View style={StyleSheet.flatten([styles.heroText, isMobile && styles.heroTextMobile])}>
          <Text style={styles.eyebrow}>Water treatment products</Text>
          <Text style={StyleSheet.flatten([styles.heading, isMobile && styles.headingMobile])}>
            Cleaner water systems, specified with confidence.
          </Text>
          <Text style={StyleSheet.flatten([styles.subheading, isMobile && styles.subheadingMobile])}>
            Explore filtration, purification, conditioning, and dosing products built for
            reliable water quality across homes, facilities, and industry.
          </Text>
          <View style={styles.actions}>
            <Link href="/products" asChild>
              <Pressable style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>View Products</Text>
              </Pressable>
            </Link>
            <Link href="/contact" asChild>
              <Pressable style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Talk to Us</Text>
              </Pressable>
            </Link>
          </View>
        </View>
        <View style={styles.heroPanel}>
          <Text style={styles.panelTitle}>Featured categories</Text>
          {products.slice(0, 3).map((product) => (
            <View key={product.id} style={styles.panelItem}>
              <Text style={styles.panelItemTitle}>{product.category}</Text>
              <Text style={styles.panelItemText}>{product.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Built for practical water challenges</Text>
        <View style={StyleSheet.flatten([styles.grid, isMobile && styles.gridMobile])}>
          {["Pretreatment", "Purification", "Scale Control"].map((item) => (
            <View key={item} style={styles.card}>
              <Text style={styles.cardTitle}>{item}</Text>
              <Text style={styles.cardText}>
                Product information, specs, and recommendations will be tailored around your
                final product list.
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    marginHorizontal: "auto",
    maxWidth: 1180,
    paddingHorizontal: 20,
    paddingVertical: 34,
    width: "100%",
  },
  hero: {
    alignItems: "stretch",
    flexDirection: "row",
    gap: 24,
  },
  heroMobile: {
    flexDirection: "column",
  },
  heroText: {
    flex: 1.35,
    justifyContent: "center",
    minHeight: 420,
  },
  heroTextMobile: {
    minHeight: 0,
    paddingVertical: 34,
  },
  eyebrow: {
    color: colors.lagoon,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 14,
    textTransform: "uppercase",
  },
  heading: {
    color: colors.graphite,
    fontSize: 56,
    fontWeight: "900",
    lineHeight: 62,
    maxWidth: 760,
  },
  headingMobile: {
    fontSize: 38,
    lineHeight: 44,
  },
  subheading: {
    color: colors.steel,
    fontSize: 18,
    lineHeight: 30,
    marginTop: 20,
    maxWidth: 660,
  },
  subheadingMobile: {
    fontSize: 16,
    lineHeight: 26,
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 28,
  },
  primaryButton: {
    backgroundColor: colors.lagoon,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "800",
  },
  secondaryButton: {
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  secondaryButtonText: {
    color: colors.graphite,
    fontSize: 15,
    fontWeight: "800",
  },
  heroPanel: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    flex: 0.8,
    gap: 12,
    justifyContent: "center",
    padding: 22,
  },
  panelTitle: {
    color: colors.graphite,
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 6,
  },
  panelItem: {
    backgroundColor: colors.mist,
    borderRadius: 8,
    padding: 16,
  },
  panelItemTitle: {
    color: colors.lagoonDark,
    fontSize: 13,
    fontWeight: "800",
  },
  panelItemText: {
    color: colors.graphite,
    fontSize: 16,
    fontWeight: "800",
    marginTop: 5,
  },
  section: {
    paddingTop: 42,
  },
  sectionTitle: {
    color: colors.graphite,
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    gap: 16,
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
    padding: 18,
  },
  cardTitle: {
    color: colors.graphite,
    fontSize: 18,
    fontWeight: "900",
  },
  cardText: {
    color: colors.steel,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 9,
  },
});
