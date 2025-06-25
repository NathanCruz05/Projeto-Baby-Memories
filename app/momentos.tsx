import { StyleSheet, Text, View } from 'react-native';
import Momentos from '../components/box';
import StyleBotao from '../components/StyleBotao';

import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { db } from "../firebase";


export default function Index() {

	const [momentos, setMomentos] = useState([]);

	const buscarMomentos = async () => {
		try {
			const querySnapshot = await getDocs(collection(db, "momentos"));
			const lista: any = [];

			querySnapshot.forEach((doc) => {
				lista.push({
					id: doc.id,
					...doc.data(),
				});
			});

			setMomentos(lista);
		} catch (e) {
			console.error("Erro ao buscar momentos:", e);
		}
	};

	useEffect(() => {
		buscarMomentos();
	}, []);


	return (
		<View style={style.container}>
			<View>
				<StyleBotao />
			</View>
			{momentos?.map((item: any) => (<View key={item.id}><Momentos momento={item.momento} /><Text>{item.momento}</Text></View>))}
		</View>
	);
}


const style = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
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
