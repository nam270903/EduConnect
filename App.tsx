import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./src/routers/TabNavigator";
import Signin from "./src/screens/Authentication/Signin";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import Signup from "./src/screens/Authentication/Signup";
import AddClasses from "./src/screens/HomeScreen/AddClasses";
import ClassInfo from "./src/screens/HomeScreen/ClassInfo";
import JoinClass from "./src/screens/HomeScreen/JoinClass";

const App = () => {
  const Stack = createNativeStackNavigator();
  const [user, setUser] = useState <User | null> (null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) =>{
      console.log ('user', user); 
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
        <Stack.Screen name="JoinClass" component={JoinClass} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App