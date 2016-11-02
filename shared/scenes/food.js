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
    height: 100,
  },
};

const foodImage = require('../../images/Food_Mutual.png');
const foodUnfedImage = require('../../images/Food_Unfed.png');
const foodFedImage = require('../../images/Food_Fed.png');

const Day = ({name, fedOn, toFeed, highlighted, onClick}) => {
  const viewStyle = {
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    flexDirection: 'column',
  };
  const textStyle = {
    fontFamily: 'Avenir',
    color: highlighted ? 'red' : '#1FA7FF'
  };

  const image = fedOn ? foodFedImage : toFeed ? foodUnfedImage : foodImage;

  return (
    <TouchableHighlight onPress={onClick}>
      <View style={viewStyle}>
        <Image source={image} style={styles.dayImage} />
        <Text style={textStyle}>{name}</Text>
      </View>
    </TouchableHighlight>
  );
};

const Food = ({markFed, fedOnDay, feedingDays}) => {
  const feedingDayComponents = _.map(feedingDays, d => {
    const name = d.format('dddd');

    return (
      <Day
        name={name}
        key={d.toString()}
        onClick={markFed.bind(null, d)}
        highlighted={moment().format('dddd') === name}
        toFeed={true}
      />
    );
  });
  const fedDayComponent = (
    <Day
      name={fedOnDay.format('dddd')}
      key={fedOnDay.toString()}
      onClick={markFed.bind(null, fedOnDay)}
      fedOn={true}
    />
  );

  const dayComponents = [fedDayComponent, ...feedingDayComponents]

  return (
    <View style={styles.page}>
      <View style={styles.slider}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.scrollContainer}
          showsHorizontalScrollIndicator={false}
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

    this.state = {
      loading: true,
      fedOn: null,
      toFeed: [],
    }

    _.bindAll(this, 'markFed');
  }

  componentDidMount() {
    AsyncStorage.setItem('fedOn', moment());
    AsyncStorage.getItem('fedOn').then(value => {
      if(_.isNil(value))
        return;

      const today = moment().startOf('day')
      const fedOn = moment(value)

      const toFeed = [2, 4, 6].map(n => {
        return moment(fedOn).startOf('day').add(n, 'days')
      });

      const nextFeeding = _.head(toFeed);

      this.setState({
        fedOn,
        toFeed,
        loading: false
      });
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

  render() {
    if(this.state.loading)
      return null;

    return <Food
      markFed={this.markFed}
      fedOnDay={this.state.fedOn}
      feedingDays={this.state.toFeed}
    />;
  }
}

export default FoodState;
