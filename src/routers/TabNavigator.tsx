import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigator from './navigators/HomeNavigator';
import MessageNavigator from './navigators/MessageNavigator';
import NotificationNavigator from './navigators/NotificationNavigation';
import ProfileNavigator from './navigators/Profile';
import { Home, Message, Notification, Profile } from 'iconsax-react-native';

const TabNavigator = () => {
    const Tabs = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tabs.Navigator
            screenOptions={({route}) => (
                {headerShown: false, tabBarShowLabel: false ,tabBarIcon: ({focused, color, size}) => {
                    if (route.name === 'HomeStack') {
                        return <Home size = {size} color = {focused ? '#82CAFF' : '#808080'} />
                    }

                    if (route.name === 'MessageStack') {
                        return <Message size = {size} color = {focused ? '#82CAFF' : '#808080'} />
                    }

                    if (route.name === 'NotificationStack') {
                        return <Notification size = {size} color = {focused ? '#82CAFF' : '#808080'} />
                    }

                    if (route.name === 'ProfileStack') {
                        return <Profile size = {size} color = {focused ? '#82CAFF' : '#808080'} />
                    }
                },
                })}>
                <Tabs.Screen name='HomeStack' component={HomeNavigator} options={{headerTitle: 'Home'}} />
                <Tabs.Screen name='MessageStack' component={MessageNavigator} options={{headerTitle:'Message'}} />
                <Tabs.Screen name='NotificationStack' component={NotificationNavigator} options={{headerTitle:'Notification'}} />
                <Tabs.Screen name='ProfileStack' component={ProfileNavigator} options={{headerTitle:'Profile'}} />
            </Tabs.Navigator>
        </NavigationContainer>
    );
};

export default TabNavigator