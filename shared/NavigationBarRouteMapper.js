import React from 'react';
import {
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#1FA7FF',
    fontFamily: 'Avenir',
    fontWeight: '800',
    marginTop: 10,
    marginLeft: 10,
  }
});

export default {
  LeftButton(route, navigator, index, navState) {
    if(index > 0) {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => { if (index > 0) { navigator.pop() } }}
          hitSlop={{top: 10, left: 10, right: 50, bottom: 10}}
        >
          <Text style={styles.text}>{'<'}</Text>
        </TouchableHighlight>)
    }
    else { return null }
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return <Text style={styles.text}>{route.title}</Text>;
  },
};
