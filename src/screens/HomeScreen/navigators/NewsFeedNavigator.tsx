import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsFeed from '../NewsFeed';

const NewsFeedNavigator = () => {
    const NewsFeedStack = createNativeStackNavigator();

    return (
        <NewsFeedStack.Navigator>
            <NewsFeedStack.Screen options={({headerShown: false })} name = "NewsFeed" component = {NewsFeed}  />
        </NewsFeedStack.Navigator>
    );
}

export default NewsFeedNavigator