import { ActivityIndicator, Platform } from 'react-native'
import React, { useContext, useState } from 'react'
import {
    Background,
    Container,
    AreaInput,
    Input,
    SubmitButton,
    SubmitText
} from '../Signin/styles'
import { AuthContext } from '../../contexts/auth'
export default function SignUp() {

    const { signUp, loadindAuth } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    function handleSignUp() {
        if(name === '' || email === '' || password === '') return;
        signUp(name, email, password)

    }
    return (
        <Background>
            <Container
                behaivor={Platform.OS === 'ios' ? 'padding' : ''}
                enable
            >
                <AreaInput>
                    <Input
                        placeholder='Nome'
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                    <Input
                        placeholder="Seu email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <Input
                        placeholder="Sua Senha"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </AreaInput>
                <SubmitButton onPress={handleSignUp}>
                    {
                        loadindAuth ? (
                            <ActivityIndicator size={20} color="#FFF"/>
                        ) : (
                            <SubmitText>Cadastrar</SubmitText>
                        )
                    }

                </SubmitButton>
            </Container>
        </Background>
    )

}

