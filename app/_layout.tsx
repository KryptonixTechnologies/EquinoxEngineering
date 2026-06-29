import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View } from "react-native";
import { SiteFooter } from "../src/components/SiteFooter";
import { SiteHeader } from "../src/components/SiteHeader";
import { colors } from "../src/theme/colors";

export default function RootLayout() {
  return (
    <View style={styles.app}>
      <SiteHeader />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Slot />
        <SiteFooter />
      </ScrollView>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: colors.mist,
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});
