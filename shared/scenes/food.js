import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';
import moment from 'moment';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    top: 20
  },
  slider: {
    flex: 0.5,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  footer: {
    flex: 0.5,
  },
  footerImage: {
    height: 270,
    width: 320,
  },
  dayContainer: {
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    flexDirection: 'column',
  },
  dayImage: {
    width: 50,
    height: 50,
  },
  dayText: {
    fontFamily: 'Avenir',
    color: '#1FA7FF'
  },
});

const foodImage = require('../../images/Food.png');
const Day = ({name, fedOn, toFeed}) => {
  return (
    <View style={styles.dayContainer}>
      <Image source={foodImage} style={styles.dayImage} />
      <Text style={styles.dayText}>{name}</Text>
    </View>
  );
};

const Food = (props) => {
  return (
    <View style={styles.page}>
      <View style={styles.slider}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.scrollContainer}
          showsHorizontalScrollIndicator={false}
        >
          <Day name={'Monday'} />
          <Day name={'Tuesday'} />
          <Day name={'Wednesday'} />
          <Day name={'Thursday'} />
          <Day name={'Friday'} />
          <Day name={'Saturday'} />
          <Day name={'Sunday'} />
          <Day name={'Monday'} />
          <Day name={'Tuesday'} />
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Image style={styles.footerImage} source={require('../../images/Food_Footer.png')} />
      </View>
    </View>
  );
};

export default Food;
