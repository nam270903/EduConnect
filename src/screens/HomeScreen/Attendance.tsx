import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Attendance = () => {
  return (
    <View style={styles.container}>
      <Text>Attendance</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#ffffff',
    },
    
  });

export default Attendance;

