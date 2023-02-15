import React from 'react'
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import {colors} from '../styles/Colors';
import { Button } from '../components';
import defaultAvatar from "../assets/default-avatar.jpg";
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export default MyProfile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profilecontainer}>
        <View style={styles.profilecontent}>
          <Image
              style={styles.logo}
              source={defaultAvatar}
          />
          <Text style={styles.name}> Ishaan Vadhan</Text>
          <Text style={styles.userInfo}> ishaanvadhan@gmail.com </Text>
        </View>
      </View>
      <View style={styles.divider} />

      <View style={styles.buttonContainer}>
        <View style={styles.item}>
          <View style={styles.infoContent}>
            <View style={styles.buttonstyle}>
              <Button text={`Edit${"\n"}Profile`}>
                <AntDesign style={styles.buttonIcon} name="profile" /> 
              </Button>
            </View>
          </View>
        </View>

        <View style={styles.item}>
          <View style={styles.infoContent}>
            <View style={styles.buttonstyle}>
                <Button text={`Change${"\n"}Password`}>
                  <MaterialCommunityIcons style={styles.buttonIcon} name="account-key" /> 
                </Button>
            </View>
          </View>
        </View>

        <View style={styles.item}>
          <View style={styles.infoContent}>
            <View style={styles.buttonstyle}>
                <Button text={`Generate${"\n"}Prescription`}>
                  <FontAwesome5 style={styles.buttonIcon} name="notes-medical" /> 
                </Button>
            </View>
          </View>
        </View>
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
    divider: {
      height: 1.5,
      width: "100%",
      backgroundColor: colors.primaryColor,
      marginBottom: 35,
    },
    buttonContainer: {
      flex: 1,
      alignItems: 'center',
      // backgroundColor:'red',
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: 200,
      marginBottom: 20,
    },
    infoContent: {
      // flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonstyle:{
      width: '100%',
    },
    buttonIcon: {
      fontSize: 25,
      color: colors.white,
      marginRight: 26,
    },
    imagestyle:{
        width: '17%',
        //height: '',
        marginBottom: '10%',
        marginTop: '10%',
        marginRight: '3%',
    },
})
