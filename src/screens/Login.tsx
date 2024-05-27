import React, {useState} from 'react';
import { Text, View, StyleSheet, TextInput, ActivityIndicator, Button, Alert, KeyboardAvoidingView } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const navigation = useNavigation
    const auth = FIREBASE_AUTH;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const signIn = async () =>{
        setLoading(true);
        try {
            const respond = await signInWithEmailAndPassword (auth, email, password);
            console.log(respond);
        } catch (error: any) {
            console.log(error);
            Alert.alert('Sign in fail: ', error.message);
        } finally {
            setLoading(false);
        }
    }

    const signUp = async () =>{
        setLoading(true);
        try {
            const respond = await createUserWithEmailAndPassword (auth, email, password);
            console.log(respond);
        } catch (error: any) {
            console.log(error);
            Alert.alert('Sign up fail: ', error.message);
        } finally {
            setLoading(false);
        }
    }

  return (
    <View style={styles.container}>
        <KeyboardAvoidingView behavior='padding'>
            {/* Email */}
            <TextInput 
                style={styles.input} 
                value = {email} 
                placeholder ='Email' 
                autoCapitalize ='none' 
                onChangeText={(text) => setEmail(text)}> 
            </TextInput>

            {/* Password */}
            <TextInput 
                style={styles.input} 
                secureTextEntry = {true} 
                value = {password} 
                placeholder ='Password' 
                onChangeText={(text) => setPassword(text) }>
            </TextInput>

            {/* What if internet slow ? 
                If true -> Loading icon show up 
                If false -> Buttons show up */}

            {
                loading ? (
                    <ActivityIndicator/>
                ) : (
                    <>
                    <Button title='Sign In' onPress={signIn}></Button>
                    <Button title='Sign Up' onPress={signUp}></Button>
                    </>
                )
            }       
        </KeyboardAvoidingView> 
        </View>
  );
};

const styles = StyleSheet.create({
    container: {
      marginHorizontal: 20,
      flex: 1,
      justifyContent: 'center'
    },
    input: {
      marginVertical:4,
      height: 50,
      borderWidth: 1,
      borderRadius: 4,
      padding: 10,
      backgroundColor:'#fff'
    }
  });

export default Login;


