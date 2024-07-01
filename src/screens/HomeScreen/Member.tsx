import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';


const Member = () => {
  return (
    <View style={styles.container}>
      <Text>Member</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'#ffffff',
    },
  });

export default Member;


