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
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		width: '100%',
		height: '100%',
		zIndex: 40,
	},
});
