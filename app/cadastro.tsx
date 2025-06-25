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

export default function Cadastro() {
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');

	const router = useRouter();

	const cadastro = () => {
		createUserWithEmailAndPassword(authFirebase, email, senha)
			.then(() => {
				Alert.alert(
					'Cadastro realizado com sucesso!',
					'Você já pode fazer login.',
					[
						{
							text: 'OK',
							onPress: () => router.push('/login'),
						},
					]
				);
			})
			.catch((error) => {
				console.error('Erro ao realizar cadastro:', error);
			});
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
