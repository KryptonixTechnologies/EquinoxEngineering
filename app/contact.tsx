import { StyleSheet, Text, TextInput, useWindowDimensions, View } from "react-native";
import { colors } from "../src/theme/colors";

export default function ContactPage() {
  const { width } = useWindowDimensions();
  const isMobile = width < 760;

  return (
    <View style={StyleSheet.flatten([styles.page, isMobile && styles.pageMobile])}>
      <View style={styles.intro}>
        <Text style={styles.eyebrow}>Contact Us</Text>
        <Text style={StyleSheet.flatten([styles.heading, isMobile && styles.headingMobile])}>
          Tell us what water problem you are solving.
        </Text>
        <Text style={styles.body}>
          This frontend-only form is ready for layout now. Later we can connect it to email,
          WhatsApp, or a backend enquiry endpoint.
        </Text>
      </View>
      <View style={styles.form}>
        <TextInput placeholder="Name" style={styles.input} />
        <TextInput placeholder="Email or phone" style={styles.input} />
        <TextInput placeholder="Product or service needed" style={styles.input} />
        <TextInput placeholder="Message" multiline style={StyleSheet.flatten([styles.input, styles.message])} />
        <Text style={styles.submit}>Send enquiry</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    gap: 28,
    marginHorizontal: "auto",
    maxWidth: 1180,
    paddingHorizontal: 20,
    paddingVertical: 46,
    width: "100%",
  },
  pageMobile: {
    flexDirection: "column",
  },
  intro: {
    flex: 1,
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
  body: {
    color: colors.steel,
    fontSize: 17,
    lineHeight: 28,
    marginTop: 16,
  },
  form: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    gap: 12,
    padding: 20,
  },
  input: {
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.graphite,
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  message: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  submit: {
    backgroundColor: colors.lagoon,
    borderRadius: 8,
    color: colors.white,
    fontSize: 15,
    fontWeight: "900",
    marginTop: 4,
    paddingHorizontal: 18,
    paddingVertical: 14,
    textAlign: "center",
  },
});
