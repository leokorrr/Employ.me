import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Title, Root } from 'native-base';
import { StyleSheet, View, Text } from 'react-native';
import { AppLoading } from "expo";
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons';

export default class headerPart extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  render() {
    return (
        <View  style={styles.headerBox}>
            <View ><Text style={styles.title}>Employ.me</Text></View>
            <View style={styles.icon}><Ionicons name="ios-home" size={20} color="#fff" button  onPress={() => this.props.navigation.navigate('SearchResult')}/></View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 24,
    backgroundColor: '#00B880'
  },
  headerBox: {
      marginLeft:20,
      marginRight: 20,
      flex:1,
      flexDirection:'row',
      alignItems: 'center',
      justifyContent: 'space-between'
  },
  title: {
      fontWeight: 'bold',
      color: '#fff',
      fontSize: 20
  },
  icon: {
      flexDirection: 'row-reverse'
  }
})