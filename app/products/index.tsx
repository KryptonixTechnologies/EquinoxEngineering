import { Link } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { categories, ProductCategory, products } from "../../src/data/products";
import { categoryColors, colors } from "../../src/theme/colors";

const placeholderImage = require("../../assets/product images/placeholder.jpeg");
const productsPerPage = 12;

function renderDemand(demand: number) {
  return `${"★".repeat(demand)}${"☆".repeat(5 - demand)}`;
}

export default function ProductsPage() {
  const { width } = useWindowDimensions();
  const isMobile = width < 700;
  const isTablet = width >= 700 && width < 1100;
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "All">("All");
  const [page, setPage] = useState(1);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") {
      return products;
    }

    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));
  const visibleProducts = filteredProducts.slice((page - 1) * productsPerPage, page * productsPerPage);

  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Products</Text>
        <Text style={StyleSheet.flatten([styles.heading, isMobile && styles.headingMobile])}>
          Water treatment products catalogue.
        </Text>
        <Text style={styles.intro}>
          Browse the full Equinox Engineering product range. Placeholder images are used
          for now and can be replaced with the real product photos later.
        </Text>
      </View>

      <View style={styles.filters}>
        {["All", ...categories].map((category) => {
          const active = selectedCategory === category;
          const accent = category === "All" ? colors.primaryBlue : categoryColors[category as ProductCategory];

          return (
            <Pressable
              key={category}
              style={StyleSheet.flatten([
                styles.filterButton,
                active && { backgroundColor: accent, borderColor: accent },
              ])}
              onPress={() => setSelectedCategory(category as ProductCategory | "All")}
            >
              <Text style={StyleSheet.flatten([styles.filterText, active && styles.filterTextActive])}>
                {category}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.resultsBar}>
        <Text style={styles.resultsText}>
          Showing {visibleProducts.length} of {filteredProducts.length} products
        </Text>
        <Text style={styles.resultsText}>
          Page {page} of {totalPages}
        </Text>
      </View>

      <View style={styles.grid}>
        {visibleProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} asChild>
            <Pressable
              style={StyleSheet.flatten([
                styles.card,
                isTablet && styles.cardTablet,
                isMobile && styles.cardMobile,
              ])}
            >
              <Image source={placeholderImage} style={styles.productImage} resizeMode="cover" />
              {product.topMover ? <Text style={styles.topMover}>Top 20 fast mover</Text> : null}
              <View style={styles.cardBody}>
                <View style={styles.productText}>
                  <Text style={StyleSheet.flatten([styles.category, { color: categoryColors[product.category] }])}>
                    {product.category}
                  </Text>
                  <Text style={styles.name}>{product.name}</Text>
                </View>
                <View style={styles.cardFooter}>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>Demand</Text>
                    <Text style={styles.demand}>{renderDemand(product.demand)}</Text>
                  </View>
                  <Text style={styles.viewDetails}>View details</Text>
                </View>
              </View>
            </Pressable>
          </Link>
        ))}
      </View>

      <View style={styles.pagination}>
        <Pressable
          disabled={page === 1}
          style={StyleSheet.flatten([styles.pageButton, page === 1 && styles.pageButtonDisabled])}
          onPress={() => setPage((current) => Math.max(1, current - 1))}
        >
          <Text style={StyleSheet.flatten([styles.pageButtonText, page === 1 && styles.pageButtonTextDisabled])}>
            Previous
          </Text>
        </Pressable>

        <View style={styles.pageNumbers}>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <Pressable
              key={pageNumber}
              style={StyleSheet.flatten([styles.pageNumber, pageNumber === page && styles.pageNumberActive])}
              onPress={() => setPage(pageNumber)}
            >
              <Text
                style={StyleSheet.flatten([
                  styles.pageNumberText,
                  pageNumber === page && styles.pageNumberTextActive,
                ])}
              >
                {pageNumber}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          disabled={page === totalPages}
          style={StyleSheet.flatten([styles.pageButton, page === totalPages && styles.pageButtonDisabled])}
          onPress={() => setPage((current) => Math.min(totalPages, current + 1))}
        >
          <Text
            style={StyleSheet.flatten([
              styles.pageButtonText,
              page === totalPages && styles.pageButtonTextDisabled,
            ])}
          >
            Next
          </Text>
        </Pressable>
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
  header: {
    maxWidth: 760,
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
  },
  headingMobile: {
    fontSize: 32,
    lineHeight: 39,
  },
  intro: {
    color: colors.steel,
    fontSize: 17,
    lineHeight: 28,
    marginTop: 14,
  },
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 28,
  },
  filterButton: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  filterText: {
    color: colors.charcoal,
    fontSize: 13,
    fontWeight: "800",
  },
  filterTextActive: {
    color: colors.white,
  },
  resultsBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
  },
  resultsText: {
    color: colors.slateGray,
    fontSize: 14,
    fontWeight: "700",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 18,
  },
  card: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    flexBasis: "23%",
    flexGrow: 1,
    minWidth: 220,
    overflow: "hidden",
  },
  cardTablet: {
    flexBasis: "48%",
  },
  cardMobile: {
    flexBasis: "100%",
  },
  category: {
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  productImage: {
    backgroundColor: colors.offWhite,
    height: 230,
    width: "100%",
  },
  topMover: {
    alignSelf: "flex-start",
    backgroundColor: colors.success,
    borderRadius: 6,
    color: colors.white,
    fontSize: 12,
    fontWeight: "900",
    marginLeft: 16,
    marginTop: -31,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  cardBody: {
    flex: 1,
    justifyContent: "space-between",
    minHeight: 190,
    padding: 18,
  },
  productText: {
    paddingTop: 18,
  },
  name: {
    color: colors.graphite,
    fontSize: 22,
    fontWeight: "900",
    marginTop: 10,
  },
  cardFooter: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  metaItem: {
    backgroundColor: colors.offWhite,
    borderRadius: 8,
    minWidth: 112,
    padding: 10,
  },
  metaLabel: {
    color: colors.slateGray,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  demand: {
    color: colors.warning,
    fontSize: 14,
    fontWeight: "900",
    marginTop: 4,
  },
  viewDetails: {
    color: colors.primaryBlue,
    fontSize: 14,
    fontWeight: "900",
    paddingBottom: 10,
    textAlign: "right",
  },
  pagination: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
    marginTop: 30,
  },
  pageButton: {
    backgroundColor: colors.primaryBlue,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  pageButtonDisabled: {
    backgroundColor: colors.lightGray,
  },
  pageButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900",
  },
  pageButtonTextDisabled: {
    color: colors.slateGray,
  },
  pageNumbers: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  pageNumber: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  pageNumberActive: {
    backgroundColor: colors.darkNavy,
    borderColor: colors.darkNavy,
  },
  pageNumberText: {
    color: colors.charcoal,
    fontSize: 14,
    fontWeight: "900",
  },
  pageNumberTextActive: {
    color: colors.white,
  },
});
