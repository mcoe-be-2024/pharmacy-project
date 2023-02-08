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
import {Test} from './containers/Test';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      {/* <StatusBar style="auto" /> */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing" screenOptions={headerStyles}>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="LoginType" component={LoginType} options={{title: "Login"}} />
          <Stack.Screen name="RegisterType" component={RegisterType} options={{title: "Registration"}} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} options={{title: "Registration"}} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
