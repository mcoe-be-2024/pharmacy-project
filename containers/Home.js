import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Button, Alert, TouchableOpacity } from 'react-native';
import { Dropdown } from "../components";
import SelectDropdown from 'react-native-select-dropdown';
import { colors } from '../styles/Colors';
import { auth, firestore } from "../assets/firebase";
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import drugData from "../assets/drugData.json";
import { useAuth } from "../hooks";

export default function Home({ navigation }) {
	const { currentUser, setCurrentUser } = useAuth();
	const [drugsList, setDrugsList] = useState([]);
	const [drugName, setDrugName] = useState("");
	const [gestationalAge, setGestationalAge] = useState("");
	const [postnatalAge, setPostnatalAge] = useState("");
	const [weight, setWeight] = useState("");
	const [height, setHeight] = useState("");
	const [output, setOutput] = useState([]);

	useEffect(() => {
		const tempDrugList = drugData.map((drug) => {
			return (drug["Name of the drug"]);
		})
		setDrugsList([...new Set(tempDrugList)]);
	}, []);

	const drugsDB = firestore.collection("drugs");

	// useEffect(() => {
	// 	navigation.setOptions({
	// 		headerRight: () => (
	// 			<TouchableOpacity onPress={handleSignOut}>
	// 				<View style={styles.logoutIconContainer}>
	// 					<MaterialIcons style={styles.logoutIcon} name="logout" />
	// 				</View>
	// 			</TouchableOpacity>
	// 		),
	// 	});
	// }, [navigation]);

	const resetInputFields = () => {
		setDrugName("");
		setGestationalAge("");
		setPostnatalAge("");
		setWeight("");
		setHeight("");
	}

	useEffect(() => {
		resetInputFields();
	}, []);

	// const handleSignOut = () => {
	// 	auth
	// 		.signOut()
	// 		.then(() => {
	// 			setCurrentUser(null)
	// 		})
	// 		.catch(error => alert(error.message))
	// }

	const generatePrescription = () => {
		const drugs = [];
		drugsDB
		.where("Name of the drug", "==", drugName)
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				// console.log(doc.data());
				drugs.push(doc.data())
			})
			setOutput(drugs);
		})
		.catch((error) => {
			alert(error);
		});
	}

	useEffect(() => {
		if (output.length !== 0) {
			navigation.navigate("Output", { drugs: output });
		}
	}, [output]);


	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			{/* <Text>User: {currentUser?.name}</Text> */}
			<View style={styles.dropdownContainer}>
				<SelectDropdown
					data={drugsList}
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
						setDrugName(selectedItem)
					}}
					buttonTextAfterSelection={(selectedItem, index) => {
						return selectedItem
					}}
					rowTextForSelection={(item, index) => {
						return item
					}}
				/>
				<Text style={styles.label}>Drug Name</Text>
			</View>
			<View style={styles.inputContainer}>
				<TextInput keyboardType='numeric' style={styles.input} value={gestationalAge} onChangeText={(newGestationalAge) => setGestationalAge(newGestationalAge)} />
				<Text style={styles.label}>Gestational Age</Text>
				<Text style={styles.suffixText}>weeks</Text>
			</View>
			<View style={styles.inputContainer}>
				<TextInput keyboardType='numeric' style={styles.input} value={postnatalAge} onChangeText={(newPostnatalAge) => setPostnatalAge(newPostnatalAge)} />
				<Text style={styles.label}>Postnatal Age</Text>
				<Text style={styles.suffixText}>days</Text>
			</View>
			<View style={styles.inputContainer}>
				<TextInput keyboardType='numeric' style={styles.input} value={weight} onChangeText={(newWeight) => setWeight(newWeight)} />
				<Text style={styles.label}>Weight</Text>
				<Text style={styles.suffixText}>kg</Text>
			</View>
			<View style={styles.inputContainer}>
				<TextInput keyboardType='numeric' style={styles.input} value={height} onChangeText={(newHeight) => setHeight(newHeight)} />
				<Text style={styles.label}>Height</Text>
				<Text style={styles.suffixText}>m</Text>
			</View>
			<View style={styles.submitContainer}>
				<TouchableOpacity style={styles.submitButton} onPress={generatePrescription}>
					<Text style={styles.submitText}>Generate Prescription</Text>
				</TouchableOpacity>
			</View>
			{/* {output.map((drug) => {
				return <Text>{drug["Name of the drug"]}</Text>
			})} */}
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
	inputContainer: {
		width: "80%",
		marginBottom: 30,
		flexDirection: "row",
	},
	input: {
		backgroundColor: colors.white,
		borderRadius: 10,
		height: 50,
		paddingHorizontal: 15,
		fontSize: 17,
		borderColor: colors.primaryColor,
		borderWidth: 1,
		width: "100%",
        fontFamily: "MontserratBold",
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
	dropdownContainer: {
		marginBottom: 30,
        fontFamily: "MontserratBold",
	},
	dropdown: {
		marginTop: "-7.5%",
		// padding: 5,
		backgroundColor: colors.white,
		borderRadius: 10,
		fontSize: 17,
		borderColor: colors.primaryColor,
		borderWidth: 1,
		width: "80%",
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
		width: "80%",
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
	submitContainer: {
		width: "80%",
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
		fontSize: 18,
		color: colors.white,
        fontFamily: "MontserratBold",
	},
	suffixText: {
		fontSize: 15,
		fontWeight: "400",
		marginRight: 15,
		justifyContent: "center",
		alignItems: "center",
		textAlignVertical: "center",
		// backgroundColor: "red",
		height: "100%",
		position: "absolute",
		right: 0,
        fontFamily: "MontserratBold",
	},
	// logoutIconContainer: {
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// 	borderRadius: 5,
	// },
	// logoutIcon: {
	// 	fontSize: 25,
	// 	marginRight: 10,
	// 	color: colors.white,
	// }
});