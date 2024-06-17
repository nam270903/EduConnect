import { useNavigation } from '@react-navigation/native';
import { Back } from 'iconsax-react-native';
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput, Alert,  } from 'react-native';
import { FIREBASE_DATABASE } from '../../../FirebaseConfig';
import { set, ref, push } from 'firebase/database';


const AddClasses = () => {
    const navigation = useNavigation<any>();

    const database = FIREBASE_DATABASE;
    
    const [classname, setClassname] = useState('');
    const [subject, setSubject] = useState('');

    const BackButton = () => {
        navigation.navigate("Home");
    }



    const Save = async () => {
        try {
            const classData = {
                classname,
                subject,
            };
            await push(ref(database, 'classes' ), classData);
            Alert.alert('Class saved successfully!');
            navigation.navigate("Home")
            } catch (error) {
            console.error('Error saving class:', error);
        }
    }
  return (
    <View style={styles.container}>
        <KeyboardAvoidingView>

            <TouchableOpacity onPress={BackButton}>
                <Back size={25}/>
            </TouchableOpacity>

            <TextInput 
                placeholder='Class name'
                autoCapitalize='none'
                value={classname} 
                onChangeText={(text) => setClassname(text)}>
            </TextInput>

            <TextInput
                placeholder='Subject'
                autoCapitalize='none'
                value={subject}
                onChangeText={(text) => setSubject(text)}>
            </TextInput>

            <TouchableOpacity onPress={Save}>
                <Text> Save </Text>
            </TouchableOpacity>

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
  });

export default AddClasses;


