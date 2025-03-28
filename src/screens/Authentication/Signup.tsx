import React, {useState} from 'react';
import { Text, View, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, Image, } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { set, ref } from 'firebase/database';

const Signup = () => {
    const navigation = useNavigation<any>();

    const auth = FIREBASE_AUTH;
    const database = FIREBASE_DATABASE;

    const appIcon = require('../image/icon2-bg.png');
    const appBg = require('../image/background.jpg');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('')

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isParentButtonPressed, setIsParentButtonPressed] = useState(false);
    const [isTeacherButtonPressed, setIsTeacherButtonPressed] = useState(false);

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
                role: role,
                userID: uid
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

    const RoleSelection = (selectedRole: React.SetStateAction<string>) => {
        setRole(selectedRole);
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.appBg}
                source={appBg}/>

            <KeyboardAvoidingView behavior='padding'>
                <View style = {styles.doubleButton}>
                    
                    <TouchableOpacity 
                        style={isParentButtonPressed ? styles.chosenButton : styles.defaultButton} 
                        onPress={() => {
                            RoleSelection('Parent') 
                            setIsParentButtonPressed(true)
                            setIsTeacherButtonPressed(false);
                            }}>
                        <Text style={isParentButtonPressed ? styles.chosenText : styles.defaultText}> Sign up as Parent</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={isTeacherButtonPressed ? styles.chosenButton : styles.defaultButton} 
                        onPress={() => {
                            RoleSelection('Teacher') 
                            setIsTeacherButtonPressed(true)
                            setIsParentButtonPressed(false);
                            }}>
                        <Text style={isTeacherButtonPressed ? styles.chosenText : styles.defaultText}> Sign up as Teacher</Text>
                    </TouchableOpacity>
                </View>
                
                <TextInput
                    style = {styles.input}
                    value = {email}
                    placeholder='Email'
                    autoCapitalize='none'
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor='#808080'>
                </TextInput>

                <TextInput
                    style = {styles.input}
                    value = {username}
                    placeholder='Your full name'
                    autoCapitalize = 'none'
                    onChangeText={(text) => setUsername(text)}
                    placeholderTextColor='#808080'>
                </TextInput>

                <TextInput
                    style = {styles.input}
                    value = {phone}
                    placeholder='Phone Number'
                    onChangeText={(text) => setPhone(text)}
                    placeholderTextColor='#808080'>
                </TextInput>

                <TextInput
                    style = {styles.input}
                    value = {password}
                    placeholder='Password'
                    secureTextEntry = {!showPassword}
                    autoCapitalize='none'
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor='#808080'>
                </TextInput>

                {
                    loading ? (<ActivityIndicator/>) : (
                        <>
                            <TouchableOpacity onPress={toggleShowPassword}>
                                <Text style = {styles.showPasswordButton}>
                                    {showPassword ? 'Hide password' : 'Show password'}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={signUp}>
                                <View style={styles.signUpButton}>
                                    <Text style = {styles.signUpButtonText}> Sign Up</Text>
                                </View>
                            </TouchableOpacity>
                        
                            <View style= {styles.one}>
                                <Text style = {styles.two}> Already have an account ? </Text>
                                <TouchableOpacity onPress={Signin}>
                                    <Text style={styles.signInButton}> Sign In</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )
                }
            </KeyboardAvoidingView>
        </View>
    )
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

    signInButton: {
        textAlign: 'center',
        marginTop: 10,
        color: '#0080FF', 
        fontSize: 17,
        textDecorationLine: 'underline',
        fontWeight:'bold'
    },

    signUpButton: {
        height: 50,
        padding: 15,
        backgroundColor:'#0080FF',
        borderRadius:13,
        marginHorizontal: 20,
    },

    signUpButtonText: {
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
    },
    
    doubleButton:{
        flexDirection:'row',
        justifyContent:'space-around',
    },

    chosenButton:{
        backgroundColor:'#0080FF',
        borderRadius:13,
        height: 50,
        borderWidth:1,
        justifyContent:'center',
        padding: 10,
    },

    defaultButton:{
        backgroundColor:'#ffffff',
        borderRadius:13,
        height: 50,
        borderWidth:1,
        justifyContent:'center',
        padding: 10,
    },

    chosenText:{
        color:'#ffffff',
        fontWeight:'bold'

    },

    defaultText:{
        color:'#000000'
    },
    
    appBg:{
        height:'120%',
        width:'120%',
        position:'absolute'
    },

  });

export default Signup;