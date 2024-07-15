import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../../../FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { onValue, ref, push, set } from 'firebase/database';
import { AddCircle } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';


const NewsFeed = () => {
  const navigation = useNavigation <any> ();

  const auth = FIREBASE_AUTH;
  const database = FIREBASE_DATABASE;

  const [isTeacher, setIsTeacher] = useState(false)


  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
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
  
    return unsubscribeAuth;
  }, [auth, database]);


  const CreatePost = () => {
    navigation.navigate('CreatePost')
  }; 

  
  return (
    <View style={styles.container}>

      {isTeacher && (
        <>
          <TouchableOpacity onPress={CreatePost} style={styles.addButton} >
            <AddCircle color='#0080FF' size='50' variant='Bold' />
          </TouchableOpacity>
        </>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'#ffffff',
    },

    addButton:{
      position:'absolute',
      bottom:20,
      right:20,
    },

    input: {
      marginVertical:4,
      height: 50,
      borderWidth: 1,
      borderRadius: 13,
      padding: 10,
      backgroundColor:'#ffffff',
      fontSize: 15,
      marginHorizontal: 20,
  },

  });

export default NewsFeed;


