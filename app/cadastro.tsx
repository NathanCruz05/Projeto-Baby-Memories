import { authFirebase } from '@/firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; // Importe updateProfile
import { useState } from 'react';
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function Cadastro() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState(''); // Novo estado para o nome

    const router = useRouter();

    const cadastro = async () => {
        try {
            // 1. Cria o usuário com e-mail e senha
            const userCredential = await createUserWithEmailAndPassword(authFirebase, email, senha);
            const user = userCredential.user; // Obtém o objeto do usuário recém-criado

            // 2. Atualiza o perfil do usuário com o nome
            if (user) {
                await updateProfile(user, {
                    displayName: nome, // Define o nome de exibição do usuário
                });
                console.log("Nome do usuário atualizado com sucesso!");
            }

            // 3. Redireciona para a tela de login
            router.push('/login');
        } catch (error: any) { // Adicionado tipagem 'any' para o erro
            console.error("Erro no cadastro:", error);
            let errorMessage = 'Não foi possível criar a conta.';
            // Mensagens de erro mais amigáveis (opcional)
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'Este e-mail já está em uso.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Formato de e-mail inválido.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
            }
            Alert.alert('Erro', errorMessage);
        }
    };

    return (
        <View style={estilos.container}>
            <View style={estilos.header}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons name='arrow-back' size={24} color='#fff' />
                </Pressable>
                <Text style={estilos.headerTitle}>Cadastro</Text>
            </View>

            <View style={{ marginTop: 45 }}>
                {/* Campo para o Nome */}
                <View style={{ paddingLeft: 40 }}>
                    <Text>Nome</Text>
                </View>
                <TextInput
                    style={estilos.input}
                    value={nome}
                    onChangeText={setNome}
                    placeholder="Seu nome completo" // Adicione um placeholder
                />

                {/* Campo para o E-mail */}
                <View style={{ paddingLeft: 40 }}>
                    <Text>E-mail</Text>
                </View>
                <TextInput
                    style={estilos.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address" // Sugere teclado de e-mail
                    autoCapitalize="none" // Evita capitalização automática
                    placeholder="seu.email@example.com"
                />

                {/* Campo para a Senha */}
                <View style={{ paddingLeft: 40 }}>
                    <Text>Senha</Text>
                </View>
                <TextInput
                    style={estilos.input}
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry // Esconde a senha
                    placeholder="Sua senha"
                />
            </View>
            <View>
                <Pressable style={estilos.botao} onPress={cadastro}>
                    {/* Alteração aqui: Aplicado o novo estilo botaoTexto */}
                    <Text style={estilos.botaoTexto}>Criar Conta</Text>
                </Pressable>
            </View>
        </View>
    );
}

const estilos = StyleSheet.create({
    header: {
        backgroundColor: '#757072',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        height: 60,
        marginBottom: 24,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 10,
    },
    input: {
        backgroundColor: '#d6dee2',
        borderWidth: 0.2,
        borderRadius: 20,
        marginTop: 10,
        marginHorizontal: 30,
        marginBottom: 24,
        height: 40,
        paddingHorizontal: 15, // Adicionado para melhor visualização do texto
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    botao: {
        backgroundColor: '#95aeff',
        padding: 15,
        borderRadius: 30,
        width: 250, // Mantém a largura definida
        alignSelf: 'center', // Adicionado para centralizar o botão
        alignItems: 'center', // Alinha o conteúdo interno (o texto) horizontalmente
        justifyContent: 'center', // Adicionado para centralizar o conteúdo interno verticalmente
    },
    // Novo estilo para o texto do botão
    botaoTexto: {
        color: 'black',
        textAlign: 'center', // Centraliza o texto horizontalmente
    },
});
