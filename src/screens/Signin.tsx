import React, {useState} from 'react';
import { Text, View, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Button, Alert, KeyboardAvoidingView } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword,} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Signin = () => {
    const navigation = useNavigation<any>(); 
    const auth = FIREBASE_AUTH;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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
    };

    const Signup = () => {
        navigation.navigate('Signup'); 
    };

    const toggleShowPassword = async () => {
        setShowPassword(!showPassword);
    };

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
                    secureTextEntry = {!showPassword} 
                    value = {password} 
                    placeholder ='Password' 
                    onChangeText={(text) => setPassword(text) }>
                </TextInput>

                {
                    loading ? (<ActivityIndicator/>) : (
                        <>
                            <TouchableOpacity onPress={toggleShowPassword}>
                                <Text style={styles.showPasswordButton}>
                                    {showPassword ? 'Hide password' : 'Show password'}
                                </Text>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={signIn}>
                                <View style={styles.signInButton}>
                                <Text style={styles.signInButtonText}> Sign In</Text>
                                </View>
                            </TouchableOpacity>


                            <View style={styles.one}>
                                <Text style={styles.two}> Dont have an account ?</Text>
                                <TouchableOpacity onPress={Signup}>
                                    <Text style={styles.signUpButton}> Sign Up</Text>
                                </TouchableOpacity>
                            </View>
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
        justifyContent: 'center',
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
    signUpButton: {
        textAlign: 'center',
        marginTop: 10,
        color: '#0080FF', 
        fontSize: 17,
        textDecorationLine: 'underline',
        
    },

    signInButton: {
        height: 50,
        padding: 15,
        backgroundColor:'#0080FF',
        borderRadius:13,
    },

    signInButtonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 17,
        fontWeight:'bold'
    },

    one: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10
    },

    two: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 17
    }
});

export default Signin;


