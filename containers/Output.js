import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import {colors} from '../styles/Colors';
import {Button} from '../components/Button';
import logo from '../assets/logo.png';
import { auth } from "../firebase";

export const Output = ({route, navigation}) => {
    const {drugs} = route.params;

    console.log(drugs);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>{drugs[0]["Name of the drug"]}</Text>
            {drugs.map((drug) => {
                return (
                    <View style={styles.contentContainer}>
                        <Text style={styles.subtitleLabel}>Conditon:</Text>
                        <Text style={styles.subtitle}>{drug["Condition"] ? drug["Condition"] : "No condition"}</Text>
                        <Text style={styles.subtitleLabel}>Solution Compatibility:</Text>
                        <Text style={styles.subtitle}>{drug["solution compatability"]}</Text>
                    </View>);
            })
            }
            <View style={styles.submitContainer}>
				<TouchableOpacity style={styles.submitButton} >
					<Text style={styles.submitText}>Generate Prescription</Text>
				</TouchableOpacity>
			</View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: "100%",
		backgroundColor: colors.lightColor2,
	},
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        backgroundColor: colors.lightColor2,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 20,
        padding: 5,
        color: colors.darkColor1,
        borderBottomColor: colors.primaryColor,
        borderBottomWidth: 2,
    },
    contentContainer : {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: "90%",
        borderRadius: 10,
        paddingVertical: 15,
        backgroundColor: colors.white,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: colors.primaryColor,
    },
    subtitle: {
        fontSize: 13,
        marginBottom: 5,
        width: "100%",
        paddingHorizontal: 15,
    },
    subtitleLabel: {
        fontSize: 14,
        color: colors.darkColor1,
        fontWeight: "bold",
        // flex: 1,
        justifyContent: "flex-start",
        width: "100%",
        paddingHorizontal: 15,
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    submitContainer: {
		width: "60%",
	},
	submitButton: {
		width: "100%",
		backgroundColor: colors.primaryColor,
		paddingVertical: 13,
		borderRadius: 10,
		marginTop: 5,
	},
	submitText: {
		textAlign: "center",
		justifyContent: "center",
		fontSize: 17,
		color: colors.white,
	},
});