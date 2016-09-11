import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    top: 20
  },
  slider: {
    flex: 0.5,
    backgroundColor: '#999',
  },
  footer: {
    flex: 0.5,
    backgroundColor: '#eee',
  },
});

const Tank = (props) => {

  return (
    <View style={styles.page}>
      <View style={styles.slider}>
        <Text>slider</Text>
      </View>
      <View style={styles.footer}>
        <Text>footer</Text>
      </View>
    </View>
  );
};

export default Tank;
