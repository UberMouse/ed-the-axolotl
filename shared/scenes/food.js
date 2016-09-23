import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';
import moment from 'moment';
import _ from 'lodash';

const styles = {
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
  dayImage: {
    width: 50,
    height: 50,
  },
};

const foodImage = require('../../images/Food.png');
const Day = ({name, fedOn, toFeed}) => {
  const viewStyle = {
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    flexDirection: 'column',
  };
  const textStyle = {
    fontFamily: 'Avenir',
    color: fedOn ? 'red' : toFeed ? 'green' : '#1FA7FF'
  };

  return (
    <View style={viewStyle}>
      <Image source={foodImage} style={styles.dayImage} />
      <Text style={textStyle}>{name}</Text>
    </View>
  );
};

const Food = (props) => {
  let scrollView;
  const scrollToCenter = (width, height) => {
    // I have no idea, the scrollView ends up being larger than the size of the elements for some reason??
    if(scrollView)
      // TODO: Remove hardcoded offset and dynamically calculate based on size of Day components
      scrollView.scrollTo({x: 400 + 20, animated: false});
  };

  const dateOffsets = _.range(-7, 8);
  const days = _.map(dateOffsets, (offset, index) => {
    const date = moment().startOf('day').add(offset, 'days');

    return <Day name={date.format('dddd')} key={index} />;
  });

  return (
    <View style={styles.page}>
      <View style={styles.slider}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.scrollContainer}
          showsHorizontalScrollIndicator={false}
          onContentSizeChange={scrollToCenter}
          ref={(sv) => { scrollView = sv }}
        >
          {days}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Image style={styles.footerImage} source={require('../../images/Food_Footer.png')} />
      </View>
    </View>
  );
};

export default Food;
