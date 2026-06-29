import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';

const productCategories = [
  "Filtration systems",
  "RO membranes",
  "Dosing pumps",
  "Water softeners",
];

export default function App() {
  return (
    <ScrollView className="flex-1 bg-slate-50">
      <View className="min-h-screen px-5 py-8 md:px-12 lg:px-20">
        <View className="mx-auto w-full max-w-6xl">
          <View className="flex-row items-center justify-between border-b border-slate-200 pb-5">
            <Text className="text-xl font-bold text-graphite">Equinox Engineering</Text>
            <Text className="rounded-full bg-mineral px-4 py-2 text-sm font-semibold text-lagoon">
              Water treatment
            </Text>
          </View>

          <View className="py-12 md:py-16">
            <Text className="max-w-4xl text-4xl font-bold leading-tight text-graphite md:text-6xl">
              Reliable products for cleaner, safer water systems.
            </Text>
            <Text className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              A frontend-only React Native website foundation for showcasing treatment
              products, technical categories, and customer enquiries.
            </Text>
          </View>

          <View className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {productCategories.map((category) => (
              <View
                key={category}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <View className="mb-4 h-10 w-10 rounded-full bg-lagoon/10" />
                <Text className="text-base font-semibold text-graphite">{category}</Text>
                <Text className="mt-2 text-sm leading-6 text-slate-500">
                  Ready for your product details, images, specs, and calls to action.
                </Text>
              </View>
            ))}
          </View>

          <View className="mt-8 rounded-lg bg-graphite p-6 md:flex-row md:items-center md:justify-between">
            <View className="md:max-w-xl">
              <Text className="text-2xl font-bold text-white">Product list comes next.</Text>
              <Text className="mt-2 text-sm leading-6 text-slate-300">
                Share the water treatment products and we will turn this scaffold into a
                polished catalogue website.
              </Text>
            </View>
            <Text className="mt-5 rounded-md bg-copper px-5 py-3 text-center text-sm font-bold text-white md:mt-0">
              Scaffold ready
            </Text>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}
