import React from 'react';
import { View, Image } from 'react-native';

const styles = {
  page: {
    flex: 1,
    top: 20,
    backgroundColor: 'white',
  },
  footer: {
    flex: 0.5,
  },
  footerImage: {
    height: 270,
    width: 320,
  },
  childrenContainer: {
    backgroundColor: 'white'
  }
};

export default ({children, footerImage}) => (
  <View style={styles.page}>
    {children}
    {footerImage && (
      <View style={styles.footer}>
        <Image style={styles.footerImage} source={footerImage} />
      </View>
    )}
  </View>
);
