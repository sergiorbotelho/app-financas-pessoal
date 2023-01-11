import React, { useContext, useState, useEffect } from "react";
import api from "../../services/api";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";
import { format } from "date-fns";
import { Background, ListBalance, Area, Title, List } from './styles';
import { useIsFocused } from "@react-navigation/native";
import BalanceItem from "../../components/BalanceItem";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity } from "react-native";
import HistoricoList from "../../components/HistoricoList";
import { Modal } from "react-native";
import CalendarModal from "../../components/CalendarModal";
export default function Home() {
    const isFocused = useIsFocused();
    const { signOut, user } = useContext(AuthContext);
    const [listBalance, setListBalance] = useState([]);
    const [moviments, setMoviments] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [dateMovements, setDateMovements] = useState(new Date());

    useEffect(() => {
        let isActive = true;
        async function getMovements() {
            
            let date = new Date(dateMovements);
            let onlyDate = date.valueOf() + date.getTimezoneOffset() * 60 * 1000;
            let dateFormated = format(onlyDate, 'dd/MM/yyyy');
            console.log(dateFormated)
            const receives = await api.get('/receives', {
                params: {
                    date: dateFormated
                }
            })
            const balance = await api.get('/balance', {
                params: {
                    date: dateFormated
                }
            })

            if (isActive) {
                setMoviments(receives.data);
                setListBalance(balance.data);
            }
        }
        getMovements()

        return () => isActive = false
    }, [isFocused, dateMovements])

    async function handleDelete(id) {
        try {
            await api.delete('/receives/delete', {
                params: {
                    item_id: id
                }
            })
            setDateMovements(new Date())
        } catch (error) {
            console.log(error);
        }
    }
    function filterDateMovements(dateSelected){
        setDateMovements(dateSelected);
        console.log(dateSelected)
        
    }
    return (
        <Background>
            <Header title="Minhas movimentações" />
            <ListBalance
                data={listBalance}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.tag}
                renderItem={({ item }) => (
                    <BalanceItem data={item} />
                )}
            />
            <Area>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Icon name="event" color='#121212' size={30} />
                </TouchableOpacity>
                <Title>Últimas movimentações</Title>

            </Area>

            <List
                data={moviments}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <HistoricoList data={item} deleteItem={handleDelete} />}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBotton: 20 }}
            />
            <Modal visible={modalVisible} animationType="fade" transparent={true}>
                <CalendarModal 
                    setVisible={() => setModalVisible(false)} 
                    handleFilter={filterDateMovements}
                />
            </Modal>
        </Background>
    )
}