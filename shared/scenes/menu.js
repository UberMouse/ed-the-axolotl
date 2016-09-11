import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';

const styles = StyleSheet.create({
  page: {
    marginTop: 30,
  },
  row: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#efefef',
    padding: 18,
    marginLeft: 5
  },
  rowIcon: {
    marginTop: 10,
    height: 35,
    width: 35,
  },
  rowTextContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    flex: 1,
    padding: 10,
  },
  rowText: {
    color: '#1FA7FF',
    fontFamily: 'Avenir',
    fontSize: 16,
  },
  rowHeader: {
    fontWeight: '800'
  },
  rowDescription: {
    fontSize: 12,
  },
  headerImage: {
    height: 117,
    width: undefined,
    marginBottom: 40,
    top: 30,
  },
});
const Row = ({icon, header, description, onTouchCb}) => {

  return (
    <View>
      <TouchableHighlight onPress={onTouchCb}>
        <View style={styles.row}>
          <Image style={styles.rowIcon} source={icon} />
          <View style={styles.rowTextContainer}>
            <Text style={[styles.rowText, styles.rowHeader]}>{header}</Text>
            <Text style={[styles.rowText, styles.rowDescription]}>{description}</Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const Menu = ({onForward}) => {
  const scenes = [
    {name: 'Food', description: 'Track eating and dietry needs', icon: require('../../images/Food_Icon.png')},
    {name: 'Tank', description: 'Maintenance and cleaning cycles', icon: require('../../images/Tank_Icon.png')},
    {name: 'Health', description: 'Log sick days and vet visits', icon: require('../../images/Health_Icon.png')},
    {name: 'Mating', description: 'Track mating habits and days', icon: require('../../images/Mating_Icon.png')}
  ];

  return (
    <ScrollView style={styles.page}>
      <Image source={require('../../images/Menu_Image.png')} style={styles.headerImage}/>
      {scenes.map(
        ({name, description, icon}) => <Row
          description={description}
          icon={icon}
          key={name}
          header={name}
          onTouchCb={onForward.bind(null, name, name)}
        />
      )}
    </ScrollView>
  );
};

export default Menu;
