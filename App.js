/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {ApolloProvider} from 'react-apollo'
import apolloClient from './apollo'
import RootNavigation from './src/Navigation/RootNavigation'


class App extends React.Component {
  state = {
    client: apolloClient(),
  }

  render () {
    return (
      <ApolloProvider client={this.state.client}>
        <RootNavigation/>
       </ApolloProvider>
    );
  }
};



export default App;
