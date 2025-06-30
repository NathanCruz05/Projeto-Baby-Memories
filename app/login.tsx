import { Carregamento } from "@/components/Carregamento";
import { authFirebase } from "@/firebase";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const estilos = StyleSheet.create({
  header: {
    backgroundColor: "#757072",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    height: 60,
    width: "100%",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
  },
  container: {
    backgroundColor: "#fff2fc",
    flex: 1,
  },
  topo: {
    alignItems: "flex-start",
    marginLeft: 30,
    marginBottom: 30,
  },
  titulo: {
    fontSize: 30,
    color: "#333",
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
  linkContainer: {
    alignItems: "center",
    marginRight: 30,
    marginBottom: 30,
  },
  link: {
    color: "#95aeff",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  botoesContainer: {
    alignItems: "center",
  },
  botao: {
    backgroundColor: "#b5c4f7",
    padding: 15,
    borderRadius: 30,
    width: 250,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 2,           
    borderColor: '#007bff',   
    borderStyle: 'solid'
  },
  botaoTexto: {
    color: "black",
  },
  label: {
    paddingLeft: 30,
    marginBottom: 5,
    fontSize: 14,
  },
});

export default function LoginScreen() {
  const router = useRouter();

  const [carregando, setCarregando] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const irParaCadastro = () => {
    router.push("/cadastro");
  };

  const fazerLogin = () => {
    setCarregando(true);

    signInWithEmailAndPassword(authFirebase, email, password)
      .then(() => {
        router.push("/momentos");
      })
      .finally(() => {
        setCarregando(false);
      })
      .catch((error: any) => {
        Alert.alert(
          "Erro ao fazer login",
          "Verifique seu e-mail e senha e tente novamente.",
          [{ text: "OK" }]
        );
      });
  };

  const recuperarSenha = () => {
    if (!email) {
      Alert.alert(
        "Erro",
        "Por favor, insira seu e-mail para recuperação de senha."
      );
      return;
    }

    sendPasswordResetEmail(authFirebase, email)
      .then(() => {
        Alert.alert(
          "Sucesso",
          "E-mail de recuperação enviado! Verifique sua caixa de entrada."
        );
      })
      .catch((error: any) => {
        console.error("Erro ao recuperar senha:", error);
        let errorMessage =
          "Erro ao enviar e-mail de recuperação. Tente novamente.";
        if (error.code === "auth/user-not-found") {
          errorMessage = "Nenhum usuário encontrado com este e-mail.";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "O formato do e-mail é inválido.";
        }
        Alert.alert("Erro", errorMessage);
      });
  };

  return (
    <SafeAreaView style={estilos.container}>
      {carregando && <Carregamento />}

      <View style={estilos.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={estilos.headerTitle}>Entrar</Text>
      </View>

      <View style={{ marginTop: 45 }}>
        <View style={estilos.topo}>
          <Text style={estilos.titulo}>Bem-vindo!</Text>
        </View>

        <Text style={estilos.label}>E-mail</Text>
        <TextInput
          style={estilos.input}
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          textContentType="emailAddress"
        />

        <Text style={estilos.label}>Senha</Text>
        <TextInput
          style={estilos.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable style={estilos.linkContainer} onPress={recuperarSenha}>
          <Text style={estilos.link}>Esqueci minha senha</Text>
        </Pressable>
      </View>

      <View style={estilos.botoesContainer}>
        <Pressable style={estilos.botao} onPress={fazerLogin}>
          <Text style={estilos.botaoTexto}>Entrar</Text>
        </Pressable>
        <Pressable style={estilos.botao} onPress={irParaCadastro}>
          <Text style={estilos.botaoTexto}>Criar conta</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
