import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const estilo = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffe5ed',
		alignItems: 'center',
		gap: 30,
	},
	Imagem1: { width: 400, height: 290 },
	Login: {
		backgroundColor: '#fe7272',
		alignItems: 'center',
		justifyContent: 'center',
		width: 200,
		height: 55,
		borderRadius: 30,
	},
	criarConta: {
		backgroundColor: '#95aeff',
		alignItems: 'center',
		justifyContent: 'center',
		width: 250,
		height: 60,
		borderRadius: 30,
	},
});

export default function TelaInicial() {
	const router = useRouter();

	const goToLogin = () => {
		router.push('/login');
	};

	const goCriarConta = () => {
		router.push('/cadastro');
	};
	return (
		<View style={estilo.container}>
			<View>
				<Image
					source={require('../assets/images/Imagem_inicio.png')}
					style={estilo.Imagem1}
				/>
			</View>
			<View>
				<Text style={{ fontSize: 42 }}>Baby Memories</Text>
			</View>
			<View style={{ padding: 30 }}>
				<Text style={{ textAlign: 'center', fontSize: 19 }}>
					Bem-vindo ao Baby Memories, onde você pode capturar, guardar e
					compartilhar os momentos memoráveis da vida do seu filho. Junte-se à
					nós!
				</Text>
			</View>
			<View>
				<Pressable style={estilo.Login} onPress={goToLogin}>
					<Text style={{ color: 'black', fontSize: 20 }}>Login</Text>
				</Pressable>
			</View>
			<View>
				<Pressable style={estilo.criarConta} onPress={goCriarConta}>
					<Text style={{ color: 'black', fontSize: 20 }}>
						Criar uma nova conta
					</Text>
				</Pressable>
			</View>
		</View>
	);
}
