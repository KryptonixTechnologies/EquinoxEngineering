import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { colors } from "../src/theme/colors";

const faqs = [
  {
    question: "How do I choose the right water treatment product?",
    answer:
      "Start with your water source, target quality, daily demand, and the main issue you need to remove or control.",
  },
  {
    question: "Can Equinox Engineering recommend a full system?",
    answer:
      "Yes. Product recommendations can combine filters, softeners, RO systems, and dosing based on the application.",
  },
  {
    question: "Will the website include product detail pages?",
    answer:
      "Yes. Each listed product has a dedicated detail route with highlights, applications, and recommendations.",
  },
];

export default function FAQPage() {
  const { width } = useWindowDimensions();
  const isMobile = width < 700;

  return (
    <View style={styles.page}>
      <Text style={styles.eyebrow}>FAQ</Text>
      <Text style={StyleSheet.flatten([styles.heading, isMobile && styles.headingMobile])}>
        Common questions before choosing a product.
      </Text>
      <View style={styles.list}>
        {faqs.map((faq) => (
          <View key={faq.question} style={styles.item}>
            <Text style={styles.question}>{faq.question}</Text>
            <Text style={styles.answer}>{faq.answer}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    marginHorizontal: "auto",
    maxWidth: 900,
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
  },
  headingMobile: {
    fontSize: 32,
    lineHeight: 39,
  },
  list: {
    gap: 14,
    marginTop: 30,
  },
  item: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
  },
  question: {
    color: colors.graphite,
    fontSize: 18,
    fontWeight: "900",
  },
  answer: {
    color: colors.steel,
    fontSize: 15,
    lineHeight: 25,
    marginTop: 8,
  },
});
