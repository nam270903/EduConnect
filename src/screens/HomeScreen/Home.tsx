import {View, Text, StyleSheet, Touchable, TouchableOpacity, ScrollView} from 'react-native';
import React, { useState, useEffect } from 'react';
import { AddCircle } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, onValue } from 'firebase/database'; 
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../../FirebaseConfig';

const Home = () => {
    const navigation = useNavigation<any>();

    const database = FIREBASE_DATABASE;
    const auth = FIREBASE_AUTH;

    const [isTeacher, setIsTeacher] = useState (false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            const userRef = ref(database, `users/${user.uid}`); 
            const unsubscribeDatabase = onValue(userRef, (snapshot) => {

              const userData = snapshot.val();
              if (userData && userData.role === 'Teacher') {
                setIsTeacher(true);
              } else {
                setIsTeacher(false);
              }

            });

            return () => unsubscribeDatabase();

          } 
        });

        return unsubscribe; 
      }, []);

    const Add = () => {
        navigation.navigate('AddClasses')
    };

    return (
        <View style={styles.container}>
            
            <TouchableOpacity onPress={Add} style={styles.addButton}>
                <AddCircle 
                    color='#0080FF' 
                    variant='Bold'
                    size={50} />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create ({
    container:{
        flex:1,
        backgroundColor:'#ffffff',
    },

    addButton:{ 
        bottom: 20,
        position:'absolute',
        alignSelf:'flex-end',
        zIndex:1,
        alignItems:'flex-end',
        right:20,
    },
});

export default Home;