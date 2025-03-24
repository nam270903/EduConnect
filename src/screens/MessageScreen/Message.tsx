import {View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../../FirebaseConfig';
import { child, get, onValue, ref } from 'firebase/database';

interface Chat {
    id: string,
    lastMessage: string,
}
interface User {
    email: string;
    password: string;
    phone: string;
    role: string;
    userID: string;
    username: string;
  }

const Message = () => {
    const navigation = useNavigation<any>();

    const database = FIREBASE_DATABASE;
    const auth = FIREBASE_AUTH;

//     const [chats, setChats] = useState<Chat[]> ([]);

//     useEffect(() => {
//         const chatsRef = ref(database, 'chats');
//         onValue(chatsRef, (snapshot) => {
//             const chatsData = snapshot.val();
//             if (chatsData) {
//                 const chatsArray = Object.keys(chatsData).map(chatID => ({
//                     id: chatID,
//                     ...chatsData[chatID]
//                 }));
//                 setChats(chatsArray);
//             }
//         });
//     }, []);

//     const renderItem = ({item} : {item:Chat}) => {
//         return (
//           <View style={styles.chatItem}>
//             <Text>{item.lastMessage}</Text>
//           </View>
//         );
//     };

//     return (
//         <FlatList
//             data={chats}
//             renderItem={renderItem}
//             keyExtractor={item => item.id}
//         />
//   );

    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const userRef = ref(database, 'users');
        onValue(userRef, (snapshot) => {
            const userData = snapshot.val();
            if (userData) {
                const userArray = Object.keys(userData).map(userID => ({
                    ...userData[userID]
                }));
                setUsers(userArray);
            }
        });
    }, []);
    
    const Search = () => {
        const usersRef = ref(database, 'users');
        get(child(usersRef, search)).then((snapshot) => {
            const userData = snapshot.val();
            if (userData) {
                setUsers([userData]);
            } else {
                setUsers([]);
            }
        }).catch((error) => {
            console.error(error);
            setUsers([]);
        });
    };

    const PrivateChat = () => {
        navigation.navigate('PrivateChat');
    };

    const renderItem = ({item}: {item: User}) => (
        <View style={styles.userItem}>
            <TouchableOpacity onPress={PrivateChat}>
                <Text>{item.username}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search by username, email, or phone number"
                value={search}
                onChangeText={setSearch}/>

            <TouchableOpacity onPress={Search} style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>

            {users.length > 0 ? (
                <FlatList
                    data={users}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.userID}/>
            ) : (
                <Text>No result</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    chatItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },

    container: {
        flex: 1,
        padding: 10,
    },

    searchBar: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },

    searchButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },

    searchButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },

    userItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
  });

export default Message;