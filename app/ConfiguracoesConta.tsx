import { Menu } from "@/components/Menu";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { getAuth, signOut, updatePassword, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function ConfiguracoesConta() {
  const router = useRouter();
  const auth = getAuth();

  const [currentName, setCurrentName] = useState("");
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setCurrentName(user.displayName || "");
      setNewName(user.displayName || "");
    }
  }, []);

  const handleChangeName = async () => {
    setLoading(true);
    const user = auth.currentUser;
    if (user) {
      try {
        await updateProfile(user, {
          displayName: newName,
        });
        setCurrentName(newName);
        Alert.alert("Sucesso", "Nome alterado com sucesso!");
      } catch (error) {
        console.error("Erro ao alterar nome:", error);
        Alert.alert("Erro", "Não foi possível alterar o nome.");
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert("Erro", "Nenhum usuário logado.");
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setLoading(true);
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Erro", "Nenhum usuário logado.");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Erro", "A nova senha deve ter pelo menos 6 caracteres.");
      setLoading(false);
      return;
    }

    try {
      await updatePassword(user, newPassword);
      setNewPassword("");
      setConfirmNewPassword("");
      Alert.alert("Sucesso", "Senha alterada com sucesso!");
    } catch (error: any) {
      console.error("Erro ao alterar senha:", error);
      let errorMessage = "Não foi possível alterar a senha.";
      if (error.code === "auth/requires-recent-login") {
        errorMessage =
          "Por favor, faça login novamente para alterar sua senha por segurança.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "A nova senha é muito fraca.";
      }
      Alert.alert("Erro", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      Alert.alert("Sucesso", "Você saiu da conta.");
      router.replace("/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
      Alert.alert("Erro", "Não foi possível sair da conta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={estilos.container}>
      <View style={{ flex: 1 }}>
        <View style={estilos.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
          <Text style={estilos.headerTitle}>Configurações da Conta</Text>
        </View>

        <View style={{ marginTop: 30, paddingHorizontal: 30 }}>
          <Text style={estilos.currentInfoText}>Nome Atual: {currentName}</Text>

          <View style={estilos.section}>
            <Text style={estilos.sectionTitle}>Alterar Nome</Text>
            <TextInput
              style={estilos.input}
              value={newName}
              onChangeText={setNewName}
              placeholder="Novo nome"
            />
            <Pressable
              style={estilos.botao}
              onPress={handleChangeName}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={estilos.botaoText}>Salvar Nome</Text>
              )}
            </Pressable>
          </View>

          <View style={estilos.section}>
            <Text style={estilos.sectionTitle}>Alterar Senha</Text>
            <TextInput
              style={estilos.input}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              placeholder="Nova senha"
            />
            <TextInput
              style={estilos.input}
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              secureTextEntry
              placeholder="Confirmar nova senha"
            />
            <Pressable
              style={estilos.botao}
              onPress={handleChangePassword}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={estilos.botaoText}>Salvar Senha</Text>
              )}
            </Pressable>
          </View>

          <View style={estilos.section}>
            <Text style={estilos.sectionTitle}>Sair da Conta</Text>
            <Pressable
              style={[estilos.botao, estilos.logoutButton]}
              onPress={handleLogout}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={estilos.botaoText}>Sair</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>

      <Menu />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  header: {
    backgroundColor: "#757072",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    height: 60,
    marginBottom: 24,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
  },
  input: {
    backgroundColor: "#d6dee2",
    borderWidth: 0.2,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 15,
    height: 40,
    paddingHorizontal: 15,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  botao: {
    backgroundColor: "#95aeff",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    width: 250,
    alignSelf: "center",
  },
  botaoText: {
    color: "black",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
  },
  section: {
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  currentInfoText: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#555",
  },
});
