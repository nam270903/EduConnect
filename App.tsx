import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./src/routers/TabNavigator";
import Login from "./src/screens/Login";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";


const App = () => {
  const Stack = createNativeStackNavigator();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) =>{
      console.log ('user', user); //Check if state of user changed ?
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
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App