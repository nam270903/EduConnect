import { useNavigation } from '@react-navigation/native';
import { Back } from 'iconsax-react-native';
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput, Alert,  } from 'react-native';
import { FIREBASE_DATABASE } from '../../../../FirebaseConfig';
import { FIREBASE_AUTH } from '../../../../FirebaseConfig';
import { set, ref, push } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth'; 

const AddClasses = () => {
    const navigation = useNavigation <any> ();

    const database = FIREBASE_DATABASE;
    const auth = FIREBASE_AUTH;

    const [classname, setClassname] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');


    const BackButton = () => {
      navigation.navigate("Home");
    }

    const Save = async () => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        const ClassRef = push(ref(database, 'classes'));
        const classID = ClassRef.key;
        const classData = {
          classname,
          subject,
          description,
          ownerId: currentUser?.uid, 
          classID
        };

        push(ref(database, 'classes'), classData)
          .then(() => {
            Alert.alert('Class saved successfully!');
            navigation.navigate('Home');
          })
          .catch((error) => {
            console.error('Error saving class:', error);
          });

        unsubscribe();
      });
    };

  return (
    <View style={styles.container}>
        <KeyboardAvoidingView>

            <TouchableOpacity style={styles.backButton} onPress={BackButton}>
              <Back size={25}/>
              <Text style={styles.return}>Back</Text>
            </TouchableOpacity>

            <TextInput 
                style = {styles.input}
                placeholder='Class name'
                autoCapitalize='none'
                value={classname} 
                onChangeText={(text) => setClassname(text)}
                placeholderTextColor='#808080'>
            </TextInput>

            <TextInput
                style = {styles.input}
                placeholder='Subject'
                autoCapitalize='none'
                value={subject}
                onChangeText={(text) => setSubject(text)}
                placeholderTextColor='#808080'>
            </TextInput>

            <TextInput
                style = {styles.input}
                placeholder='Description'
                autoCapitalize='none'
                value={description}
                onChangeText={(text) => setDescription(text)}
                placeholderTextColor='#808080'>
            </TextInput>

            <View style={styles.saveContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={Save}>
                  <Text style={styles.saveText} >Save</Text>
              </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
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

  input: {
    marginVertical:5,
    height: 50,
    borderWidth: 1,
    borderRadius: 13,
    padding: 10,
    backgroundColor:'#fff',
    fontSize: 15
},

  saveContainer:{
    flex: 1, 
    paddingVertical:10,
  },

  saveButton:{
    height: 50,
    padding: 15,
    backgroundColor:'#0080FF',
    borderRadius:13,
  },

  saveText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 17,
    fontWeight:'bold'
  },
});

export default AddClasses;


