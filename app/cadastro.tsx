import { authFirebase } from '@/firebase';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import {
	Alert,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';

export default function Cadastro() {
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');

	const router = useRouter();

	const cadastro = async () => {
		try {
			await createUserWithEmailAndPassword(authFirebase, email, senha);
			router.push('/login');
		} catch (e) {
			console.error(e);
			Alert.alert('Erro', 'Não foi possível criar a conta.');
		}
	};

	return (
		<View style={estilos.container}>
			<View style={{ marginTop: 45 }}>
				<View style={{ paddingLeft: 40 }}>
					<Text>E-mail</Text>
				</View>
				<TextInput
					style={estilos.input}
					value={email}
					onChangeText={setEmail}
				/>
				<View style={{ paddingLeft: 40 }}>
					<Text>Senha</Text>
				</View>
				<TextInput
					style={estilos.input}
					value={senha}
					onChangeText={setSenha}
				/>
			</View>
			<View>
				<Pressable style={estilos.botao} onPress={cadastro}>
					<Text>Criar Conta</Text>
				</Pressable>
			</View>
		</View>
	);
}

const estilos = StyleSheet.create({
	input: {
		backgroundColor: '#d6dee2',
		borderWidth: 0.2,
		borderRadius: 20,
		marginTop: 10,
		marginHorizontal: 30,
		marginBottom: 24,
		height: 40,
	},
	container: {
		backgroundColor: 'white',
		flex: 1,
	},
	botao: {
		backgroundColor: '#95aeff',
		padding: 15,
		borderRadius: 30,
		marginInline: 30,
		alignItems: 'center',
	},
});
