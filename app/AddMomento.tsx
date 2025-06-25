import { salvarDados } from '@/dados';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { uploadImagem } from '../upload';

const AdicionarMomento: React.FC = () => {

  const auth = getAuth();


  const [data, setData] = useState<string>('');
  const [momento, setMomento] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [imagemUri, setImagemUri] = useState<string>('');

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

  const salvarMomento = async () => {
    if (!imagemUri) {
      alert('Escolha uma imagem!');
      return;
    }

    try {
      const uid = auth.currentUser?.uid;

      const url = await uploadImagem(imagemUri);
      console.log('Imagem enviada para:', url);

      // Aqui você pode salvar os dados no Firestore, AsyncStorage, etc
      salvarDados("momentos", { data, momento, descricao, url, userID: uid });
      alert('Momento salvo com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar imagem');
    }
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      setData(date.toLocaleDateString('pt-BR'));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.headerTitle}>Adicionar momento</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formWrapper}>

          <Text style={styles.label}>Data</Text>

          <TextInput
            placeholder="Selecione uma data"
            style={[styles.input, { color: data ? '#000' : '#aaa' }]}
            value={data}
            editable={false}
            pointerEvents="none"
          />
          <MaterialIcons name="calendar-today" size={20} color="#aaa" />


          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
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
          <TouchableOpacity style={styles.upload} onPress={escolherImagem}>
            <FontAwesome name="camera" size={20} color="red" />
            <Text style={styles.uploadText}>Escolha ou capture uma imagem</Text>
          </TouchableOpacity>

          {imagemUri !== '' && (
            <Image source={{ uri: imagemUri }} style={{ width: 200, height: 200, marginBottom: 20 }} />
          )}



          <TouchableOpacity style={styles.button} onPress={salvarMomento}>
            <Text style={styles.buttonText}>Salvar momento</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>


      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="add-circle-outline" size={20} color="#fff" />
          <Text style={styles.menuText}>Adicionar momento</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="images-outline" size={20} color="#fff" />
          <Text style={styles.menuText}>Álbum digital</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="settings-outline" size={20} color="#fff" />
          <Text style={styles.menuText}>Configurações</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};



export default AdicionarMomento;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#757072',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    height: 60,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  formWrapper: {
    width: 320,
    alignSelf: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 15,
  },
  inputIconContainer: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textArea: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 15,
    marginBottom: 15,
    textAlignVertical: 'top',
  },
  upload: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  uploadText: {
    marginLeft: 8,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 45,
    backgroundColor: '#C7C6F4',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#757072',
    paddingVertical: 10,
  },
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
  },
});
