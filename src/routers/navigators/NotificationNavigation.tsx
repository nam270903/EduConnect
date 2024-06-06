import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notification from '../../screens/Notification';

const NotificationNavigator = () => {
    const NotificationStack = createNativeStackNavigator();

    return (
       <NotificationStack.Navigator>
            <NotificationStack.Screen name = "Notification" component = {Notification}/>
       </NotificationStack.Navigator>
    )
}

export default NotificationNavigator