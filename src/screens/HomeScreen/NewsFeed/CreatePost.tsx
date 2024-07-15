import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../../../FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { push, ref, set } from 'firebase/database';
import { Back } from 'iconsax-react-native';


const CreatePost = () => {
  const navigation = useNavigation <any> ();

  const database = FIREBASE_DATABASE;
  const auth = FIREBASE_AUTH;

  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [classID, setClassID] = useState('');

  const Return = () => {
    navigation.navigate('NewsFeed')
  }
   
  const Post = async () => {
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      
      const postData = {
        postTitle,
        postContent,
        author: currentUser.uid,
        timestamp: Date.now(),
        classID,
      };

      push(ref(database, `posts`), postData)
        .then(() =>{
          Alert.alert('Your Post has been shared!');
          navigation.navigate('NewsFeed');
        })
        .catch((error) => {
          console.log('Error shared post:' ,error)
        });

        unsubscribe();
    });
  };
  
    
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>

        <TouchableOpacity style={styles.backButton} onPress={Return}>
          <Back size={25}/>
          <Text style={styles.return}>Back</Text>
        </TouchableOpacity>

        <TextInput
          style = {styles.input}
          value = {postTitle}
          placeholder='Title'
          autoCapitalize='none'
          onChangeText={(text) => setPostTitle(text)}
          placeholderTextColor='#808080'>
        </TextInput>

        <TextInput
          style = {styles.input}
          value = {postContent}
          placeholder='Content'
          autoCapitalize='none'
          onChangeText={(text) => setPostContent(text)}
          placeholderTextColor='#808080'>
        </TextInput>

        <View style={styles.saveContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={Post}>
              <Text style={styles.saveText} >Share Post</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
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

  input: {
    marginVertical:4,
    height: 50,
    borderWidth: 1,
    borderRadius: 13,
    padding: 10,
    backgroundColor:'#ffffff',
    fontSize: 15,
  },

  saveContainer:{
  flex: 1, 
  paddingVertical:10,
  },

  saveButton:{
  height: 50,
  padding: 15,
  backgroundColor:'#0080FF',
  borderRadius:13,
  },

  saveText: {
  color: '#ffffff',
  textAlign: 'center',
  fontSize: 17,
  fontWeight:'bold'
  },

  });

export default CreatePost;
