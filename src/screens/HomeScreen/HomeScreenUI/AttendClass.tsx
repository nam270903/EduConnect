import { Back } from 'iconsax-react-native';
import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert,  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../../../FirebaseConfig';
import { ref, get, push, update } from 'firebase/database';

const AttendClass = () => {
  const navigation = useNavigation <any> ();
  const database = FIREBASE_DATABASE;
  const auth = FIREBASE_AUTH;
  const [classID, setClassID] = useState('');

  const BackButton = () => {
      navigation.navigate("Home");
  };

  const handleAttendClass = async () => {
    if (!classID) {
      Alert.alert('Please enter a Class ID');
      return;
    }
  
    const classRef = ref(database, `classes/${classID}`);
    const classSnapshot = await get(classRef);
  
    if (!classSnapshot.exists()) {
      Alert.alert('Invalid Class ID');
      return;
    }

    try {
      const userRef = ref(database, `users/${auth.currentUser?.uid}`);
      const userSnapshot = await get(userRef);
      const userID = userSnapshot.val()?.userID;
      const username = userSnapshot.val()?.username;

      try {
        const membersRef = ref(database, `classes/${classID}/members`);
        await update(membersRef, {
          [userID]: true,
          [username]: true
        });
        Alert.alert('Successfully joined the class!');

      } catch (error) {
        Alert.alert('Failed to join the class. Please try again.');
      }

    } catch (error) {
      Alert.alert('An error occurred. Please try again.');
    }

    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.backButton} onPress={BackButton}>
        <Back size={25}/>
        <Text style={styles.return}>Back</Text>
      </TouchableOpacity>    

      <TextInput
        style={styles.input}
        placeholder='Class ID'
        value={classID}
        onChangeText={setClassID}
        placeholderTextColor='#808080'/>

      <TouchableOpacity style={styles.attendButton} onPress={handleAttendClass}>
        <Text style={styles.attendText}>Join Class</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex:1,
      backgroundColor:'#ffffff',
      paddingTop:20,
      paddingHorizontal:10,
    },

    backButton:{
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    
    return:{
      color:'#0080FF',
      textAlign: 'center',
      fontSize: 17,
      padding: 2
    },

    input:{
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

    attendButton:{},

    attendText:{},

  });

export default AttendClass;


