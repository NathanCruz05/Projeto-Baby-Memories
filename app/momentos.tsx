import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import StyleBotao from '../components/StyleBotao';
import { authFirebase, db, } from "../firebase";

interface Momento {
	id: string;
	data: string;        // "29/06/2025"
	momento: string;     // "Primeiro sorriso"
	descricao: string;   // texto livre
	url: string;         // downloadURL da foto
	userID: string;      // uid do Firebase Auth
	createdAt: number;   // Date.now() salvo na gravação
}

export default function MomentosScreen() {
	const [momentos, setMomentos] = useState<Momento[]>([]);


	useEffect(() => {
		const uid = authFirebase.currentUser?.uid;
		if (!uid) return; // sem usuário logado, não faz nada

		const q = query(
			collection(db, 'momentos'),
			where('userID', '==', uid),
			orderBy('createdAt', 'desc')
		);

		const unsubscribe = onSnapshot(q, (snap) => {
			const lista = snap.docs.map((d) => ({
				id: d.id,
				...(d.data() as Omit<Momento, 'id'>),
			}));
			setMomentos(lista);
		});

		return unsubscribe; // limpa o listener ao desmontar
	}, []);

	const renderItem = ({ item }: { item: Momento }) => (
		<View style={styles.card}>
			<Image source={{ uri: item.url }} style={styles.foto} />
			<View style={styles.info}>
				<Text style={styles.titulo}>{item.momento}</Text>
				{!!item.descricao && (
					<Text style={styles.descricao}>{item.descricao}</Text>
				)}
				<Text style={styles.data}>{item.data}</Text>
			</View>
		</View>
	);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Ionicons name="arrow-back" size={24} color="#fff" />
				<Text style={styles.headerTitle}>Momentos</Text>
			</View>

			<StyleBotao />

			<FlatList
				data={momentos}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				contentContainerStyle={styles.list}
				ListEmptyComponent={
					<Text style={styles.empty}>Nenhum momento cadastrado ainda 🙃</Text>
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#757072',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 15,
		height: 60,
	},
	headerTitle: {
		color: '#fff',
		fontSize: 18,
		marginLeft: 10,
	},
	container: { flex: 1, backgroundColor: '#fff' },
	list: { paddingVertical: 20 },
	card: {
		flexDirection: 'row',
		backgroundColor: '#f2f2f2',
		borderRadius: 12,
		marginHorizontal: 16,
		marginBottom: 12,
		padding: 10,
		elevation: 2,
	},
	foto: { width: 80, height: 80, borderRadius: 8 },
	info: { flex: 1, marginLeft: 10 },
	titulo: { fontSize: 16, fontWeight: 'bold' },
	descricao: { color: '#555', marginTop: 4 },
	data: { color: '#999', marginTop: 4, fontSize: 12 },
	empty: { textAlign: 'center', marginTop: 40, fontSize: 16 },
});