import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Landing, LoginType, RegisterType, Login, Register, Home, Output, Profile, MyProfile } from '../containers';
import { drawerHeaderStyles, headerStyles } from '../styles/HeaderStyles';
import { useAuth } from "../hooks";
import { auth, firestore } from "../assets/firebase";
import { colors } from '../styles/Colors';

function DrugsNavigator() {
    const Drugs = createNativeStackNavigator();

    return (
        <Drugs.Navigator screenOptions={drawerHeaderStyles} >
            <Drugs.Screen name="Home" component={Home} options={{headerShown: false}} />
            <Drugs.Screen name="Output" component={Output} options={{title: "Prescription", headerShown: false}} />
        </Drugs.Navigator>
    );
}

function DrawerNavigator() {
    const Drawer = createDrawerNavigator();
	const {currentUser, setCurrentUser} = useAuth();

    const handleSignOut = () => {
		auth
			.signOut()
			.then(() => {
				setCurrentUser(null)
			})
			.catch(error => alert(error.message))
	}

    return (
        <Drawer.Navigator screenOptions={{...drawerHeaderStyles, title: "Home", headerRight: () => (
				<TouchableOpacity onPress={handleSignOut}>
					<View style={styles.logoutIconContainer}>
						<MaterialIcons style={styles.logoutIcon} name="logout" />
					</View>
				</TouchableOpacity>
			),}} >
            <Drawer.Screen name="Drugs" component={DrugsNavigator} />
            {/* <Drawer.Screen name="Profile" component={Profile} options={{title: "My Profile"}} /> */}
            <Drawer.Screen name="Profile" component={MyProfile} options={{title: "My Profile"}} />
            {/* <Drawer.Screen name="EditProfile" component={EditProfile} options={{title: "My EditProfile"}} /> */}
        </Drawer.Navigator>
    );
}

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
                <Stack.Screen name="Home Drawer" component={DrawerNavigator} options={{headerShown: false}} />
                {/* <Stack.Screen name="Output" component={Output} options={{title: "Prescription"}} /> */}
                </>
            )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    logoutIconContainer: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
	},
	logoutIcon: {
		fontSize: 25,
		marginRight: 12,
		color: colors.white,
	}
});