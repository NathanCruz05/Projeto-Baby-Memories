import { authFirebase } from "@/firebase";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");

  const router = useRouter();

  const cadastro = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        authFirebase,
        email,
        senha
      );
      const user = userCredential.user;

      if (user) {
        await updateProfile(user, {
          displayName: nome,
        });
        console.log("Nome do usuário atualizado com sucesso!");
      }

      router.push("/login");
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      let errorMessage = "Não foi possível criar a conta.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Este e-mail já está em uso.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Formato de e-mail inválido.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "A senha deve ter pelo menos 6 caracteres.";
      }
      Alert.alert("Erro", errorMessage);
    }
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={estilos.headerTitle}>Cadastro</Text>
      </View>

      <View style={{ marginTop: 45 }}>
        <View style={{ paddingLeft: 40 }}>
          <Text>Nome</Text>
        </View>
        <TextInput
          style={estilos.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Seu nome completo"
        />

        <View style={{ paddingLeft: 40 }}>
          <Text>E-mail</Text>
        </View>
        <TextInput
          style={estilos.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="seu.email@example.com"
        />

        <View style={{ paddingLeft: 40 }}>
          <Text>Senha</Text>
        </View>
        <TextInput
          style={estilos.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          placeholder="Sua senha"
        />
      </View>
      <View>
        <Pressable style={estilos.botao} onPress={cadastro}>
          <Text style={estilos.botaoTexto}>Criar Conta</Text>
        </Pressable>
      </View>
    </View>
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
    marginHorizontal: 30,
    marginBottom: 24,
    height: 40,
    paddingHorizontal: 15,
  },
  container: {
    backgroundColor: "#fff2fc",
    flex: 1,
  },
  botao: {
    backgroundColor: "#95aeff",
    padding: 15,
    borderRadius: 30,
    width: 250,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#007bff",
    borderStyle: "solid",
  },
  botaoTexto: {
    color: "black",
    textAlign: "center",
  },
});
