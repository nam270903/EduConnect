import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { User } from 'iconsax-react-native';
import NewsFeed from './NewsFeed/NewsFeed';
import Member from './Member';
import Attendance from './Attendance';
import Marksheet from './Marksheet';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../../FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import Settings from './Settings';



const ClassInfo = () => {
  const navigation = useNavigation <any> ();

  const auth = FIREBASE_AUTH;
  const database = FIREBASE_DATABASE;

  const [isTeacher, setIsTeacher] = useState(false);

  const BackButton = () => {
    navigation.goBack();
  };

  const TopTabNavigator = createMaterialTopTabNavigator();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(database, `users/${user.uid}`);

        const unsubscribeDatabase = onValue(userRef, (snapshot) => {
          const userData = snapshot.val();
  
          if (userData && userData.role === 'Teacher') {
            setIsTeacher(true);
          } else {
            setIsTeacher(false);
          }
        });  
        return () => unsubscribeDatabase();
      }
    });
  
    return unsubscribeAuth;
  }, [auth, database]);

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={BackButton}>
          <Text style={styles.return}> Back </Text>
        </TouchableOpacity>

        <Text style = {styles.headerText}>Class Information</Text>

        <User style={styles.idk} size={25}/>
      </View>

      
      <TopTabNavigator.Navigator screenOptions={{ tabBarScrollEnabled: true }}>
        <TopTabNavigator.Screen name="NewsFeed" component={NewsFeed}/>
        {isTeacher && (
          <>
            <TopTabNavigator.Screen name="Attendance" component={Attendance}/>
            <TopTabNavigator.Screen name="Marksheet" component={Marksheet}/>
          </>
        )}
        <TopTabNavigator.Screen name="Member" component={Member}/>
        <TopTabNavigator.Screen name="Settings" component={Settings}/>
      </TopTabNavigator.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:20,
    backgroundColor:'#ffffff',
    flex:1,
    
  },

  return:{
    color:'#0080FF',
    textAlign: 'center',
    fontSize: 17,
    padding: 5
  },

  header:{
    flexDirection:'row',
    backgroundColor:'#ffffff',
    justifyContent:'space-between',
    marginHorizontal:10
  },

  backButton:{
    flexDirection:'row',
  },

  headerText:{
    fontSize: 17,
    padding: 5,
    fontWeight:'bold',
  },

  idk:{
    padding:5
  }

  });
  
export default ClassInfo;

