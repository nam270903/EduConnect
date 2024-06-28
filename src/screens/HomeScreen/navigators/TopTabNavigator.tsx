import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NewsFeedNavigator from './NewsFeedNavigator';

const TopTabNavigator = () => {
    const TopTabs = createMaterialTopTabNavigator();
  
    return (
        <TopTabs.Navigator>
            <TopTabs.Screen name="NewsFeedStack" component={NewsFeedNavigator} />
        </TopTabs.Navigator>);
    };

  export default TopTabNavigator