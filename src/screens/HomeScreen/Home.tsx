import { View, Text, StyleSheet, TouchableOpacity, FlatList,} from 'react-native';
import React, { useState, useEffect } from 'react';
import { AddCircle } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../../FirebaseConfig';

interface ClassData {
  classname: string;
  subject: string;
  id: string;
  ownerId: string;
}

const Home = () => {
  const navigation = useNavigation <any> ();
  const database = FIREBASE_DATABASE;
  const auth = FIREBASE_AUTH;

  const [isTeacher, setIsTeacher] = useState(false);
  const [classes, setClasses] = useState<ClassData[]>([]);

  const filterClasses = (fetchedClasses: any) => {
    const classData: ClassData[] = [];
    if (!fetchedClasses) return classData;

    Object.entries(fetchedClasses).forEach(([classId, classDetails]) => {
      if (classDetails.ownerId === auth.currentUser?.uid) {
        classData.push({
          ...(classDetails as ClassData),
          id: classId,
        });
      }
    });

    return classData;
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in:", user.uid);
        const userRef = ref(database, `users/${user.uid}`);

        const unsubscribeDatabase = onValue(userRef, (snapshot) => {
          const userData = snapshot.val();
          console.log("User data:", userData);

          if (userData && userData.role === 'Teacher') {
            setIsTeacher(true);
          } else {
            setIsTeacher(false);
          }
        });

        const classRef = ref(database, 'classes');
        const unsubscribeClasses = onValue(classRef, (snapshot) => {
          const fetchedClasses = snapshot.val() || {};
          console.log("Fetched classes:", fetchedClasses);

          const filtered = filterClasses(fetchedClasses);
          console.log("Filtered classes:", filtered);

          setClasses(filtered);
        });

        return () => {
          unsubscribeDatabase();
          unsubscribeClasses();
        };
      }
    });

    return () => {
      if (unsubscribeAuth) {
        unsubscribeAuth();
      }
    };
  }, [auth, database]);

  const Add = () => {
    navigation.navigate('AddClasses');
  };

  const InsideClass = () => {
    navigation.navigate('ClassInfo')
  }

  return (
    <View style={styles.container}>
      {classes.length === 0 ? (
        <Text>No classes found.</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={classes}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={InsideClass} style={styles.listItem}>
              <Text>Class Name: {item.classname}</Text>
              <Text>Subject: {item.subject}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      )}

      {isTeacher && (
        <TouchableOpacity onPress={Add} style={styles.addButton}>
          <AddCircle color='#0080FF' variant='Bold' size={50} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  addButton: {
    bottom: 20,
    position: 'absolute',
    alignSelf: 'flex-end',
    zIndex: 1,
    alignItems: 'flex-end',
    right: 20,
  },
  list: {
    flex: 1,
    paddingHorizontal: 10,
  },
  listItem: {
    borderWidth: 1,
    borderRadius: 13,
    padding: 10,
    flexDirection: 'column',
    marginTop: 20,
  },
});

export default Home;
