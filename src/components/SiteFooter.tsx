import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { colors } from "../theme/colors";

export function SiteFooter() {
  const { width } = useWindowDimensions();
  const isMobile = width < 700;

  return (
    <View style={styles.footer}>
      <View style={StyleSheet.flatten([styles.inner, isMobile && styles.innerMobile])}>
        <View style={styles.company}>
          <Text style={styles.title}>Equinox Engineering</Text>
          <Text style={styles.copy}>
            Water treatment products for commercial, industrial, and residential systems.
          </Text>
        </View>

        <View style={StyleSheet.flatten([styles.links, isMobile && styles.linksMobile])}>
          <Link href="/products" asChild>
            <Pressable>
              <Text style={styles.link}>Products</Text>
            </Pressable>
          </Link>
          <Link href="/industries" asChild>
            <Pressable>
              <Text style={styles.link}>Industries</Text>
            </Pressable>
          </Link>
          <Link href="/contact" asChild>
            <Pressable>
              <Text style={styles.link}>Contact Us</Text>
            </Pressable>
          </Link>
          <Link href="/faq" asChild>
            <Pressable>
              <Text style={styles.link}>FAQ</Text>
            </Pressable>
          </Link>
        </View>
      </View>
      <Text style={styles.bottom}>© 2026 Equinox Engineering. All rights reserved.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.graphite,
    paddingHorizontal: 20,
    paddingVertical: 34,
  },
  inner: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "auto",
    maxWidth: 1180,
    width: "100%",
  },
  company: {
    maxWidth: 430,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "800",
  },
  copy: {
    color: "#cbd5e1",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
  },
  links: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  link: {
    color: "#e2e8f0",
    fontSize: 14,
    fontWeight: "700",
  },
  bottom: {
    color: "#94a3b8",
    fontSize: 12,
    marginHorizontal: "auto",
    marginTop: 28,
    maxWidth: 1180,
    width: "100%",
  },
  innerMobile: {
    flexDirection: "column",
    gap: 22,
  },
  linksMobile: {
    flexDirection: "column",
    gap: 12,
  },
});
