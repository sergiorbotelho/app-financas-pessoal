import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUp from "../pages/SignUp";
import Signin from "../pages/Signin";

const AuthStack = createNativeStackNavigator();

export default function AuthRoutes() {

    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="Signin"
                component={Signin}
                options={{
                    headerShown: false
                }}
            />
            <AuthStack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    headerStyle:{
                        backgroundColor: '#3b3dbf',
                        borderBottomWidth: 1,
                        borderBottomColpr: '#00b94a'
                    },
                    headerTintColor: '#FFF',
                    headerTitle: 'Voltar',
                    headerBackTitleVisible: false
                }}
            />
        </AuthStack.Navigator>
    )
}