import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { FIREBASE_DATABASE } from '../../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { Back } from 'iconsax-react-native';
import { useState } from 'react';


const ClassInfo = () => {
    const navigation = useNavigation <any> ();

    const database = FIREBASE_DATABASE;
    const auth = FIREBASE_AUTH;
    const [students, setStudents] = useState('')
 
    const BackButton = () => {
        navigation.navigate("Home");
    };


  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={BackButton}>
            <Back size={25}/>
            <Text style={styles.return}>Back</Text>
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
  });
  
export default ClassInfo;
