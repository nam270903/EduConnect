import { useNavigation } from '@react-navigation/native';
import { Back } from 'iconsax-react-native';
import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const PrivareChat = () => {
    const navigattion = useNavigation<any>();

    const Return = () => {
        navigattion.navigate('Message')
    };

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={Return}>
            <Back/> 
        </TouchableOpacity>
        <Text>PrivareChat</Text>
    </View>
  );
};

export default PrivareChat;

const styles = StyleSheet.create({
  container: {
    marginTop:20,
  }
});
