import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../../screens/ProfileScreen/Profile';

const ProfileNavigator = () => {
    const ProfileStack = createNativeStackNavigator();

    return (
       <ProfileStack.Navigator>
            <ProfileStack.Screen options={({headerShown: false})} name = "Profile" component = {Profile}/>
       </ProfileStack.Navigator>
    )
}


export default ProfileNavigator