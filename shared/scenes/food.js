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
  days: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
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
    width: 75,
    height: 150,
  },
};

const foodImage = require('../../images/Food_Mutual.png');
const foodUnfedImage = require('../../images/Food_Unfed.png');
const foodFedImage = require('../../images/Food_Fed.png');

const Day = ({name, fedOn, missedFeeding, onTouch}) => {
  const viewStyle = {
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    flexDirection: 'column',
  };
  const textStyle = {
    fontFamily: 'Avenir',
  };

  const image = fedOn ? foodFedImage : missedFeeding ? foodUnfedImage : foodImage;

  return (
    <TouchableHighlight onPress={onTouch} activeOpacity={0.5}>
      <View style={viewStyle}>
        <Image source={image} style={styles.dayImage} />
        <Text style={textStyle}>{name}</Text>
      </View>
    </TouchableHighlight>
  );
};

class FoodState extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      fedOn: null,
      nextFeeding: null,
    }

    _.bindAll(this, 'markFed', 'generateToFeedDays');
  }

  componentDidMount() {
    AsyncStorage.getItem('fedOn').then(value => {
      console.log(value);
      // why...
      const day = (_.isNil(value) || value === 'null' || value === 'Invalid date') ? moment() : moment(value);

      debugger
      this.generateToFeedDays(day);

      this.setState({
        loading: false
      });
    });
  }

  generateToFeedDays(fedOn) {
    const nextFeeding = moment(fedOn).add(2, 'days')

    this.setState({
      fedOn: fedOn,
      nextFeeding
    });
  }

  componentWillUpdate() {
    const { fedOn } = this.state;

    if(!_.isNil(fedOn))
      AsyncStorage.setItem('fedOn', fedOn.toString());
  }

  markFed(date) {
    this.setState({fedOn: date}, () => this.generateToFeedDays(date))
  }

  render() {
    if(this.state.loading)
      return null;

    const { fedOn, nextFeeding } = this.state;
    const formatDate = date => date.format('dddd');
    const today = moment();

    return (
      <View style={styles.page}>
        <View style={styles.days}>
          <Day fedOn onTouch={() => {}} name={formatDate(fedOn)} />
          <Day
            missedFeeding={nextFeeding.isBefore(today)}
            onTouch={this.markFed.bind(null, today)}
            name={formatDate(nextFeeding)}
          />
        </View>
        <View style={styles.footer}>
          <Image style={styles.footerImage} source={require('../../images/Food_Footer.png')} />
        </View>
      </View>
    );
  }
}

export default FoodState;
