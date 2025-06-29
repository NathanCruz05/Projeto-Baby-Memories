import { Carregamento } from '@/components/Carregamento';
import { authFirebase } from '@/firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import {
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';
import {
    Alert,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

const estilos = StyleSheet.create({
    header: {
        backgroundColor: '#757072',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        height: 60,
        width: '100%', // Garante que o header ocupe a largura total
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 10,
    },
    container: { // Container principal, similar ao da página de Cadastro
        backgroundColor: 'white',
        flex: 1,
    },
    // Estilos para a seção "Bem-vindo!"
    topo: {
        alignItems: 'flex-start', // Alinha o texto à esquerda
        marginLeft: 30, // Alinha com o início dos inputs
        marginBottom: 30,
    },
    titulo: {
        fontSize: 30, // Ajustado para ser um pouco menor
        color: '#333', // Cor mais neutra
    },
    // Estilos dos Inputs, copiados da página de Cadastro
    input: {
        backgroundColor: '#d6dee2',
        borderWidth: 0.2,
        borderRadius: 20,
        marginTop: 10,
        marginHorizontal: 30, // Margem horizontal para alinhar com o layout
        marginBottom: 24,
        height: 40,
        paddingHorizontal: 15,
    },
    // Estilos para o link "Esqueci minha senha"
    linkContainer: {
        alignItems: 'flex-end', // Alinha o link à direita
        marginRight: 30, // Margem para alinhar com o fim dos inputs
        marginBottom: 30,
    },
    link: {
        color: '#95aeff', // Cor similar ao botão de cadastro
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    // Estilos para os botões
    botoesContainer: {
        alignItems: 'center',
    },
    // Estilo do botão, copiado da página de Cadastro
    botao: {
        backgroundColor: '#95aeff',
        padding: 15,
        borderRadius: 30,
        width: 250,
        alignItems: 'center',
        marginBottom: 20, 
    },
    botaoTexto: {
        color: 'black',
    },
    label: { // Novo estilo para as labels dos inputs
        paddingLeft: 30, // Alinha com o início dos inputs
        marginBottom: 5,
        fontSize: 14,
    }
});

export default function LoginScreen() {
    const router = useRouter();

    const [carregando, setCarregando] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const irParaCadastro = () => {
        router.push('/cadastro');
    };

    const fazerLogin = () => {
        setCarregando(true);

        signInWithEmailAndPassword(authFirebase, email, password)
            .then(() => {
                router.push('/momentos');
            })
            .finally(() => {
                setCarregando(false);
            })
            .catch((error: any) => {
                Alert.alert(
                    'Erro ao fazer login',
                    'Verifique seu e-mail e senha e tente novamente.',
                    [{ text: 'OK' }]
                );
            });
    };

    const recuperarSenha = () => {
        if (!email) {
            Alert.alert('Erro', 'Por favor, insira seu e-mail para recuperação de senha.');
            return;
        }

        sendPasswordResetEmail(authFirebase, email)
            .then(() => {
                Alert.alert('Sucesso', 'E-mail de recuperação enviado! Verifique sua caixa de entrada.');
            })
            .catch((error: any) => {
                console.error("Erro ao recuperar senha:", error);
                let errorMessage = 'Erro ao enviar e-mail de recuperação. Tente novamente.';
                if (error.code === 'auth/user-not-found') {
                    errorMessage = 'Nenhum usuário encontrado com este e-mail.';
                } else if (error.code === 'auth/invalid-email') {
                    errorMessage = 'O formato do e-mail é inválido.';
                }
                Alert.alert('Erro', errorMessage);
            });
    };

    return (
        <SafeAreaView style={estilos.container}>
            {carregando && <Carregamento />}

            <View style={estilos.header}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons name='arrow-back' size={24} color='#fff' />
                </Pressable>
                <Text style={estilos.headerTitle}>Entrar</Text>
            </View>

            {/* Conteúdo principal com margem superior para espaçamento */}
            <View style={{ marginTop: 45 }}>
                {/* Seção "Bem-vindo!" */}
                <View style={estilos.topo}>
                    <Text style={estilos.titulo}>Bem-vindo!</Text>
                </View>

                {/* Campo E-mail */}
                <Text style={estilos.label}>E-mail</Text>
                <TextInput
                    style={estilos.input}
                    placeholder='E-mail'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    value={email}
                    onChangeText={setEmail}
                    textContentType='emailAddress'
                />

                {/* Campo Senha */}
                <Text style={estilos.label}>Senha</Text>
                <TextInput
                    style={estilos.input}
                    placeholder='Senha'
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                {/* Link "Esqueci minha senha" */}
                <Pressable style={estilos.linkContainer} onPress={recuperarSenha}>
                    <Text style={estilos.link}>Esqueci minha senha</Text>
                </Pressable>
            </View>

            {/* Contêiner dos botões de Login e Criar Conta */}
            <View style={estilos.botoesContainer}>
                <Pressable style={estilos.botao} onPress={fazerLogin}>
                    <Text style={estilos.botaoTexto}>Entrar</Text>
                </Pressable>
                <Pressable style={estilos.botao} onPress={irParaCadastro}>
                    <Text style={estilos.botaoTexto}>Criar conta</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
