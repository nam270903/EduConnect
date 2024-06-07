import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from './navigators/HomeNavigator';
import MessageNavigator from './navigators/MessageNavigator';
import NotificationNavigator from './navigators/NotificationNavigation';
import ProfileNavigator from './navigators/ProfileNavigation';
import { Home, Message, Notification, Profile } from 'iconsax-react-native';

const TabNavigator = () => {
    const Tabs = createBottomTabNavigator();

    return (
            <Tabs.Navigator
            screenOptions={({route}) => (
                {headerShown: false, tabBarShowLabel: false ,tabBarIcon: ({focused, color, size}) => {
                    if (route.name === 'HomeStack') {
                        return <Home variant='Outline' size = {size} color = {focused ? '#82CAFF' : '#808080'} />
                    }

                    if (route.name === 'MessageStack') {
                        return <Message variant='Outline' size = {size} color = {focused ? '#82CAFF' : '#808080'} />
                    }

                    if (route.name === 'NotificationStack') {
                        return <Notification variant='Outline' size = {size} color = {focused ? '#82CAFF' : '#808080'} />
                    }

                    if (route.name === 'ProfileStack') {
                        return <Profile variant='Outline' size = {size} color = {focused ? '#82CAFF' : '#808080'} />
                    }
                },
                })}>
                <Tabs.Screen name='HomeStack' component={HomeNavigator} options={{headerTitle: 'Home'}} />
                <Tabs.Screen name='MessageStack' component={MessageNavigator} options={{headerTitle:'Message'}} />
                <Tabs.Screen name='NotificationStack' component={NotificationNavigator} options={{headerTitle:'Notification'}} />
                <Tabs.Screen name='ProfileStack' component={ProfileNavigator} options={{headerTitle:'Profile'}} />
            </Tabs.Navigator>
    );
};

export default TabNavigator