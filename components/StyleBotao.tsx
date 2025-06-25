import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function StyleBotao() {
	return (
		<View style={style.container}>
			<View style={style.view2}>
				<Link href='/AddMomento'>Adicionar novo momento</Link>
			</View>
		</View>
	);
}
const style = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	texto: {
		fontSize: 40,
		fontWeight: 'bold',
	},
	view2: {
		backgroundColor: '#c9c8f2',
		alignItems: 'center',
		textAlign: 'center',
		borderStyle: 'solid',
		borderRadius: 50,
		padding: 13,
		width: 185,
		height: 50,
	},
});
