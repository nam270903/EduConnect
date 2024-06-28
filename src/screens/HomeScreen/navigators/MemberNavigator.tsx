import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Member from '../Member';

const MemberNavigator = () => {
    const MemberStack = createNativeStackNavigator();

    return (
        <MemberStack.Navigator>
            <MemberStack.Screen options={({headerShown: false })} name = "NewsFeed" component = {Member}  />
        </MemberStack.Navigator>
    );
}

export default MemberNavigator;