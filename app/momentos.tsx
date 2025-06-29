import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import StyleBotao from '../components/StyleBotao';
import { authFirebase, db } from '../firebase';

interface Momento {
    id: string;
    data: string;
    momento: string;
    descricao: string;
    url: string;
    userID: string;
    createdAt: number;
}

export default function Momentos() {
    const uid = authFirebase.currentUser?.uid;

    const router = useRouter();

    const [momentos, setMomentos] = useState<Momento[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentMomentIndex, setCurrentMomentIndex] = useState(0);

    const sair = async () => {
        try {
            await authFirebase.signOut();
            router.push('/login');
        } catch (error: any) {
            console.error("Erro ao sair:", error);
            Alert.alert('Erro', 'Não foi possível sair da conta.');
        }
    };

    const buscarMomentos = useCallback(async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'momentos'));
            const lista: Momento[] = [];

            querySnapshot.forEach((doc) => {
                if (doc.data().userID === uid) {
                    lista.push({
                        id: doc.id,
                        data: doc.data().data,
                        momento: doc.data().momento,
                        descricao: doc.data().descricao,
                        url: doc.data().url,
                        userID: doc.data().userID,
                        createdAt: doc.data().createdAt,
                    });
                }
            });

            lista.sort((a, b) => b.createdAt - a.createdAt);

            setMomentos(lista);
        } catch (e: any) {
            console.error('Erro ao buscar momentos:', e);
            Alert.alert('Erro', 'Não foi possível carregar os momentos.');
        } finally {
            setLoading(false);
        }
    }, [uid]);

    const handleDeleteMoment = async (id: string) => {
        Alert.alert(
            'Confirmar Exclusão',
            'Tem certeza que deseja apagar este momento?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Apagar',
                    onPress: async () => {
                        setLoading(true);
                        try {
                            await deleteDoc(doc(db, 'momentos', id));
                            Alert.alert('Sucesso', 'Momento apagado com sucesso!');
                            buscarMomentos();
                            setModalVisible(false);
                        } catch (error: any) {
                            console.error('Erro ao apagar momento:', error);
                            Alert.alert('Erro', 'Não foi possível apagar o momento.');
                        } finally {
                            setLoading(false);
                        }
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        );
    };

    useEffect(() => {
        buscarMomentos();
    }, [buscarMomentos]);

    const openMomentModal = (index: number) => {
        setCurrentMomentIndex(index);
        setModalVisible(true);
    };

    const goToPreviousMoment = () => {
        setCurrentMomentIndex((prevIndex) =>
            prevIndex === 0 ? momentos.length - 1 : prevIndex - 1
        );
    };

    const goToNextMoment = () => {
        setCurrentMomentIndex((prevIndex) =>
            prevIndex === momentos.length - 1 ? 0 : prevIndex + 1
        );
    };

    const renderItem = ({ item, index }: { item: Momento; index: number }) => (
        <TouchableOpacity style={styles.card} onPress={() => openMomentModal(index)}>
            <Image source={{ uri: item.url }} style={styles.foto} />
            <View style={styles.info}>
                <Text style={styles.titulo}>{item.momento}</Text>
                {!!item.descricao && (
                    <Text style={styles.descricao}>{item.descricao}</Text>
                )}
                <Text style={styles.data}>{item.data}</Text>
            </View>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteMoment(item.id)}
            >
                <Ionicons name='trash-outline' size={24} color='#dc3545' />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    const currentMoment = momentos[currentMomentIndex];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Página Inicial</Text>
            </View>

            <View style={styles.botoes}>
                <StyleBotao
                    titulo='Adicionar Momento'
                    onPress={() => {
                        router.push('/AddMomento');
                    }}
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#757072" style={styles.loadingIndicator} />
            ) : (
                <FlatList
                    data={momentos}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={
                        <Text style={styles.empty}>Nenhum momento cadastrado ainda 🙃</Text>
                    }
                />
            )}

            <View style={styles.botoes}>
                <StyleBotao titulo='Sair' onPress={sair} />
            </View>

            <View style={styles.bottomMenu}>
                <TouchableOpacity style={styles.menuItem} onPress={()=> router.push('/AddMomento')}>
                    <Ionicons name='add-circle-outline' size={20} color='#fff' />
                    <Text style={styles.menuText}>Adicionar momento</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name='images-outline' size={20} color='#fff' />
                    <Text style={styles.menuText}>Álbum digital</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/ConfiguracoesConta')}>
                    <Ionicons name='settings-outline' size={20} color='#fff' />
                    <Text style={styles.menuText}>Configurações</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Ionicons name='close-circle-outline' size={30} color='#fff' />
                        </Pressable>

                        {currentMoment && (
                            <>
                                <Image source={{ uri: currentMoment.url }} style={styles.modalImage} />
                                <Text style={styles.modalTitle}>{currentMoment.momento}</Text>
                                <Text style={styles.modalDescription}>{currentMoment.descricao}</Text>
                                <Text style={styles.modalDate}>{currentMoment.data}</Text>

                                <View style={styles.modalNavigation}>
                                    <TouchableOpacity onPress={goToPreviousMoment} style={styles.navButton}>
                                        <Ionicons name='arrow-back-circle-outline' size={40} color='#fff' />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={goToNextMoment} style={styles.navButton}>
                                        <Ionicons name='arrow-forward-circle-outline' size={40} color='#fff' />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                    style={styles.modalDeleteButton}
                                    onPress={() => handleDeleteMoment(currentMoment.id)}
                                >
                                    <Ionicons name='trash-outline' size={28} color='#fff' />
                                    <Text style={styles.modalDeleteButtonText}>Apagar Momento</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
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
        marginBottom: 24,
    },
    botoes: { color: 'black', alignItems: 'center', padding: 20, fontWeight: 'bold' },
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
        alignItems: 'center',
    },
    foto: { width: 80, height: 80, borderRadius: 8 },
    info: { flex: 1, marginLeft: 10 },
    titulo: { fontSize: 16, fontWeight: 'bold' },
    descricao: { color: '#555', marginTop: 4 },
    data: { color: '#999', marginTop: 4, fontSize: 12 },
    empty: { textAlign: 'center', marginTop: 40, fontSize: 16 },
    deleteButton: {
        padding: 8,
        marginLeft: 10,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(200, 191, 191, 0.88)', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#848785', 
        borderRadius: 15,
        padding: 20,
        width: '90%',
        alignItems: 'center',
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1, // Garante que o botão esteja acima da imagem
    },
    modalImage: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginBottom: 15,
        resizeMode: 'contain', // Garante que a imagem se ajuste ao contêiner
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
        textAlign: 'center',
    },
    modalDescription: {
        fontSize: 16,
        color: '#eee',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalDate: {
        fontSize: 14,
        color: '#ccc',
        marginBottom: 20,
    },
    modalNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
    },
    navButton: {
        padding: 10,
    },
    modalDeleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dc3545', // Cor vermelha para o botão de apagar no modal
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginTop: 10,
    },
    modalDeleteButtonText: {
        color: '#fff',
        marginLeft: 10,
        fontWeight: 'bold',
    },
    bottomMenu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#757072',
        paddingVertical: 10,
    },
    menuItem: {
        alignItems: 'center',
    },
    menuText: {
        color: '#fff',
        fontSize: 12,
        marginTop: 2,
    },
});
