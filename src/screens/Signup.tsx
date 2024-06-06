import React, {useState} from 'react';
import { Text, View, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Button, Alert, KeyboardAvoidingView } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { set, ref } from 'firebase/database';

const Signup = () => {
    const navigation = useNavigation();
    const auth = FIREBASE_AUTH;
    const database = FIREBASE_DATABASE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const signUp = async () => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword (auth, email, password);
            const uid = userCredential.user.uid;
            const userData = {
                email: email,
                password: password,
                username: username,
                phone: phone,
            };
            await set(ref(database, 'users/' + uid), userData);

        } catch (error:any) {
            console.error ('Sign up error: ', error);
            Alert.alert ('Sign up error with: ', error.message);

        } finally {
            setLoading(false);
        }
    };

    const Signin = () => {
        navigation.navigate('Signin'); 
    };

    const toggleShowPassword = async () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='padding'>

                <TextInput
                    style = {styles.input}
                    value = {email}
                    placeholder='Email'
                    autoCapitalize='none'
                    onChangeText={(text) => setEmail(text)}>
                </TextInput>

                <TextInput
                    style = {styles.input}
                    value = {username}
                    placeholder='Your full name'
                    autoCapitalize = 'characters'
                    onChangeText={(text) => setUsername(text)}>
                </TextInput>

                <TextInput
                    style = {styles.input}
                    value = {phone}
                    placeholder='Phone Number'
                    onChangeText={(text) => setPhone(text)}>
                </TextInput>

                <TextInput
                    style = {styles.input}
                    value = {password}
                    placeholder='Password'
                    secureTextEntry = {!showPassword}
                    autoCapitalize='none'
                    onChangeText={(text) => setPassword(text)}>
                </TextInput>

                {
                    loading ? (<ActivityIndicator/>) : (
                        <>
                            <TouchableOpacity onPress={toggleShowPassword}>
                                <Text style = {styles.showPasswordButton}>
                                    {showPassword ? 'Hide password' : 'Show password'}
                                </Text>
                            </TouchableOpacity>

                            <Button title='Sign Up' onPress={signUp}></Button>

                            
                            <TouchableOpacity onPress={Signin}>
                                <Text style={styles.signInButton}> Sign In</Text>
                            </TouchableOpacity>

                        </>
                    )
                }
            </KeyboardAvoidingView>
        </View>
    )
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
        borderRadius: 13,
        padding: 10,
        backgroundColor:'#fff',
        fontSize: 15
    },
    showPasswordButton: {
        marginLeft: '69%',
        color: '#808080',
        textDecorationLine: 'underline',
        fontSize: 14,
        marginVertical: 10,
    },
    signInButton: {
        textAlign: 'center',
        marginTop: 10,
        color: '#0080FF', 
        fontSize: 20
    }
  });

export default Signup;