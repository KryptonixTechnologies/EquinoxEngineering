import { Link, usePathname } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { colors } from "../theme/colors";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQ", href: "/faq" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width < 840;

  return (
    <View style={styles.header}>
      <View style={styles.inner}>
        <Link href="/" asChild>
          <Pressable style={styles.brand} onPress={() => setMenuOpen(false)}>
            <View style={styles.brandMark} />
            <View>
              <Text style={styles.brandName}>Equinox Engineering</Text>
              <Text style={styles.brandLabel}>Water Treatment Products</Text>
            </View>
          </Pressable>
        </Link>

        <View style={StyleSheet.flatten([styles.desktopNav, isMobile && styles.hidden])}>
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link key={item.href} href={item.href} asChild>
                <Pressable style={StyleSheet.flatten([styles.navLink, active && styles.navLinkActive])}>
                  <Text style={StyleSheet.flatten([styles.navText, active && styles.navTextActive])}>{item.label}</Text>
                </Pressable>
              </Link>
            );
          })}
        </View>

        <Pressable
          accessibilityLabel="Toggle navigation menu"
          accessibilityRole="button"
          style={StyleSheet.flatten([styles.menuButton, isMobile && styles.visibleMenuButton])}
          onPress={() => setMenuOpen((open) => !open)}
        >
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </Pressable>
      </View>

      {menuOpen && isMobile ? (
        <View style={styles.mobileNav}>
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link key={item.href} href={item.href} asChild>
                <Pressable
                  style={StyleSheet.flatten([styles.mobileNavLink, active && styles.mobileNavLinkActive])}
                  onPress={() => setMenuOpen(false)}
                >
                  <Text style={StyleSheet.flatten([styles.mobileNavText, active && styles.navTextActive])}>{item.label}</Text>
                </Pressable>
              </Link>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
  },
  inner: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "auto",
    maxWidth: 1180,
    paddingHorizontal: 20,
    paddingVertical: 16,
    width: "100%",
  },
  brand: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  brandMark: {
    backgroundColor: colors.lagoon,
    borderRadius: 8,
    height: 34,
    width: 34,
  },
  brandName: {
    color: colors.graphite,
    fontSize: 18,
    fontWeight: "800",
  },
  brandLabel: {
    color: colors.steel,
    fontSize: 12,
    marginTop: 2,
  },
  desktopNav: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  navLink: {
    borderRadius: 7,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  navLinkActive: {
    backgroundColor: colors.mineral,
  },
  navText: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "700",
  },
  navTextActive: {
    color: colors.lagoonDark,
  },
  menuButton: {
    display: "none",
    gap: 5,
    padding: 8,
  },
  visibleMenuButton: {
    display: "flex",
  },
  hidden: {
    display: "none",
  },
  menuLine: {
    backgroundColor: colors.graphite,
    borderRadius: 2,
    height: 2,
    width: 24,
  },
  mobileNav: {
    borderTopColor: colors.line,
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  mobileNavLink: {
    borderRadius: 7,
    paddingHorizontal: 12,
    paddingVertical: 13,
  },
  mobileNavLinkActive: {
    backgroundColor: colors.mineral,
  },
  mobileNavText: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "700",
  },
});
