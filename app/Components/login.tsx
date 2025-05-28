import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const estilo = StyleSheet.create({
  Fundo: { backgroundColor: "white", flex: 1 },
  Form: {
    height: 55,
    width: 400,
    backgroundColor: "#fdcfca",
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 2,
    fontSize: 16,
    padding:10
  },
  Buton: {
    backgroundColor: "#fdcfca",
    height: 60,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderRadius: 15,
    margin: 40,
  }, 
});

export default function login() {
  return (
    <View style={estilo.Fundo}>
      <View style={{ alignItems: "center", padding: 50, margin: 50 }}>
        <Text style={{ fontSize: 40 }}>Entrar</Text>
      </View>
      <View style={{ gap: 40 }}>
        <View style={{ alignItems: "center" }}>
          <TextInput style={estilo.Form} placeholder="E-mail" />
        </View>
        <View style={{ alignItems: "center" }}>
          <TextInput style={estilo.Form} placeholder="Senha" secureTextEntry={true}/>
        </View>
      </View>
      <View style={{ alignItems: "center", padding: 25 }}>
        <Pressable>
        <Text style={{ color: "blue", fontSize: 17 }}>Recuperar senha</Text> 
        </Pressable>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View>
          <Pressable style={estilo.Buton}>
            <Text>Entrar</Text>
          </Pressable>
        </View>
        <View>
          <Pressable style={estilo.Buton}>
            <Text>Criar conta</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
