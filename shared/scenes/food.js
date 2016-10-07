import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  AsyncStorage
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
const Day = ({name, fedOn, toFeed, onClick}) => {
  const viewStyle = {
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    flexDirection: 'column',
  };
  const textStyle = {
    fontFamily: 'Avenir',
    color: fedOn ? 'green' : toFeed ? 'red' : '#1FA7FF'
  };

  return (
    <TouchableHighlight onPress={onClick}>
      <View style={viewStyle}>
        <Image source={foodImage} style={styles.dayImage} onClick={() => console.log('foooo')}/>
        <Text style={textStyle}>{name}</Text>
      </View>
    </TouchableHighlight>
  );
};

const Food = ({markFed, fedOnDays, toFeedOn, days}) => {
  let scrollView;
  const scrollToCenter = (width, height) => {
    // I have no idea, the scrollView ends up being larger than the size of the elements for some reason??
    if(scrollView)
      // TODO: Remove hardcoded offset and dynamically calculate based on size of Day components
      scrollView.scrollTo({x: 400 + 20, animated: false});
  };

  const dateOffsets = _.range(-7, 8);
  const dayComponents = _.map(dateOffsets, (offset, index) => {
    const date = moment().startOf('day').add(offset, 'days');
    const day = date.format('dddd');
    const fedOnThisDay = _.some(fedOnDays, d => d.isSame(date))
    const toFeedOnThisDay = _.some(toFeedOn, d => d.isSame(date));

    return <Day name={day} key={index} fedOn={fedOnThisDay} toFeed={toFeedOnThisDay} onClick={markFed.bind(null, date)}/>;
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
          {dayComponents}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Image style={styles.footerImage} source={require('../../images/Food_Footer.png')} />
      </View>
    </View>
  );
};

class FoodState extends Component {
  constructor() {
    super();

    const dateOffsets = _.range(-7, 8);
    const days = _.map(dateOffsets, (offset) => {
      const date = moment().startOf('day').add(offset, 'days');

      return date;
    });

    this.state = {
      fedOn: [],
      toFeed: [],
      days,
    }

    _.bindAll(this, 'markFed', 'generateToFeedDays');
  }

  componentDidMount() {
    AsyncStorage.getItem('fedOn').then(value => {
      if(_.isNil(value))
        return;

      this.setState({
        fedOn: _.map(
          JSON.parse(value),
          date => moment(date)
        )
      }, this.generateToFeedDays);
    });
  }

  componentWillUpdate() {
    AsyncStorage.setItem('fedOn', JSON.stringify(this.state.fedOn));
  }

  markFed(date) {
    let fedOn;

    if(_.some(this.state.fedOn, d => d.isSame(date)))
      fedOn = _.filter(this.state.fedOn, d => !d.isSame(date))
    else {
      fedOn = [...this.state.fedOn]
      fedOn.push(date);
    }

    this.setState({fedOn}, this.generateToFeedDays)
  }

  generateToFeedDays() {
    const sortedFeedingDays = this.state.fedOn.sort((a, b) => {
      return a.isBefore(b) ? -1 : 1;
    });
    const lastFedOn = _.last(sortedFeedingDays);
    const daysToCheck = _.filter(this.state.days, d => d.isAfter(lastFedOn));

    const daysToFeedOn = _.filter(daysToCheck, (d, index) => index % 2 != 0);

    this.setState({toFeed: daysToFeedOn});
  }

  render() {
    return <Food
      markFed={this.markFed}
      fedOnDays={this.state.fedOn}
      toFeedOn={this.state.toFeed}
      days={this.state.days}
    />;
  }
}

export default FoodState;
