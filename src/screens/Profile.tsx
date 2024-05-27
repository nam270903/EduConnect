import { Text, View, StyleSheet, TextInput, ActivityIndicator, Button, Alert, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

const Profile = ({ navigation}: any) =>{

    return (
        <View style = {styles.container} >
            <Button title='Sign Out' onPress= {() => FIREBASE_AUTH.signOut()}></Button>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      marginHorizontal: 20,
      flex: 1,
      justifyContent: 'center'
    }
  });

export default Profile;