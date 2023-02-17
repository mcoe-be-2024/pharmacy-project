import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, TextInput, View, Image,TouchableOpacity } from 'react-native';
import {colors} from '../styles/Colors';
import defaultAvatar from "../assets/default-avatar.jpg";
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { firestore, updateUserDocument } from "../assets/firebase";
import { useAuth } from "../hooks";

export default EditProfile = ({navigation}) => {
  const [name, setName] = useState("");
  const usersDB = firestore.collection("users");
  const {currentUser} = useAuth();

  const focusHandler = navigation.addListener("focus",() => {return})

  const updateProfile = () => {
    usersDB
    .where("email", "==", currentUser?.email)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log("user fetched in edit: ",doc?.data()?.name)
        updateUserDocument(doc.id, {name: name})
        .then(() => {
          alert("Profile updated successfully!");
          navigation.navigate("Profile");
        })
      })
    })
    .catch((error) => {
      alert(error);
    });
  }


  return (
    <View style={styles.container}>
      <View style={styles.profilecontainer}>
        <View style={styles.profilecontent}>
          <Image
              style={styles.logo}
              source={defaultAvatar}
          />
          {/* <Text style={styles.name}> Ishaan Vadhan</Text>
          <Text style={styles.userInfo}> ishaanvadhan@gmail.com </Text> */}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={name} onChangeText={(newName) => setName(newName)} />
        <Text style={styles.label}>Name</Text>
      </View>
      <View style={styles.submitContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={updateProfile}>
          <Text style={styles.submitText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
      flex: 1,
      backgroundColor: '#84DCC8',
      alignItems: 'center',
      // justifyContent: 'center',
  },
  profilecontainer: {
      paddingTop: 20,
      alignItems: 'center',
      // backgroundColor: '#FFFDD0', //End me comment karo
      width: '100%',
      // height: '50%',
  },
  profilecontent: {
    padding: 25,
    alignItems: 'center',
  },
  logo:{
      width: 200,
      height: 200,
      borderRadius:100,
      borderWidth: 2,
      borderColor: colors.primaryColor,
      marginBottom: 15,
      backgroundColor: '#F5FFFA',
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
    fontFamily: "Montserrat",
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
  name: {
    fontSize: 22,
    color: '#000000',
    fontFamily: "MontserratThick",
    marginBottom: 5,
  },
  userInfo: {
    fontSize: 16,
    color: '#000000',
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
})
