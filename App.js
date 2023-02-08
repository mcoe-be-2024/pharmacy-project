import { StatusBar } from 'expo-status-bar';
import { Text, View, Appearance } from 'react-native';
import { styles } from './styles/Styles';
import {Landing} from './containers/Landing';
import {Login} from './containers/Login';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      {/* <Landing /> */}
      <Login />
    </View>
  );
}
