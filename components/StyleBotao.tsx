import { Pressable, StyleSheet, Text } from 'react-native';

export default function StyleBotao(props: {
	titulo: string;
	onPress?: () => void;
}) {
	return (
		<Pressable style={style.view2} onPress={props.onPress}>
			<Text>{props.titulo}</Text>
		</Pressable>
	);
}
const style = StyleSheet.create({
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
		paddingVertical: 16,
		paddingHorizontal: 24,
	},
});
