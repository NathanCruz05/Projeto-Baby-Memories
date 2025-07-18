import { Carregamento } from "@/components/Carregamento";
import { Menu } from "@/components/Menu";
import { salvarDados } from "@/dados";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { uploadImagem } from "../upload";

const AdicionarMomento: React.FC = () => {
  const auth = getAuth();

  const router = useRouter();

  const [data, setData] = useState<string>("");
  const [momento, setMomento] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [imagemUri, setImagemUri] = useState<string>("");

  const [carregando, setCarregando] = useState<boolean>(false);

  const escolherImagem = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImagemUri(result.assets[0].uri);
    }
  };

  const tirarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão negada");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImagemUri(result.assets[0].uri);
    }
  };

  const salvarMomento = async () => {
    setCarregando(true);
    if (!imagemUri) {
      Alert.alert("Escolha uma imagem!");
      setCarregando(false);
      return;
    }

    try {
      const uid = auth.currentUser?.uid;

      const url = await uploadImagem(imagemUri);
      salvarDados("momentos", { data, momento, descricao, url, userID: uid });
      Alert.alert("Sucesso", "Momento salvo com sucesso!");
      router.push("/momentos");
    } catch (err: any) {
      console.error(err);
      setCarregando(false);
      Alert.alert("Erro", "Erro ao salvar imagem.");
    }
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      setData(date.toLocaleDateString("pt-BR"));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'fff2fc' }}>
      {carregando && <Carregamento />}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Adicionar momento</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formWrapper}>
          <Text style={styles.label}>Data</Text>

          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <View style={styles.inputIconContainer}>
              <Text style={{ color: data ? "#000" : "#aaa" }}>
                {data || "Selecione uma data"}
              </Text>
              <MaterialIcons name="calendar-today" size={20} color="#aaa" />
            </View>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
            />
          )}

          <Text style={styles.label}>Momento</Text>
          <TextInput
            placeholder="Nomeie o acontecimento"
            style={styles.input}
            value={momento}
            onChangeText={setMomento}
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            placeholder="Adicione uma descrição"
            style={styles.textArea}
            multiline
            numberOfLines={4}
            value={descricao}
            onChangeText={setDescricao}
          />

          <Text style={styles.label}>Upload de foto</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 40,
              marginBottom: 40,
            }}
          >
            <TouchableOpacity style={styles.upload} onPress={escolherImagem}>
              <FontAwesome name="picture-o" size={20} />
              <Text style={styles.uploadText}>Galeria</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.upload} onPress={tirarFoto}>
              <FontAwesome name="camera" size={20} />
              <Text style={styles.uploadText}>Tirar Foto</Text>
            </TouchableOpacity>
          </View>

          {imagemUri !== "" && (
            <Image
              source={{ uri: imagemUri }}
              style={{ width: 200, height: 200, marginBottom: 20 }}
            />
          )}

          <TouchableOpacity style={styles.button} onPress={salvarMomento}>
            <Text style={styles.buttonText}>Salvar momento</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Menu />
    </SafeAreaView>
  );
};

export default AdicionarMomento;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#757072",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    height: 60,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
  },
  container: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor:"#fff2fc",
  },
  formWrapper: {
    width: 320,
    alignSelf: "center",
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "black",
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 15,
  },
  inputIconContainer: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textArea: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "black",
    padding: 12,
    borderRadius: 15,
    marginBottom: 15,
    textAlignVertical: "top",
  },
  upload: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 50,
    backgroundColor: "#b5c4f7",
    gap: 4,
    borderWidth: 2,           
    borderColor: '#007bff',   
    borderStyle: 'solid',
    marginBlock:15
  },

  uploadText: {
    marginLeft: 8,
    color: "black",
  },
  button: {
    width: "100%",
    height: 45,
    backgroundColor: "#b5c4f7",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    borderWidth: 2,           
    borderColor: '#007bff',   
    borderStyle: 'solid',

  },
  buttonText: {
    color: "black",
  },
});
