/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  View,
} from 'react-native';
import * as scenes from './shared/scenes';
import makeRoute from './shared/utils/makeRoute';
import NavigationBarRouteMapper from './shared/NavigationBarRouteMapper';

class EdTheAxolotl extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{title: 'Menu', index: 0, scene: 'Menu'}}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={{height: 60}}
          />
        }
        renderScene={(route, navigator) => {
          const Scene = scenes[route.scene];

          return (
            <View style={{flex: 1}}>
              <Scene
                title={route.title}

                onForward={(title, scene, props) => {
                  navigator.push(makeRoute(title, route.index, scene, props));
                }}
                onBack={(title, scene, props) => {
                  if (route.index > 0)
                    navigator.pop();
                }}
              />
            </View>
            );
        }}
      />
    );
  }
}

AppRegistry.registerComponent('EdTheAxolotl', () => EdTheAxolotl);
