import React, { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";

import TabNavigator from "./src/routers/TabNavigator";

import Signin from "./src/screens/Authentication/Signin";
import Signup from "./src/screens/Authentication/Signup";
import AddClasses from "./src/screens/HomeScreen/AddClasses";
import ClassInfo from "./src/screens/HomeScreen/ClassInfo";
import AttendClass from "./src/screens/HomeScreen/AttendClass";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Back } from "iconsax-react-native";

const App = () => {
  const Stack = createNativeStackNavigator();
  const [user, setUser] = useState <User | null> (null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) =>{
      setUser(user);
    });
  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {
        user? 
        ( <Stack.Screen name="TabNavigator" component={TabNavigator} options={{headerShown: false}}/>
        ):(
        <>
          <Stack.Screen name="Signin" component={Signin} options={{headerShown: false}}/>
          <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}}/>
        </>
        )}
        <Stack.Screen name="AddClasses" component={AddClasses} options={{headerShown: false}}/>

        <Stack.Screen name="ClassInfo" component={ClassInfo} options={{headerShown: false}}/>

        <Stack.Screen name="AttendClass" component={AttendClass} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
      flex:1,
      backgroundColor:'#ffffff',
      paddingTop:20,
      paddingHorizontal:10,
    },

    backButton:{
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    
    return:{
      color:'#0080FF',
      textAlign: 'center',
      fontSize: 17,
      padding: 2
    },
});

export default App