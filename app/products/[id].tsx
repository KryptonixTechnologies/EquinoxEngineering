import { Link, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { getProduct, getRecommendations } from "../../src/data/products";
import { categoryColors, colors } from "../../src/theme/colors";

const placeholderImage = require("../../assets/product images/placeholder.jpeg");

function renderDemand(demand: number) {
  return `${"★".repeat(demand)}${"☆".repeat(5 - demand)}`;
}

export default function ProductDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = getProduct(id);
  const { width } = useWindowDimensions();
  const isMobile = width < 780;

  if (!product) {
    return (
      <View style={styles.page}>
        <Text style={StyleSheet.flatten([styles.heading, isMobile && styles.headingMobile])}>Product not found.</Text>
        <Link href="/products" asChild>
          <Pressable>
            <Text style={styles.backLink}>Back to products</Text>
          </Pressable>
        </Link>
      </View>
    );
  }

  const recommendations = getRecommendations(product.id);

  return (
    <View style={styles.page}>
      <Link href="/products" asChild>
        <Pressable>
          <Text style={styles.backLink}>Back to products</Text>
        </Pressable>
      </Link>
      <View style={StyleSheet.flatten([styles.detail, isMobile && styles.detailMobile])}>
        <View style={styles.imagePanel}>
          <Image source={placeholderImage} style={styles.productImage} resizeMode="cover" />
          {product.topMover ? <Text style={styles.topMover}>Top 20 fast mover</Text> : null}
        </View>
        <View style={styles.main}>
          <Text style={StyleSheet.flatten([styles.category, { color: categoryColors[product.category] }])}>
            {product.category}
          </Text>
          <Text style={StyleSheet.flatten([styles.heading, isMobile && styles.headingMobile])}>{product.name}</Text>
          <Text style={styles.summary}>{product.summary}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
        <View style={styles.specPanel}>
          <Text style={styles.panelTitle}>Product snapshot</Text>
          <View style={styles.snapshotRow}>
            <Text style={styles.snapshotLabel}>Demand</Text>
            <Text style={styles.demand}>{renderDemand(product.demand)}</Text>
          </View>
          <View style={styles.snapshotRow}>
            <Text style={styles.snapshotLabel}>Investment</Text>
            <Text style={styles.snapshotValue}>{product.investment}</Text>
          </View>
          <Text style={styles.panelSubTitle}>Highlights</Text>
          {product.highlights.map((highlight) => (
            <Text key={highlight} style={styles.listItem}>
              • {highlight}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Common applications</Text>
        <View style={styles.chips}>
          {product.applications.map((application) => (
            <Text key={application} style={styles.chip}>
              {application}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended products</Text>
        <View style={StyleSheet.flatten([styles.recommendations, isMobile && styles.recommendationsMobile])}>
          {recommendations.map((item) => (
            <Link key={item.id} href={`/products/${item.id}`} asChild>
              <Pressable style={styles.recommendationCard}>
                <Image source={placeholderImage} style={styles.recommendationImage} resizeMode="cover" />
                <Text style={StyleSheet.flatten([styles.recommendationCategory, { color: categoryColors[item.category] }])}>
                  {item.category}
                </Text>
                <Text style={styles.recommendationName}>{item.name}</Text>
                <Text style={styles.recommendationMeta}>{renderDemand(item.demand)} · {item.investment}</Text>
              </Pressable>
            </Link>
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
    paddingVertical: 42,
    width: "100%",
  },
  backLink: {
    color: colors.lagoonDark,
    fontSize: 14,
    fontWeight: "900",
  },
  detail: {
    flexDirection: "row",
    gap: 24,
    marginTop: 22,
  },
  detailMobile: {
    flexDirection: "column",
  },
  main: {
    flex: 1.4,
  },
  imagePanel: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    flex: 0.85,
    overflow: "hidden",
  },
  productImage: {
    backgroundColor: colors.offWhite,
    height: 310,
    width: "100%",
  },
  topMover: {
    alignSelf: "flex-start",
    backgroundColor: colors.success,
    borderRadius: 6,
    color: colors.white,
    fontSize: 12,
    fontWeight: "900",
    margin: 16,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  category: {
    fontSize: 14,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  heading: {
    color: colors.graphite,
    fontSize: 44,
    fontWeight: "900",
    lineHeight: 52,
    marginTop: 10,
  },
  headingMobile: {
    fontSize: 34,
    lineHeight: 41,
  },
  summary: {
    color: colors.ink,
    fontSize: 20,
    lineHeight: 30,
    marginTop: 18,
  },
  description: {
    color: colors.steel,
    fontSize: 16,
    lineHeight: 27,
    marginTop: 16,
  },
  specPanel: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    flex: 0.75,
    padding: 20,
  },
  panelTitle: {
    color: colors.graphite,
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 12,
  },
  panelSubTitle: {
    color: colors.graphite,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 10,
    marginTop: 18,
  },
  snapshotRow: {
    backgroundColor: colors.offWhite,
    borderRadius: 8,
    marginTop: 10,
    padding: 12,
  },
  snapshotLabel: {
    color: colors.slateGray,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  demand: {
    color: colors.warning,
    fontSize: 15,
    fontWeight: "900",
    marginTop: 5,
  },
  snapshotValue: {
    color: colors.charcoal,
    fontSize: 15,
    fontWeight: "900",
    marginTop: 5,
  },
  listItem: {
    color: colors.steel,
    fontSize: 15,
    lineHeight: 28,
  },
  section: {
    marginTop: 34,
  },
  sectionTitle: {
    color: colors.graphite,
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 14,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    backgroundColor: colors.mineral,
    borderRadius: 8,
    color: colors.lagoonDark,
    fontSize: 14,
    fontWeight: "800",
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  recommendations: {
    flexDirection: "row",
    gap: 14,
  },
  recommendationsMobile: {
    flexDirection: "column",
  },
  recommendationCard: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    overflow: "hidden",
    paddingBottom: 18,
  },
  recommendationImage: {
    backgroundColor: colors.offWhite,
    height: 120,
    marginBottom: 14,
    width: "100%",
  },
  recommendationCategory: {
    fontSize: 12,
    fontWeight: "900",
    paddingHorizontal: 18,
  },
  recommendationName: {
    color: colors.graphite,
    fontSize: 17,
    fontWeight: "900",
    marginTop: 8,
    paddingHorizontal: 18,
  },
  recommendationMeta: {
    color: colors.slateGray,
    fontSize: 13,
    fontWeight: "800",
    marginTop: 8,
    paddingHorizontal: 18,
  },
});
