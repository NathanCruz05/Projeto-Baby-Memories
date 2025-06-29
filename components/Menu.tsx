import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const Menu = () => {
  const router = useRouter();

  return (
    <View style={styles.bottomMenu}>
      <Pressable
        style={styles.menuItem}
        onPress={() => router.push("/AddMomento")}
      >
        <Ionicons name="add-circle-outline" size={20} color="#fff" />
        <Text style={styles.menuText}>Adicionar momento</Text>
      </Pressable>
      <Pressable
        style={styles.menuItem}
        onPress={() => router.push("/momentos")}
      >
        <Ionicons name="images-outline" size={20} color="#fff" />
        <Text style={styles.menuText}>Álbum digital</Text>
      </Pressable>
      <Pressable
        style={styles.menuItem}
        onPress={() => router.push("/ConfiguracoesConta")}
      >
        <Ionicons name="settings-outline" size={20} color="#fff" />
        <Text style={styles.menuText}>Configurações</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#757072",
    paddingVertical: 10,
  },
  menuItem: {
    alignItems: "center",
  },
  menuText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 2,
  },
});
