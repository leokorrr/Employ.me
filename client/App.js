import React from 'react';
import { StyleSheet, Text, View,} from 'react-native';

import SearchScreen from './components/SearchScreen';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <SearchScreen></SearchScreen>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
