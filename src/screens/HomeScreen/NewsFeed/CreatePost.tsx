import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../../../FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { get, push, ref, set, update } from 'firebase/database';
import { Back } from 'iconsax-react-native';


const CreatePost = () => {
  const navigation = useNavigation <any> ();

  const database = FIREBASE_DATABASE;
  const auth = FIREBASE_AUTH;

  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [classID, setClassID] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  const Return = () => {
    navigation.navigate('NewsFeed')
  }
  useEffect(() => {
    const fetchClassID = async () => {
      try {
        const classesRef = ref(database, 'classes');
        const snapshot = await get(classesRef);

        if (snapshot.exists()) {
          const classesData = snapshot.val();
          const firstClassID = Object.keys(classesData)[0]; 
          setClassID(firstClassID);
        } else {
          Alert.alert('No classes found.');
        }
      } catch (error) {
        console.error('Error fetching classID:', error);
        Alert.alert('Error fetching classID.');
      } finally {
        setLoading(false);
      }
    };

    fetchClassID();
  }, [database]);

  const Post = async () => {
    if (loading) {
      Alert.alert('Loading, please wait!');
      return;
    }

    if (!classID) {
      Alert.alert('Class ID not available.');
      return;
    }

    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const postData = {
          postTitle,
          postContent,
          author: currentUser.uid,
          timestamp: Date.now(),
        };

        push(ref(database, `classes/${classID}/posts`), postData)
          .then(() => {
            Alert.alert('Your Post has been shared!');
          })
          .catch((error) => {
            console.error('Error sharing post:', error);
            Alert.alert('Error sharing post.');
          });

        navigation.navigate('NewsFeed')  
      }
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
