import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Title, Root } from 'native-base';
import { StyleSheet } from 'react-native';
import { AppLoading } from "expo";
import * as Font from 'expo-font'

export default class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  render() {
    return (
        <Header style={styles.header}>
          <Left/>
          <Body>
            <Title>Employ.me</Title>
          </Body>
          <Right />
        </Header>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 24,
    backgroundColor: '#00B880'
  }
})