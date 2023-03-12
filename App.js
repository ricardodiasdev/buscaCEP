import { StyleSheet, Text, View } from "react-native";
import BuscaCEP from "./src/Components/BuscaCep";

export default function App() {
  return (
    <View style={styles.container}>
      <BuscaCEP />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
