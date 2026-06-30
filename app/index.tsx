import { Link } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { products } from "../src/data/products";
import { categoryColors, colors } from "../src/theme/colors";

const heroSlides = [
  {
    title: "Water treatment products, ready for serious projects.",
    caption: "Catalogue essentials for filtration, media, pumps, chemicals, lab testing, and plumbing.",
    image: require("../assets/hero section/Corporate Website.png"),
  },
  {
    title: "Filtration products for fast-moving service needs.",
    caption: "Cartridges, housings, RO parts, UV spares, tubing, valves, and replacement components.",
    image: require("../assets/hero section/filters.png"),
  },
  {
    title: "Treatment chemicals and media for reliable plant performance.",
    caption: "Antiscalants, chlorine products, resin, sand, activated carbon, and specialty media.",
    image: require("../assets/hero section/chemicals.png"),
  },
  {
    title: "Filter media for softening, polishing, and contaminant reduction.",
    caption: "Silica sand, activated carbon, anthracite, resin, Katalox Light, Birm, and support media.",
    image: require("../assets/hero section/media.png"),
  },
  {
    title: "Pumps and plumbing accessories for complete installations.",
    caption: "Dosing pumps, gauges, fittings, valves, tanks, tubing, and practical site consumables.",
    image: require("../assets/hero section/pumps.png"),
  },
  {
    title: "Installation accessories that keep every project moving.",
    caption: "Valves, fittings, thread seal tape, clamps, gauges, tubing, and site-ready plumbing essentials.",
    image: require("../assets/hero section/plumbing.png"),
  },
];

const productImage = require("../assets/product images/placeholder.jpeg");

export default function HomePage() {
  const { width } = useWindowDimensions();
  const isMobile = width < 820;
  const [slideIndex, setSlideIndex] = useState(0);
  const slideMotion = useRef(new Animated.Value(0)).current;

  const featuredProducts = useMemo(() => products.filter((product) => product.topMover).slice(0, 4), []);
  const activeSlide = heroSlides[slideIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((current) => (current + 1) % heroSlides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    slideMotion.setValue(0);
    Animated.timing(slideMotion, {
      toValue: 1,
      duration: 520,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [slideIndex, slideMotion]);

  const imageStyle = {
    opacity: slideMotion,
    transform: [
      {
        translateX: slideMotion.interpolate({
          inputRange: [0, 1],
          outputRange: [isMobile ? 18 : 34, 0],
        }),
      },
    ],
  };

  return (
    <View style={styles.page}>
      <View style={StyleSheet.flatten([styles.hero, isMobile && styles.heroMobile])}>
        <Animated.Image source={activeSlide.image} resizeMode="cover" style={[styles.heroImage, imageStyle]} />
        <View style={styles.slideDots}>
          {heroSlides.map((slide, index) => (
            <Pressable
              key={slide.title}
              accessibilityLabel={`Show slide ${index + 1}`}
              style={StyleSheet.flatten([styles.slideDot, index === slideIndex && styles.slideDotActive])}
              onPress={() => setSlideIndex(index)}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={StyleSheet.flatten([styles.sectionHeader, isMobile && styles.sectionHeaderMobile])}>
          <View>
            <Text style={styles.sectionEyebrow}>Featured products</Text>
            <Text style={styles.sectionTitle}>Fast-moving products to start with</Text>
          </View>
          <Link href="/products" asChild>
            <Pressable style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View all</Text>
            </Pressable>
          </Link>
        </View>

        <View style={StyleSheet.flatten([styles.featuredGrid, isMobile && styles.featuredGridMobile])}>
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} asChild>
              <Pressable style={styles.productCard}>
                <Image source={productImage} style={styles.productImage} resizeMode="cover" />
                <View style={styles.productCardBody}>
                  <Text style={StyleSheet.flatten([styles.productCategory, { color: categoryColors[product.category] }])}>
                    {product.category}
                  </Text>
                  <Text style={styles.productName}>{product.name}</Text>
                </View>
              </Pressable>
            </Link>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionEyebrow}>Product categories</Text>
        <Text style={styles.sectionTitle}>Built for practical water challenges</Text>
        <View style={StyleSheet.flatten([styles.grid, isMobile && styles.gridMobile])}>
          {["Filter Cartridges", "Filter Media", "Chemicals", "Pumps", "Laboratory", "Plumbing"].map((item) => (
            <View key={item} style={styles.card}>
              <Text style={styles.cardTitle}>{item}</Text>
              <Text style={styles.cardText}>
                Stock the essentials customers request often, from treatment consumables to installation accessories.
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
    paddingVertical: 28,
    width: "100%",
  },
  hero: {
    backgroundColor: colors.white,
    borderRadius: 8,
    height: 520,
    marginHorizontal: -20,
    overflow: "hidden",
    position: "relative",
  },
  heroMobile: {
    height: 320,
  },
  slideDots: {
    bottom: 18,
    flexDirection: "row",
    gap: 8,
    left: 0,
    position: "absolute",
    right: 0,
    justifyContent: "center",
  },
  slideDot: {
    backgroundColor: "rgba(255,255,255,0.62)",
    borderRadius: 4,
    height: 8,
    width: 24,
  },
  slideDotActive: {
    backgroundColor: colors.white,
    width: 40,
  },
  heroImage: {
    height: "100%",
    width: "100%",
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  sectionHeader: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 18,
  },
  sectionHeaderMobile: {
    alignItems: "flex-start",
    flexDirection: "column",
  },
  sectionEyebrow: {
    color: colors.primaryBlue,
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  sectionTitle: {
    color: colors.darkNavy,
    fontSize: 30,
    fontWeight: "900",
    marginTop: 7,
  },
  viewAllButton: {
    backgroundColor: colors.white,
    borderColor: colors.lightGray,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  viewAllText: {
    color: colors.primaryBlue,
    fontSize: 14,
    fontWeight: "900",
  },
  featuredGrid: {
    flexDirection: "row",
    gap: 16,
  },
  featuredGridMobile: {
    flexDirection: "column",
  },
  productCard: {
    backgroundColor: colors.white,
    borderColor: colors.lightGray,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    overflow: "hidden",
  },
  productImage: {
    backgroundColor: colors.offWhite,
    height: 150,
    width: "100%",
  },
  productCardBody: {
    padding: 16,
  },
  productCategory: {
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  productName: {
    color: colors.darkNavy,
    fontSize: 17,
    fontWeight: "900",
    lineHeight: 22,
    marginTop: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  gridMobile: {
    flexDirection: "column",
  },
  card: {
    backgroundColor: colors.white,
    borderColor: colors.lightGray,
    borderRadius: 8,
    borderWidth: 1,
    flexBasis: "31%",
    flexGrow: 1,
    minWidth: 240,
    padding: 18,
  },
  cardTitle: {
    color: colors.darkNavy,
    fontSize: 18,
    fontWeight: "900",
  },
  cardText: {
    color: colors.slateGray,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 9,
  },
});
