import { Carregamento } from '@/components/Carregamento';
import { authFirebase } from '@/firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import {
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';
import {
	Alert,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';

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
	fundo: {
		flex: 1,
		backgroundColor: 'white',
		paddingHorizontal: 20,
		justifyContent: 'flex-start',
	},
	topo: {
		alignItems: 'center',
		marginBottom: 30,
	},
	titulo: {
		fontSize: 36,
		fontWeight: 'bold',
	},
	formContainer: {
		gap: 20,
		marginBottom: 20,
	},
	input: {
		height: 50,
		backgroundColor: '#fdcfca',
		borderColor: '#000',
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 15,
		fontSize: 16,
	},
	linkContainer: {
		alignItems: 'center',
		marginBottom: 30,
	},
	link: {
		color: 'blue',
		fontSize: 16,
		textDecorationLine: 'underline',
	},
	botoesContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	botao: {
		backgroundColor: '#fdcfca',
		height: 55,
		width: 140,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 12,
		borderWidth: 0.5,
	},
	botaoTexto: {
		fontSize: 16,
		fontWeight: '600',
	},
});

export default function LoginScreen() {
	const router = useRouter();

	const [carregando, setCarregando] = useState(false);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const irParaCadastro = () => {
		router.push('/cadastro');
	};

	const fazerLogin = () => {
		setCarregando(true);

		signInWithEmailAndPassword(authFirebase, email, password)
			.then(() => {
				router.push('/momentos');
			})
			.finally(() => {
				setCarregando(false);
			})
			.catch((error) => {
				Alert.alert(
					'Erro ao fazer login',
					'Verifique seu e-mail e senha e tente novamente.',
					[{ text: 'OK' }]
				);
			});
	};

	const recuperarSenha = () => {
		if (!email) {
			Alert.alert('Por favor, insira seu e-mail para recuperação de senha.');
			return;
		}

		sendPasswordResetEmail(authFirebase, email)
			.then(() => {
				Alert.alert('E-mail de recuperação enviado!');
			})
			.catch((error) => {
				Alert.alert('Erro ao enviar e-mail de recuperação. Tente novamente.');
			});
	};

	return (
		<View style={estilos.fundo}>
			{carregando && <Carregamento />}

			<View style={estilos.header}>
				<Pressable onPress={() => router.back()}>
					<Ionicons name='arrow-back' size={24} color='#fff' />
				</Pressable>
							<Text style={estilos.headerTitle}>Entrar</Text>
						</View>
			
			<View style={estilos.formContainer}>
				<TextInput
					style={estilos.input}
					placeholder='E-mail'
					keyboardType='email-address'
					autoCapitalize='none'
					value={email}
					onChangeText={setEmail}
					textContentType='emailAddress'
				/>
				<TextInput
					style={estilos.input}
					placeholder='Senha'
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				/>
			</View>

			<Pressable style={estilos.linkContainer} onPress={recuperarSenha}>
				<Text style={estilos.link}>Esqueci minha senha</Text>
			</Pressable>

			<View style={estilos.botoesContainer}>
				<Pressable style={estilos.botao} onPress={fazerLogin}>
					<Text style={estilos.botaoTexto}>Entrar</Text>
				</Pressable>
				<Pressable style={estilos.botao} onPress={irParaCadastro}>
					<Text style={estilos.botaoTexto}>Criar conta</Text>
				</Pressable>
			</View>
		</View>
	);
}
