import { ActivityIndicator, StyleSheet, View } from 'react-native';

export const Carregamento = () => {
	return (
		<View style={estilo.container}>
			<ActivityIndicator size={100} />
		</View>
	);
};

const estilo = StyleSheet.create({
	container: {
		backgroundColor: 'rgba(255, 255, 255, 0.7)',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 40,
	},
});
