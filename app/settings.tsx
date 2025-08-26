// app/settings.js
import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Settings Screen</Text>
      <Button title="Go Back" onPress={() => router.replace("/")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
});
