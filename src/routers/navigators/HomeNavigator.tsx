import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../screens/HomeScreen/Home';

const HomeNavigator = () => {
    const HomeStack = createNativeStackNavigator();

    return (
       <HomeStack.Navigator>
            <HomeStack.Screen options={({headerShown: false})} name = "Home" component = {Home}  />
       </HomeStack.Navigator>
    )
}

export default HomeNavigator