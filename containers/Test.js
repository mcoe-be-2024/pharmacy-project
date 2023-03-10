import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import {colors} from '../styles/Colors';
import drugData from "../assets/drugData.json";

export default Test = () => {
    

    return (
        <>
        <View style={styles.container}>
            <Text>HELLO</Text>
            {drugData.map((item) => {
                return <Text>{item["Name of the drug"] === "Vancomycin" ? item["Name of the drug"] : null}</Text>
            })}
        </View>
        </>
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
    buttonGroup: {
        flexDirection: "row",
        marginTop: 20,
        width: "65%",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        padding: 10,
        marginHorizontal: 15,
    },
    buttonIcon: {
        fontSize: 55,
        color: colors.white,
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    buttonIconContainer: {
        backgroundColor: colors.primaryColor,
        padding: 15,
        borderRadius: 100,
        borderColor: colors.primaryColor,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        marginTop: 10,
        fontSize: 18,
    },
    inputContainer: {
        width: "80%",
        marginBottom: 30,
    },
    input: {
        backgroundColor: colors.white,
        borderRadius: 10,
        height: 50,
        paddingHorizontal: 15,
        fontSize: 17,
        borderColor: colors.primaryColor,
        borderWidth: 1,
    },
    label: {
        position: "absolute",
        fontSize: 14,
        top: -12,
        left: 10,
        backgroundColor: colors.primaryColor,
        paddingHorizontal: 9,
        paddingVertical: 3,
        borderRadius: 10,
        color: colors.white,
    },
    submitContainer: {
        width: "80%",
    },
    submitButton: {
        width: "100%",
        backgroundColor: colors.primaryColor,
        paddingVertical: 13,
        borderRadius: 10,
        marginTop: -5,
    },
    submitText: {
        textAlign: "center",
        justifyContent: "center",
        fontSize: 18,
        color: colors.white,
    },
    backButton: {
        textAlign: "center",
        justifyContent: "center",
        color: colors.white,
        backgroundColor: colors.primaryColor,
        position: "absolute",
        top: 10,
        left: 10,
        borderRadius: 5,
    },
    backButtonIcon: {
        fontSize: 30,
        paddingHorizontal: 8,
        paddingVertical: 5,
        color: colors.white,
    },
});