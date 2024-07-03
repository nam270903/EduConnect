import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Animated,} from 'react-native';
import React, { useState, useEffect } from 'react';
import { AddCircle } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../../FirebaseConfig';
import Clipboard from '@react-native-clipboard/clipboard';

interface ClassData {
  classname: string;
  subject: string;
  id: string;
  ownerId: string;
  members?: string;
}

const Home = () => {
  const navigation = useNavigation <any> ();
  const database = FIREBASE_DATABASE;
  const auth = FIREBASE_AUTH;

  const [isTeacher, setIsTeacher] = useState(false);
  const [classes, setClasses] = useState<ClassData[]>([]);

  const [joinClassIcon] = useState(new Animated.Value(40));
  const [addClassIcon] = useState(new Animated.Value(40));
  const [pop, setPop] = useState(false);

  const copy = (classID: string) => {
    Clipboard.setString(classID);
    Alert.alert('Class ID has been copied to clipboard.');
  };

  const popIn = () => {
    setPop(true);
    Animated.timing(joinClassIcon, {
      toValue: 70,
      duration:500,
      useNativeDriver:false
    }).start();
    Animated.timing(addClassIcon, {
      toValue: 70,
      duration:500,
      useNativeDriver:false
    }).start();
  }

  const popOut = () => {
    setPop(false);
    Animated.timing(joinClassIcon, {
      toValue: 40,
      duration:500,
      useNativeDriver:false
    }).start();

    Animated.timing(addClassIcon, {
      toValue: 40,
      duration:500,
      useNativeDriver:false
    }).start();
  }
  
  const filterClasses = (fetchedClasses: Object | {}) => {
    const classData: ClassData[] = [];
    if (!fetchedClasses) return classData;

    return Object.entries(fetchedClasses).filter(([classID, classDetails]) => {
      const isOwner = classDetails.ownerId === auth.currentUser?.uid;
      const isMember = classDetails.members && classDetails.members[auth.currentUser?.uid ?? ''];

      return isOwner || isMember;

    }).map(([classId, classDetails]) => {
      return {
        ...classDetails,
        id: classId,
      };
    });
  };

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

        const classRef = ref(database, 'classes');
        const unsubscribeClasses = onValue(classRef, (snapshot) => {
          const fetchedClasses = snapshot.val() || {};

          const filtered = filterClasses(fetchedClasses);

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


  const AddClass = () => [
    navigation.navigate('AddClasses')
  ];

  const InsideClass = () => {
    navigation.navigate('ClassInfo')
  };

  const AttendClass =()=>{
    navigation.navigate('AttendClass')
  };

  return (
    <View style={ styles.container}> 

      {classes.length === 0 ? (
        <Text style={styles.noClass}> No class found </Text>
      ) : (
        <FlatList
        style = {styles.list}
        data={classes}
        renderItem={({item}) => (
          <TouchableOpacity 
            style={styles.listItem} 
            onPress={InsideClass} 
            onLongPress={() => copy(item.id)}>
              <Text>Class name: {item.classname}</Text>
              <Text>Subject: {item.subject}</Text>
              <Text>Class ID: {item.id}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}/>
      )}

      {pop && (
        <>
          <Animated.View style={[styles.addButton, { right: joinClassIcon }]}>
            <TouchableOpacity style={styles.textContainer} onPress={AttendClass}>
              <Text style={styles.text}>Attend Class</Text>
            </TouchableOpacity>
          </Animated.View>

          {isTeacher && (
            <Animated.View style={[styles.addButton, { bottom: addClassIcon, right:addClassIcon }]}>
              <TouchableOpacity style={styles.textContainer} onPress={AddClass}>
                <Text style={styles.text}> Create Class</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </>
      )}

      <TouchableOpacity onPress={() => {
        pop === false ? popIn() : popOut();
      }}
        style={styles.addButton}>
        <AddCircle color='#0080FF' size='50' variant='Bold' />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ffffff'
  },

  addButton:{
    position:'absolute',
    bottom:20,
    right:20,
  },

  noClass:{
    textAlign:'center',
    paddingVertical: '50%',
    fontSize:15,
    fontWeight:'bold'
  },
  
  list:{
    marginHorizontal:10,
    marginTop:20,
    flex:1,
  },

  listItem:{
    padding:10,
    borderWidth:1,
    borderRadius:13,
    marginTop:20,
    flexDirection:'column',
  },

  textContainer:{
    borderWidth:1,
    height:30,
    justifyContent:'center',
    width:120,
    borderRadius: 13
  },

  text:{
    fontSize:15,
    textAlign:'center',
  },
});

export default Home;
