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
		color: "black",
	},
	view2: {
	backgroundColor: "#b5c4f7",
    padding: 15,
    borderRadius: 30,
    width: 250,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 2,           
    borderColor: '#007bff',   
    borderStyle: 'solid',
	alignSelf: "center",
	},
});
