import { authFirebase } from '@/firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
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
			<View style={estilos.header}>
				<Pressable onPress={() => router.back()}>
					<Ionicons name='arrow-back' size={24} color='#fff' />
				</Pressable>
							<Text style={estilos.headerTitle}>Cadastro</Text>
						</View>
			
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
	header: {
		backgroundColor: '#757072',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 15,
		height: 60,
		marginBottom: 24,
	},
	headerTitle: {
		color: '#fff',
		fontSize: 18,
		marginLeft: 10,
	},
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
