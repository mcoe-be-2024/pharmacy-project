import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Button, Alert, TouchableOpacity } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { colors } from '../styles/Colors';
import { auth, firestore } from "../assets/firebase";
import { MaterialIcons } from '@expo/vector-icons';
import drugData from "../assets/drugData.json";
import { useAuth } from "../hooks";

export default function Home({ navigation }) {
	const {currentUser, setCurrentUser} = useAuth();
	const [drugsList, setDrugsList] = useState([]);
	const [drugName, setDrugName] = useState("");
	const [gestationalAge, setGestationalAge] = useState("");
	const [postnatalAge, setPostnatalAge] = useState("");
	const [weight, setWeight] = useState("");
	const [output, setOutput] = useState([]);

	useEffect(() => {
		const tempDrugList = drugData.map((drug) => {
			return (drug["Name of the drug"]);
		})
		setDrugsList([...new Set(tempDrugList)]);
	}, []);

	const drugsDB = firestore.collection("drugs");

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity onPress={handleSignOut}>
					<View style={styles.logoutIconContainer}>
						<MaterialIcons style={styles.logoutIcon} name="logout" />
					</View>
				</TouchableOpacity>
			),
		});
	}, [navigation]);

	useEffect(() => {
		console.log(output)
	}, [output]);

	const handleSignOut = () => {
		auth
			.signOut()
			.then(() => {
				setCurrentUser(null)
			})
			.catch(error => alert(error.message))
	}

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
			navigation.navigate("Output", {drugs: output});
		}
	}, [output]);
	

	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			{/* <Text>User: {currentUser?.name}</Text> */}
			<View style={styles.dropdownContainer}>
				<SelectDropdown
					data={drugsList}
					dropdownStyle={styles.dropdown}
					searchPlaceHolder='Search'
					search='true'
					searchInputStyle={styles.dropdownSearch}
					buttonStyle={styles.dropdownInput}
					defaultButtonText='Just Select'
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
			</View>
			<View style={styles.inputContainer}>
				<TextInput keyboardType='numeric' style={styles.input} value={postnatalAge} onChangeText={(newPostnatalAge) => setPostnatalAge(newPostnatalAge)} />
				<Text style={styles.label}>Postnatal Age</Text>
			</View>
			<View style={styles.inputContainer}>
				<TextInput keyboardType='numeric' style={styles.input} value={weight} onChangeText={(newWeight) => setWeight(newWeight)} />
				<Text style={styles.label}>Weight</Text>
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
	dropdownContainer: {
		marginBottom: 30,
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
	},
	dropdownInput: {
		backgroundColor: colors.white,
		borderRadius: 10,
		height: 50,
		fontSize: 17,
		borderColor: colors.primaryColor,
		borderWidth: 1,
		width: "80%",
	},
	dropdownSearch: {
		width: "100%",
		borderBottomColor: colors.primaryColor,
		borderBottomWidth: 1,
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
	},
	logoutIconContainer: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
	},
	logoutIcon: {
		fontSize: 30,
		color: colors.white,
	}
});