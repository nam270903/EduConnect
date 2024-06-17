import {View, Text, StyleSheet, Touchable, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import React, { useState, useEffect } from 'react';
import { AddCircle } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, onValue, child } from 'firebase/database'; 
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../../FirebaseConfig';

interface ClassData {
  classname: string;
  subject: string;
  id: string
}

const Home = () => {
    const navigation = useNavigation<any>();

    const database = FIREBASE_DATABASE;
    const auth = FIREBASE_AUTH;

    const [isTeacher, setIsTeacher] = useState (false);
    const [classes, setClasses] = useState <ClassData[]> ([]);

  useEffect(() => {
    const classRef = ref(database, 'classes'); 
    const unsubscribe = onValue(classRef, (snapshot) => {
      const fetchedClasses = snapshot.val() || {};
      const classData: ((prevState: ClassData[]) => ClassData[]) | any[] = [];

      // Loop through classIds and extract data
      Object.entries(fetchedClasses).forEach(([classId, classDetails]) => {
        classData.push({
          ...(classDetails as ClassData), 
          id: classId, 
        });
      });

      setClasses(classData);
    });
    return unsubscribe;
  }, [database]);
  

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
          {classes.length === 0 ? (
            <Text>No classes found.</Text>
          ) : (
            <FlatList
              style={styles.list}
              data={classes}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.listItem}>
                    <Text>Class Name: {item.classname}</Text>
                    <Text>Subject: {item.subject}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id || Math.random().toString()}
            />
          )}

          {isTeacher && (
            <TouchableOpacity onPress={Add} style={styles.addButton}>
                <AddCircle 
                    color='#0080FF' 
                    variant='Bold'
                    size={50} />
            </TouchableOpacity>
          )}        
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

  list:{
    flex:1,
    paddingHorizontal:10,
  },

  listItem:{
    borderWidth:1,
    borderRadius:13,
    padding: 10,
    flexDirection: 'column', 
    marginTop:20,
  },
});

export default Home;
