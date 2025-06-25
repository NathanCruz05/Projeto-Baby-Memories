import { authFirebase } from '@/firebase';
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

const estilo = StyleSheet.create({
	Fundo: { backgroundColor: 'white', flex: 1 },
	Form: {
		height: 55,
		backgroundColor: '#fdcfca',
		borderColor: 'black',
		borderWidth: 0.5,
		borderRadius: 8,
		fontSize: 16,
		padding: 10,
		width: '100%',
	},
	Buton: {
		backgroundColor: '#fdcfca',
		height: 60,
		width: 120,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 0.5,
		borderRadius: 15,
	},
});

export default function LoginScreen() {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const irParaCadastro = () => {
		router.push('/cadastro');
	};

	const fazerLogin = () => {
		signInWithEmailAndPassword(authFirebase, email, password)
			.then(() => {
				router.push('/momentos');
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
			alert('Por favor, insira seu e-mail para recuperação de senha.');
			return;
		}

		sendPasswordResetEmail(authFirebase, email)
			.then(() => {
				alert('E-mail de recuperação enviado!');
			})
			.catch((error) => {
				alert('Erro ao enviar e-mail de recuperação. Tente novamente.');
			});
	};

	return (
		<View style={estilo.Fundo}>
			<View style={{ alignItems: 'center', padding: 50, margin: 50 }}>
				<Text style={{ fontSize: 40 }}>Entrar</Text>
			</View>
			<View style={{ gap: 40, paddingHorizontal: 20 }}>
				<View style={{ alignItems: 'center' }}>
					<TextInput
						style={estilo.Form}
						placeholder='E-mail'
						value={email}
						onChangeText={setEmail}
					/>
				</View>
				<View style={{ alignItems: 'center' }}>
					<TextInput
						style={estilo.Form}
						placeholder='Senha'
						secureTextEntry={true}
						value={password}
						onChangeText={setPassword}
						onSubmitEditing={fazerLogin}
					/>
				</View>
			</View>
			<View style={{ alignItems: 'center', padding: 25 }}>
				<Pressable onPress={recuperarSenha}>
					<Text style={{ color: 'blue', fontSize: 17 }}>Recuperar senha</Text>
				</Pressable>
			</View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					padding: 20,
					gap: 20,
				}}
			>
				<View>
					<Pressable style={estilo.Buton} onPress={fazerLogin}>
						<Text>Entrar</Text>
					</Pressable>
				</View>
				<View>
					<Pressable style={estilo.Buton} onPress={irParaCadastro}>
						<Text>Criar conta</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}
