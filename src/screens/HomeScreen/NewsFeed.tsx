import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const NewsFeed = () => {
  return (
    <View style={styles.container}>
      <Text>NewsFeed</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'#ffffff',
    },
  });

export default NewsFeed;


