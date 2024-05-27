import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Home from './src/screens/Home';
import Message from './src/screens/Message';
import Notification from './src/screens/Notification';
import Profile from './src/screens/Profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/routers/TabNavigator';

const App = () => {  
  return <TabNavigator/>
};

export default App;
