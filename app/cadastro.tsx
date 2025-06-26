import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from 'react';
import {
	Alert,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { app } from '../firebase';

const style = StyleSheet.create({
	input: {
		height: 55,
		backgroundColor: '#fdcfca',
		borderColor: 'black',
		borderWidth: 0.5,
		borderRadius: 8,
		fontSize: 16,
		padding: 10,
		width: '100%',
	},
});

const auth = getAuth(app);
const db = getFirestore(app);


export default function Cadastro() {
	const [nome, setNome] = useState('');
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');

	const router = useRouter();

	const cadastro = async () => {
		try {
			const cred = await createUserWithEmailAndPassword(auth, email, senha)
			await updateProfile(cred.user, { displayName: nome });
			await setDoc(doc(db, "usuarios", cred.user.uid), {
				nomeCompleto: nome,
				email,
				criadoEm: serverTimestamp()
			});
			Alert.alert("Conta criada!", `Bem-vindo(a) ${nome}`);
			// navega pra tela principal...
		} catch (e) {
			console.error(e);
			Alert.alert("Erro", "Não foi possível criar a conta.");
		}
	};

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: 'white',
				paddingTop: 80,
				paddingHorizontal: 20,
			}}
		>
			<Text style={{ fontSize: 24 }}>Tela de Cadastro</Text>
			<Text style={{ fontSize: 18, marginTop: 10 }}>
				Esta é a tela de cadastro do aplicativo Baby Memories.
			</Text>

			<View style={{ marginTop: 20, gap: 20 }}>
				<TextInput
					onChangeText={setNome}
					value={nome}
					placeholder='Nome completo'
					keyboardType='default'
					style={style.input}
				/>
				<TextInput
					onChangeText={setEmail}
					value={email}
					placeholder='E-mail'
					keyboardType='email-address'
					style={style.input}
				/>
				<TextInput
					onChangeText={setSenha}
					value={senha}
					placeholder='Senha'
					secureTextEntry
					style={style.input}
				/>

				<Pressable
					onPress={cadastro}
					style={{
						backgroundColor: '#fe7272',
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
						height: 55,
						borderRadius: 30,
					}}
				>
					<Text style={{ color: 'white', fontSize: 20 }}>Cadastrar</Text>
				</Pressable>
			</View>
		</View>
	);
}
