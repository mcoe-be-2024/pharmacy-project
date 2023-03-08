import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, ScrollView, View, TouchableOpacity ,Alert} from 'react-native';
import {colors} from '../styles/Colors';
import { auth, firestore } from '../assets/firebase';
import { useAuth } from "../hooks";
import SelectDropdown from 'react-native-select-dropdown';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

export default AdminEditEntry = ({navigation,route}) => {
    const {drugID} = route.params;
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
    const [lowerWeight, setLowerWeight] = useState("");
    const [upperWeight, setUpperWeight] = useState("");
    const [lowerHeight, setLowerHeight] = useState("");
    const [upperHeight, setUpperHeight] = useState("");
    const {currentUser, setCurrentUser} = useAuth();

    const doseUnitList = ["mg/kg","units"];
    const doseDaysList = ["day","dose"];

    const handleEditEntry = () => {
        
    }

    const showAlert1 = (e, text1,notice1) => {
        e.preventDefault();
        Alert.alert(
            notice1,
            text1,
            [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            ],
            {
                cancelable: true,
            }
  );}

    return (
        <>
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={[styles.title, {marginBottom: 30,paddingTop: 35}]}>Edit Entry</Text>
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
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} value={frequency} onChangeText={(newFrequency) => setFrequency(newFrequency)} />
                <Text style={styles.label}>Frequency</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} value={ROA} onChangeText={(newROA) => setROA(newROA)} />
                <Text style={styles.label}>ROA</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} value={infusion} onChangeText={(newInfusion) => setInfusion(newInusion)} />
                <Text style={styles.label}>Infusion Rate</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} value={solComp} onChangeText={(newSolComp) => setSolComp(newSolComp)} />
                <Text style={styles.label}>Solution Compatibility</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={[styles.input, {width: "47%"}]} placeholder="Minimum" value={lowerWeight} onChangeText={(newLowerWeight) => setLowerWeight(newLowerWeight)} />
                <TextInput style={[styles.input, {width: "47%"}]} placeholder="Maximum" value={upperWeight} onChangeText={(newUpperWeight) => setUpperWeight(newUpperWeight)} />
                <Text style={styles.label} onPress={(e) => showAlert1(e,'Enter the weight in kg','Weight unit')}>Weight &#9432;</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={[styles.input, {width: "47%"}]} placeholder="Minimum" value={lowerHeight} onChangeText={(newLowerHeight) => setLowerHeight(newLowerHeight)} />
                <TextInput style={[styles.input, {width: "47%"}]} placeholder="Maximum" value={upperHeight} onChangeText={(newUpperHeight) => setUpperHeight(newUpperHeight)} />
                <Text style={styles.label} onPress={(e) => showAlert1(e,'Enter the height in centimeters ','Height unit')}>Height &#9432;</Text>
            </View>
            <View style={styles.submitContainer}>
                <TouchableOpacity style={styles.submitButton} onPress={handleEditEntry}>
                    <Text style={styles.submitText}>Update</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
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
        fontSize: 13,
        top: -12,
        left: 9,
        backgroundColor: colors.primaryColor,
        paddingHorizontal: 9,
        paddingVertical: 3,
        borderRadius: 10,
        color: colors.white,
        fontFamily: "MontserratBold",
    },
    submitContainer: {
        width: "80%",
        paddingBottom: "5%",
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