import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Back } from 'iconsax-react-native';
import NewsFeed from './NewsFeed';
import Member from './Member';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const ClassInfo = () => {
    const navigation = useNavigation <any> ();
 
    const BackButton = () => {
        navigation.navigate("Home");
    };

    const TopTabNavigator = createMaterialTopTabNavigator();

  return (
    <View style={styles.container}>
      <TopTabNavigator.Navigator>
        <TopTabNavigator.Screen name="NewsFeed" component={NewsFeed} />
        <TopTabNavigator.Screen name="Member" component={Member} />
      </TopTabNavigator.Navigator>
    </View>
  );
};

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
  
export default ClassInfo;

