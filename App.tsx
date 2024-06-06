import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./src/routers/TabNavigator";
import Signin from "./src/screens/Signin";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import Signup from "./src/screens/Signup";


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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App