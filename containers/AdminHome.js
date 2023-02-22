import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, ScrollView, View, Image, TouchableOpacity, Modal } from 'react-native';
import {colors} from '../styles/Colors';
import {Button} from '../components';
import logo from '../assets/logo.png';
import SelectDropdown from 'react-native-select-dropdown';
// import Modal from "react-native-modal";
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { auth, firestore } from "../assets/firebase";
import drugData from "../assets/drugData.json";

export default AdminHome = ({route, navigation}) => {
	const [drugsList, setDrugsList] = useState([]);
	const [drugName, setDrugName] = useState("Select a drug to view");
	const [searchDrug, setSearchDrug] = useState("");
	const [drugsNamesList, setDrugsNamesList] = useState([]);
	const drugsDB = firestore.collection("drugs");
	const [deleteModal, setDeleteModal] = useState(false);
	const [deleteDrug, setDeleteDrug] = useState("");

    useEffect(() => {
        const focusHandler = navigation.addListener("focus",() => {
            setDrugName("Select a drug to view");
            const drugs = [];
            drugsDB
            .orderBy("Name of the drug")
            // .where("Name of the drug", "==", drugName)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var drug = doc.data();
                    if (!drugs.includes(drug["Name of the drug"])) {
                        drugs.push(drug["Name of the drug"]);
                    }
                })
            })
            .then(() => {
                setDrugsNamesList(drugs);
            })
            .catch((error) => {
                alert(error);
            });
        });

        return focusHandler;
	}, [navigation]);

    useEffect(() => {
        const drugs = [];
        drugsDB
        // .orderBy("Name of the drug")
        .where("Name of the drug", "==", drugName)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(doc.data());
                var drug = doc.data();
                drug.id = doc.id;
                drugs.push(drug);
                // drugs.push(doc.data())
            })
        })
        .then(() => {
            setDrugsList(drugs);
        })
        .catch((error) => {
            alert(error);
        });
    }, [drugName]);
    
    const GestationalAge = ({lower, upper}) => {
        if (lower || upper) {
            if (upper === 100 || !upper) {
                return (<>
                    <Text style={styles.subtitleLabel}>Gestational age:</Text>
                    <Text style={styles.subtitle}>Greater than {lower} weeks</Text>
                </>
                );
            }
            else if (lower === 0 || !lower) {
                return (<>
                    <Text style={styles.subtitleLabel}>Gestational age:</Text>
                    <Text style={styles.subtitle}>Less than {upper} weeks</Text>
                </>
                );
            }
            if (lower && upper) {
                return (<>
                    <Text style={styles.subtitleLabel}>Gestational age:</Text>
                    <Text style={styles.subtitle}>{lower} to {upper} weeks</Text>
                </>
            );   
        }
        }
        else if (!lower && !upper) {
            return null;   
        }
    }

    const PostnatalAge = ({lower, upper}) => {
        if (lower || upper) {
            if (upper === 500 || !upper) {
                return (<>
                    <Text style={styles.subtitleLabel}>Postnatal age:</Text>
                    <Text style={styles.subtitle}>Greater than {lower} days</Text>
                </>
                );
            }
            else if (lower === 0 || !lower) {
                return (<>
                    <Text style={styles.subtitleLabel}>Postnatal age:</Text>
                    <Text style={styles.subtitle}>Less than {upper} days</Text>
                </>
                );
            }
            if (lower && upper) {
                return (<>
                    <Text style={styles.subtitleLabel}>Postnatal age:</Text>
                    <Text style={styles.subtitle}>{lower} to {upper} days</Text>
                </>
            );   
        }
        }
        else if (!lower && !upper) {
            return null;   
        }
    }
    
    const Condition = ({condition}) => {
        if (condition) {
            return (<>
                <Text style={styles.subtitleLabel}>Condition:</Text>
                <Text style={styles.subtitle}>{condition}</Text>
            </>
            );   
        }
        else if (!condition) {
            return null;   
        }
    }
    
    const InfusionRate = ({infusion}) => {
        if (infusion) {
            return (<>
                <Text style={styles.subtitleLabel}>Infusion rate:</Text>
                <Text style={styles.subtitle}>{infusion}</Text>
            </>
            );   
        }
        else if (!infusion) {
            return null;   
        }
    }
    
    const SolutionComp = ({sol}) => {
        if (sol) {
            return (<>
                <Text style={styles.subtitleLabel}>Solution compatibility:</Text>
                <Text style={styles.subtitle}>{sol}</Text>
            </>
            );   
        }
        else if (!sol) {
            return null;   
        }
    }

    const Dose = ({lower, upper, unit, dose, roa, freq}) => {
        if (lower || upper) {
            if (!upper) {
                return (<>
                    <Text style={styles.subtitleLabel}>Dose:</Text>
                    <Text style={styles.subtitle}>{lower} {unit}/{dose} {roa} {freq}</Text>
                </>
                );
            }
            if (lower && upper) {
                return (<>
                    <Text style={styles.subtitleLabel}>Dose:</Text>
                    <Text style={styles.subtitle}>{lower} to {upper} {unit}/{dose} {roa} {freq}</Text>
                </>
            );   
        }
        }
        else if (!lower && !upper) {
            return null;   
        }
    }

    const searchFor = (term) => {
        return function(x) {
            return x["Name of the drug"].toLowerCase().includes(term.toLowerCase()) || !term ;
        }
    }

    // useEffect(() => {
    //     if(deleteDrug !== "") {
    //         setDeleteModal(true);
    //     }
    //     else {
    //         setDeleteModal(false);
    //     }
    // }, [deleteDrug]);
    
    return (
        <>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.inputButton} onPress={() => navigation.navigate("AdminNewEntry")}>
                    <Text style={styles.inputButtonText}>Add new entry</Text>
                </TouchableOpacity>
                <View style={styles.dropdownContainer}>
                    <SelectDropdown
                        data={drugsNamesList}
                        dropdownStyle={styles.dropdown}
                        searchPlaceHolder="Search"
                        search="true"
                        searchInputStyle={styles.dropdownSearch}
                        buttonStyle={styles.dropdownInput}
                        buttonTextStyle={styles.dropdownText}
                        rowTextStyle={styles.dropdownText}
                        defaultButtonText="Select a drug to view"
                        renderDropdownIcon={() => {return <Entypo style={styles.dropdownIcon} name="chevron-thin-down" />} }
                        renderSearchInputRightIcon={() => {return <Fontisto style={styles.dropdownIcon} name="search" />} }
                        onSelect={(selectedItem, index) => {
                            setDrugName(selectedItem)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return drugName //selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                </View>
            </View>
            {/* <View style={styles.inputContainer}>
				<TextInput style={styles.input} value={searchDrug} onChangeText={(newSearchDrug) => setSearchDrug(newSearchDrug)} />
			</View> */}
            {(drugsList.length ? true : false) &&
                <Text style={styles.title}>List of drugs</Text>
            }
            {drugsList.filter(searchFor(searchDrug)).map((drug, index) => {
                return (
                    <View style={styles.contentContainer} key={index}>
                        <Text style={styles.subtitleLabel}>Name of the drug:</Text>
                        <Text style={styles.subtitle}>{drug["Name of the drug"]}</Text>
                        <GestationalAge lower={drug["Lower Gestational age"]} upper={drug["Upper Gestational age"]} />
                        <PostnatalAge lower={drug["Lower Postnatal age"]} upper={drug["Upper Postnatal age"]} />
                        <Condition condition={drug["Condition"]} />
                        <Dose lower={drug["Min Dose"]} upper={drug["Max Dose"]} unit={drug["Unit"]} dose={drug["Dose/Days"]} roa={drug["ROA"]} freq={drug["Frequency"]} />
                        <InfusionRate infusion={drug["Infusion rate"]} />
                        <SolutionComp sol={drug["solution compatability"]} />
                        <View style={styles.divider} />
                        <View style={styles.editContainer} >
                            <TouchableOpacity style={styles.editButton} >
                                <Text style={styles.editText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => setDeleteModal(true)}> 
                                <Text style={styles.editText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>);
            })}
                <Modal
                    animationType="fade"
                    transparent
                    visible={deleteModal} 
                    onRequestClose={() => setDeleteModal(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modal}>
                            <Text style={styles.confirmText}>Are you sure you want {`\n`} to delete this entry?</Text>
                            <View style={styles.divider} />
                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity style={styles.modalButton} onPress={() => setDeleteModal(false)}>
                                    <Text style={styles.editText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalButtonDanger} onPress={() => setDeleteModal(false)}>
                                    <Text style={styles.editText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View> 
                </Modal>
        </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    inputButton: {
        backgroundColor: colors.primaryColor,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 6,
        marginTop: 10,
        width: "80%",
    },
    inputButtonText: {
        color: colors.white,
        fontFamily: "MontserratBold",
        fontSize: 17,
        width: "100%",
        textAlign: "center",
    },
    modal: {
        backgroundColor: colors.white,
        borderRadius: 7,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "90%",
        width: "70%",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000bb",
    },
    modalButtonContainer: {
        flexDirection: "row",
        width: "80%",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 5,
		// backgroundColor: "blue",

    },
    modalButton: {
		backgroundColor: colors.primaryColor,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 5,
        // marginHorizontal: 15,
    },
    modalButtonDanger: {
		backgroundColor: colors.danger,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 5,
        // marginHorizontal: 15,
    },
    confirmText: {
        fontFamily: "MontserratBold",
        fontSize: 15,
        textAlign: "center",
        // marginBottom: 5,
    },
    inputContainer: {
		width: "100%",
        justifyContent: "center",
        alignItems: "center",
		// marginVertical: 10,
		flexDirection: "column",
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
		marginVertical: 10,
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
    divider: {
        height: 1.5,
        width: "95%",
        backgroundColor: colors.grey,
        marginVertical: 13,
    },
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
        marginBottom: 20,
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
    editContainer: {
		width: "95%",
        flexDirection: "row",
        justifyContent: "flex-end",
	},
	editButton: {
		marginRight: 10,
		backgroundColor: colors.primaryColor,
		paddingVertical: 5,
        paddingHorizontal: 10,
		borderRadius: 7,
	},
	deleteButton: {
		marginRight: 10,
		backgroundColor: colors.danger,
		paddingVertical: 5,
        paddingHorizontal: 10,
		borderRadius: 7,
	},
	editText: {
		textAlign: "center",
		justifyContent: "center",
		fontSize: 15,
		color: colors.white,
        fontFamily: "MontserratBold",
	},
});