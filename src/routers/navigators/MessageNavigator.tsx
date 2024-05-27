import {View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Message from '../../screens/Message';

const MessageNavigator = () => {
    const MessageStack = createNativeStackNavigator();

    return (
       <MessageStack.Navigator>
            <MessageStack.Screen name = "Message" component = {Message}/>
       </MessageStack.Navigator>
    )
}

export default MessageNavigator