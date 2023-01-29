import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {colors} from '../styles/Colors';
import Button from '../components/Button';
import logo from '../assets/logo.png';

export default Landing = () => {

    const handleRegister = () => {
        
    }
    const handleLogin = () => {

    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>PharmaProject</Text>
            <Image style={styles.logo} source={logo} />
            <Text style={styles.subtitle}>Welcome</Text>
            <View style={styles.buttonContainer}>
                <Button onPress={handleRegister} text="Register" />
                <Button onPress={handleLogin} text="Login" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 25,
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 20,
        width: "55%",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        padding: 10,
        marginHorizontal: 15,
    },
});