import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';


const Marksheet = () => {
  return (
    <View style={styles.container}>
      <Text>Marksheet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'#ffffff'
    },
  });
  
export default Marksheet;


