import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import { FIREBASE_DATABASE } from '../../../FirebaseConfig';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { ref, onValue, push, update, remove } from 'firebase/database';

interface UserData {
  username?: string;
  role?: string;
  phone?: string;
  email?: string;
  password?: string; // Will need to be encrypted
}

const Profile = () =>{
  const [userData, setUserData] = useState <UserData> ({});

  useEffect(() => {
    const userId = FIREBASE_AUTH.currentUser?.uid;
    if (userId) {
      const unsubscribe = onValue(ref(FIREBASE_DATABASE, `users/${userId}`), (snapshot) => {
        const data = snapshot.val();
        setUserData(data || {});
      });
      return () => unsubscribe(); 
    }
  },[]);

  return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView>
          {userData ? ( 
            <>
              <TouchableOpacity style={styles.items}>
                <Text>Username</Text>
                <Text>{userData.username}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.items}>
                <Text>Role</Text>
                <Text>{userData.role}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.items}>
                <Text>Phone Number</Text>
                <Text>{userData.phone}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.items}>
                <Text>Email</Text>
                <Text>{userData.email}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.items}>
                <Text>Password</Text>
                <Text>{userData.password}</Text> 
              </TouchableOpacity>
            </>
          ) : (
            <Text> Loading profile data </Text>
          )}
          <View style={styles.signOutContainer}>
            <TouchableOpacity style={styles.signOutButton} onPress={() => FIREBASE_AUTH.signOut()}>
              <Text style={styles.signOutText}>Sign out</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
  );
};


const styles = StyleSheet.create({
    container: {
      paddingTop:40,
      flex:1,
      backgroundColor:'#ffffff'
    },

    signOutButton: {
      height: 50,
      padding: 15,
      backgroundColor:'#FF0000',
      borderRadius:13,
    },

    signOutText: {
      color: '#ffffff',
      textAlign: 'center',
      fontSize: 17,
      fontWeight:'bold'
    },

    signOutContainer: {
      flex: 1, 
      justifyContent: 'flex-end', 
      paddingBottom: 20, 
    },

    items:{
      justifyContent:'space-between',
      flexDirection:'row',
      backgroundColor:'#ffffff',
      borderWidth:1,
      padding: 15,        
      borderRadius: 13,
      marginVertical: 5,
      height: 50,
      fontSize:15,
    },
  });

export default Profile;