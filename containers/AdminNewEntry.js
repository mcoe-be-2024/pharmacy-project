import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, ScrollView, View, TouchableOpacity } from 'react-native';
import {colors} from '../styles/Colors';
import { auth, firestore } from '../assets/firebase';
import { useAuth } from "../hooks";
import SelectDropdown from 'react-native-select-dropdown';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

export default AdminNewEntry = ({navigation}) => {
    const [name, setName] = useState("");
    const [lowerGestAge, setLowerGestAge] = useState("");
    const [upperGestAge, setUpperGestAge] = useState("");
    const [lowerPostAge, setLowerPostAge] = useState("");
    const [upperPostAge, setUpperPostAge] = useState("");
    const [condition, setCondition] = useState("");
    const [minDoseAmt, setMinDoseAmt] = useState("");
    const [maxDoseAmt, setMaxDoseAmt] = useState("");
    const [doseUnit, setDoseUnit] = useState("");
    const [doseDays, setDoseDays] = useState("");
    const [ROA, setROA] = useState("");
    const [frequency, setFrequency] = useState("");
    const [infusion, setInfusion] = useState("");
    const [solComp, setSolComp] = useState("");
    const {currentUser, setCurrentUser} = useAuth();

    const doseUnitList = ["mg/kg","units"];
    const doseDaysList = ["day","dose"];

    const handleAddNewEntry = () => {
        
    }

    return (
        <>
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={[styles.title, {marginBottom: 30}]}>New Entry</Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} value={name} onChangeText={(newName) => setName(newName)} />
                <Text style={styles.label}>Name</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={[styles.input, {width: "47%"}]} placeholder="Lower" value={lowerGestAge} onChangeText={(newLowerGestAge) => setLowerGestAge(newLowerGestAge)} />
                <TextInput style={[styles.input, {width: "47%"}]} placeholder="Upper" value={upperGestAge} onChangeText={(newUpperGestAge) => setUpperGestAge(newUpperGestAge)} />
                <Text style={styles.label}>Gestational Age</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={[styles.input, {width: "47%"}]} placeholder="Lower" value={lowerPostAge} onChangeText={(newLowerPostAge) => setLowerPostAge(newLowerPostAge)} />
                <TextInput style={[styles.input, {width: "47%"}]} placeholder="Upper" value={upperPostAge} onChangeText={(newUpperPostAge) => setUpperPostAge(newUpperPostAge)} />
                <Text style={styles.label}>Postnatal Age</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} value={condition} onChangeText={(newCondition) => setCondition(newCondition)} />
                <Text style={styles.label}>Condition</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={[styles.input, {width: "47%"}]} placeholder="Minimum" value={minDoseAmt} onChangeText={(newMinDoseAmt) => setMinDoseAmt(newMinDoseAmt)} />
                <TextInput style={[styles.input, {width: "47%"}]} placeholder="Maximum" value={maxDoseAmt} onChangeText={(newMaxDoseAmt) => setMaxDoseAmt(newMaxDoseAmt)} />
                <Text style={styles.label}>Dose Amount</Text>
            </View>
            <View style={styles.dropdownContainer}>
				<SelectDropdown
					data={doseUnitList}
					dropdownStyle={styles.dropdown}
					searchPlaceHolder="Search"
					search="true"
					searchInputStyle={styles.dropdownSearch}
					buttonStyle={styles.dropdownInput}
					buttonTextStyle={styles.dropdownText}
					rowTextStyle={styles.dropdownText}
					defaultButtonText="Select drug"
					renderDropdownIcon={() => {return <Entypo style={styles.dropdownIcon} name="chevron-thin-down" />} }
					renderSearchInputRightIcon={() => {return <Fontisto style={styles.dropdownIcon} name="search" />} }
					onSelect={(selectedItem, index) => {
						setDoseUnit(selectedItem)
					}}
					buttonTextAfterSelection={(selectedItem, index) => {
						return selectedItem
					}}
					rowTextForSelection={(item, index) => {
						return item
					}}
				/>
				<SelectDropdown
					data={doseDaysList}
					dropdownStyle={styles.dropdown}
					searchPlaceHolder="Search"
					search="true"
					searchInputStyle={styles.dropdownSearch}
					buttonStyle={styles.dropdownInput}
					buttonTextStyle={styles.dropdownText}
					rowTextStyle={styles.dropdownText}
					defaultButtonText="Select drug"
					renderDropdownIcon={() => {return <Entypo style={styles.dropdownIcon} name="chevron-thin-down" />} }
					renderSearchInputRightIcon={() => {return <Fontisto style={styles.dropdownIcon} name="search" />} }
					onSelect={(selectedItem, index) => {
						setDoseDays(selectedItem)
					}}
					buttonTextAfterSelection={(selectedItem, index) => {
						return selectedItem
					}}
					rowTextForSelection={(item, index) => {
						return item
					}}
				/>
				<Text style={styles.label}>Dose Unit</Text>
			</View>
            <View style={styles.submitContainer}>
                <TouchableOpacity style={styles.submitButton} onPress={handleAddNewEntry}>
                    <Text style={styles.submitText}>Add</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        backgroundColor: colors.lightColor2,
    },
    title: {
        fontSize: 26,
        marginBottom: 20,
        fontFamily: "MontserratBold",
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
        flexDirection: "row",
        justifyContent: "space-between",
    },
    input: {
        backgroundColor: colors.white,
        borderRadius: 10,
        height: 50,
        paddingHorizontal: 15,
        fontSize: 17,
        borderColor: colors.primaryColor,
        borderWidth: 1,
        fontFamily: "Montserrat",
        width: "100%",
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
        fontFamily: "MontserratBold",
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
        fontFamily: "MontserratBold",
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
    dropdownContainer: {
		marginBottom: 30,
        fontFamily: "MontserratBold",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        // backgroundColor: "red",
	},
	dropdown: {
		marginTop: "-7.5%",
		// padding: 5,
		backgroundColor: colors.white,
		borderRadius: 10,
		fontSize: 17,
		borderColor: colors.primaryColor,
		borderWidth: 1,
		width: "39%",
		alignItems: "center",
        fontFamily: "MontserratBold",
	},
	dropdownInput: {
		backgroundColor: colors.white,
		borderRadius: 10,
		height: 50,
		fontSize: 17,
		borderColor: colors.primaryColor,
		borderWidth: 1,
		width: "47%",
        fontFamily: "MontserratBold",
	},
	dropdownSearch: {
		width: "100%",
		borderBottomColor: colors.primaryColor,
		borderBottomWidth: 1,
        fontFamily: "MontserratBold",
	},
	dropdownText: {
        fontFamily: "MontserratBold",
		fontSize: 17,
	},
	dropdownIcon: {
        fontFamily: "MontserratBold",
		fontSize: 17,
		paddingRight: 7,
	},
});