import React, { useContext } from "react";
import { View, Text, Image } from 'react-native';
import { DrawerItemList, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { AuthContext } from "../../contexts/auth";
export default function CustomDrawer(props) {
    const { user, signOut } = useContext(AuthContext);
    return (
        <DrawerContentScrollView>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
                <Image
                    source={require('../../assets/Logo.png')}
                    style={{ width: 90, height: 90 }}
                    resizeMode="contain"
                />
                <Text style={{ fontSize: 18, marginTop: 14, color: '#000' }}>Bem-Vindo</Text>
                <Text style={{ fontSize: 17, marginBottom: 14, color: '#000', fontWeight: 'bold', paddingHorizontal: 20 }}>
                    {user && user.name}
                </Text>
            </View>
            <DrawerItemList {...props} />
            <DrawerItem
                {...props}
                
                label="Sair da conta"
                labelStyle={{ color: '#FF0000' }}
                onPress={() => signOut()}
            />
        </DrawerContentScrollView>
    )
}