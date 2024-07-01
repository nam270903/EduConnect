import React, {useState} from 'react';
import { Text, View, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { signInWithEmailAndPassword,} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';


const Signin = () => {
    const appIcon = require('../image/icon2-bg.png');
    const appBg = require('../image/background.jpg');

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
            <Image
                style={styles.appBg}
                source={appBg}/>

            <Image 
                style = {styles.appIcon}
                source={appIcon}/>

            <Text style = {styles.textLogo}>
                Edu Connect
            </Text>

            <KeyboardAvoidingView behavior='padding'>
                {/* Email */}
                <TextInput 
                    style={styles.input} 
                    value = {email} 
                    placeholder ='Email' 
                    autoCapitalize ='none' 
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor='#808080'> 
                </TextInput>

                {/* Password */}
                <TextInput 
                    style={styles.input} 
                    secureTextEntry = {!showPassword} 
                    value = {password} 
                    placeholder ='Password' 
                    onChangeText={(text) => setPassword(text) }
                    placeholderTextColor='#808080'> 
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
                                <Text style={styles.two}> Don't have an account?</Text>
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
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#ffffff',
    },

    input: {
        marginVertical:4,
        height: 50,
        borderWidth: 1,
        borderRadius: 13,
        padding: 10,
        backgroundColor:'#ffffff',
        fontSize: 15,
        marginHorizontal: 20,
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
        fontWeight:'bold'
        
    },

    signInButton: {
        height: 50,
        padding: 15,
        backgroundColor:'#0080FF',
        borderRadius:13,
        marginHorizontal: 20,
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
        paddingTop: 10,
    },

    two: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 17,
    },

    appIcon:{
        width:'40%',
        height:'30%',
        alignSelf:'center',
        marginBottom:50
    },

    textLogo:{
        textAlign:'center',
        paddingVertical:10,
        fontSize: 30,
        fontWeight:'bold',
        color:'#4CC9F0'
    },

    appBg:{
        height:'120%',
        width:'120%',
        position:'absolute'
    },
});

export default Signin;


