import React, { useState } from "react";

import { RegisterContainer, RegisterLabel, RegisterTypeButton } from "./styles";
import Feather from 'react-native-vector-icons/Feather'
export default function RegisterTypes({ type, sendTypeChanged }) {

    const [typeChecked, setTypeChecked] = useState(type);

    function sendType(name){
        if(name === 'receita'){
            setTypeChecked('receita')
            sendTypeChanged('receita')
        }else{
            setTypeChecked('despesa')
            sendTypeChanged('despesa')
        }
    }
    return (
        <RegisterContainer>
            <RegisterTypeButton checked={typeChecked === 'receita' ? true : false} onPress={() => sendType('receita')}>
                <Feather name="arrow-up" size={25} color="#121212" />
                <RegisterLabel>
                    Receita
                </RegisterLabel>
            </RegisterTypeButton>
            <RegisterTypeButton checked={typeChecked === 'despesa' ? true : false} onPress={() => sendType('despesa')}>
                <Feather name="arrow-down" size={25} color="#121212" />
                <RegisterLabel>
                    Despesa
                </RegisterLabel>
            </RegisterTypeButton>
        </RegisterContainer>
    )
}