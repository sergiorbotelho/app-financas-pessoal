import { ActivityIndicator, Platform } from 'react-native'
import React, { useState, useContext } from 'react'
import {
    Background,
    Container,
    Logo,
    AreaInput,
    Input,
    SubmitButton,
    SubmitText,
    Link,
    LinkText
} from './styles';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';
export default function Signin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, loadingAuth } = useContext(AuthContext);
    const navigation = useNavigation();

    function handleLogin() {
        signIn(email, password)
    }
    return (
        <Background>

            <Container
                behaivor={Platform.OS === 'ios' ? 'padding' : ''}
                enable
            >
                <Logo
                    source={require('../../assets/Logo.png')}
                />
                <AreaInput>
                    <Input
                        placeholder="Seu email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <Input
                        placeholder="Sua senha"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </AreaInput>
                <SubmitButton activeOpacity={0.8} onPress={handleLogin}>
                    {
                        loadingAuth ? (
                            <ActivityIndicator size={20} color="#FFF"/>
                        ) : (
                            <SubmitText>Acessar</SubmitText>
                        )
                    }
                    
                </SubmitButton>
                <Link onPress={() => navigation.navigate('SignUp')}>
                    <LinkText>Criar uma conta!</LinkText>
                </Link>
            </Container>

        </Background>
    )
}


