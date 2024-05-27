import { Text, View, StyleSheet, TextInput, ActivityIndicator, Button, Alert, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../../screens/Profile';

const ProfileNavigator = () => {
    const ProfileStack = createNativeStackNavigator();

    return (
       <ProfileStack.Navigator>
            <ProfileStack.Screen name = "Profile" component = {Profile}/>
       </ProfileStack.Navigator>
    )
}


export default ProfileNavigator