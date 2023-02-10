import React, { useState,useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, View, Appearance } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from './styles/Styles';
import { headerStyles } from './styles/HeaderStyles';
import {Landing} from './containers/Landing';
import {Login} from './containers/Login';
import {Register} from './containers/Register';
import {LoginType} from './containers/LoginType';
import {RegisterType} from './containers/RegisterType';
import {Home} from './containers/Home';
import { auth } from "./firebase";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const isSignedIn = auth.onAuthStateChanged((user) => {
      if(user) {
        setCurrentUser(user);
      }
      else {
        setCurrentUser(null);
      }
    })
  }, [auth]);

  return (
    <>
      {/* <StatusBar style="auto" /> */}
      <NavigationContainer>
        <Stack.Navigator screenOptions={headerStyles}>
          {(!currentUser) ? (
            <>
              <Stack.Screen name="Landing" component={Landing} />
              <Stack.Screen name="LoginType" component={LoginType} options={{title: "Login"}} />
              <Stack.Screen name="RegisterType" component={RegisterType} options={{title: "Registration"}} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} options={{title: "Registration"}} />
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={Home} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
