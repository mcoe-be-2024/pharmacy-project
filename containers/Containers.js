import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Landing, LoginType, RegisterType, Login, Register, Home, Output } from '../containers';
import { headerStyles } from '../styles/HeaderStyles';
import { useAuth } from "../hooks";

export const Containers = ({children, navigation}) => {
    const {currentUser} = useAuth();
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={headerStyles}>
            {(!currentUser?.email) ? (
                <>
                <Stack.Screen name="Landing" component={Landing} options={{title: "PharmaProject"}} />
                <Stack.Screen name="LoginType" component={LoginType} options={{title: "Login"}} />
                <Stack.Screen name="RegisterType" component={RegisterType} options={{title: "Registration"}} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} options={{title: "Registration"}} />
                </>
            ) : (
                <>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Output" component={Output} options={{title: "Prescription"}} />
                </>
            )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}