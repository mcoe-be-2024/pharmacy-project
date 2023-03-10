import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import {colors} from '../styles/Colors';
import {Button} from '../components';
import logo from '../assets/logo.png';
import { auth } from "../assets/firebase";

export default Output = ({route, navigation}) => {
    const {drugs} = route.params;

    // console.log(drugs);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>{drugs[0]["Name of the drug"]}</Text>
            {drugs.map((drug, index) => {
                return (
                    <View style={styles.contentContainer} key={index}>
                        <Text style={styles.subtitleLabel}>Conditon:</Text>
                        <Text style={styles.subtitle}>{drug["Condition"] ? drug["Condition"] : "No condition"}</Text>
                        <Text style={styles.subtitleLabel}>Solution Compatibility:</Text>
                        <Text style={styles.subtitle}>{drug["solution compatability"]}</Text>
                    </View>);
            })
            }
            <View style={styles.submitContainer}>
				<TouchableOpacity style={styles.submitButton} onPress={() => navigation.goBack()}>
					<Text style={styles.submitText}>Generate New Prescription</Text>
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
        // fontWeight: "bold",
        marginVertical: 20,
        padding: 5,
        color: colors.darkColor1,
        borderBottomColor: colors.primaryColor,
        borderBottomWidth: 2,
        fontFamily: "MontserratThick",
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
        fontFamily: "MontserratBold",
    },
    subtitleLabel: {
        fontSize: 14,
        color: colors.darkColor1,
        // fontWeight: "bold",
        // flex: 1,
        justifyContent: "flex-start",
        width: "100%",
        paddingHorizontal: 15,
        fontFamily: "MontserratThick",
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    submitContainer: {
		width: "70%",
        marginBottom: 30,
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
        fontFamily: "MontserratBold",
	},
});