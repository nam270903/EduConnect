import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Back, User } from 'iconsax-react-native';
import NewsFeed from './NewsFeed';
import Member from './Member';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const ClassInfo = () => {
    const navigation = useNavigation <any> ();
 
    const BackButton = () => {
        navigation.goBack();
    };

    const TopTabNavigator = createMaterialTopTabNavigator();

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={BackButton}>
          <Text style={styles.return}> Back </Text>
        </TouchableOpacity>

        <Text style = {styles.headerText}>Class Information</Text>

        <User style={styles.idk} size={25}/>
      </View>

      <TopTabNavigator.Navigator>
        <TopTabNavigator.Screen name="NewsFeed" component={NewsFeed} />
        <TopTabNavigator.Screen name="Member" component={Member} />
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

