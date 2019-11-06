import React, { Component } from 'react';
import {StyleSheet, Button, View, StatusBar, Root, Linking, ActivityIndicator} from 'react-native';
import { AppLoading } from "expo";
import { Container, Header, Content, Card, CardItem, Body, Text, Title } from 'native-base';

import AppHeader from '../components/AppHeader';



export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
            item: '',
            jobs: null,
            employmeApiLink: 'http://192.168.43.194:5000',
            jobsList: null,
            sponsoredJobsList: null,
        }
    }

    static navigationOptions = {
      title: 'Employ.me',
      headerStyle: {
          backgroundColor: "#6c028a",
      },
      headerTintColor: 'white',
      headerTitleStyle: {
          color: "white"
      },
  }

    componentWillMount () {
      fetch(`${this.state.employmeApiLink}/api/native-jobs`)
            .then((res) => res.json())
            .then((resJson) => {
              if(resJson.length > 0) {
                this.setState({
                  jobs: resJson
                });
              } else {
                this.setState({
                  jobs: 'noData'
                });
              }
            })
            .catch((err)=>{
                console.log(err)
            })
    }

  render() {
      if (this.state.jobs !== null) {
        if(this.state.jobs !=='noData') {
          this.state.jobsList = this.state.jobs.map((job, i) => {
            return (
              <Card key={job._id} style={[styles.card, (i === 0) ? styles.marginTop : styles.card ]}>
                  <CardItem button onPress={() => {
                    this.props.navigation.navigate('Job', {
                      jobId: job._id
                    })
                  }}>
                    <Body>
                      <View style={styles.cardItemBody}>
                        <View style={styles.jobHeader}>
                          <Text style={[styles.bold, styles.mainInfo]}>
                            {job.job_title} 
                          </Text>
                        </View>
                        <View style={styles.jobSalary}>
                          <Text style={[styles.bold, styles.mainInfo]}>
                            {job.job_salary}$
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text style={styles.location}>
                          {job.job_description}
                        </Text>
                      </View>
                    </Body>
                    
                  </CardItem>
                </Card>
            )
          })
          this.state.sponsoredJobsList = this.state.jobs.map((job, i) => {
            if(job.job_sponsored) {
              return (
                <Card key={job._id} style={[styles.card, (i === 0) ? styles.marginTop : styles.card ]}>
                  <CardItem button onPress={() => {
                    this.props.navigation.navigate('Job', {
                      jobId: job._id
                    })
                  }}>
                    <Body>
                      <View style={styles.cardItemBody}>
                        <View style={styles.jobHeader}>
                          <Text style={[styles.bold, styles.mainInfo]}>
                            {job.job_title} <Text style={styles.sponsor}>(Sponsored)</Text>
                          </Text>
                        </View>
                        <View style={styles.jobSalary}>
                          <Text style={[styles.bold, styles.mainInfo]}>
                            {job.job_salary}$
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text style={styles.location}>
                          {job.job_description}
                        </Text>
                      </View>
                    </Body>
                    
                  </CardItem>
                </Card>
              )
            }
          })
        }
      } else {
        this.state.jobsList = <ActivityIndicator size="large" color="#6c028a" />
      }
     if (this.state.jobs !== null) {
       if (this.state.jobs !== 'noData') {
          return (
            <Container>
              <Content>
                {this.state.sponsoredJobsList}
                {this.state.jobsList}
              </Content>
            </Container>
          )
       } else {
         return (
          <Container style={styles.container}>
            <Text>Nothing was found :(</Text>
          </Container>
         )
       }
       
     } else {
      return (
        <Container style={styles.container}>
            {this.state.jobsList}
        </Container>
      )
     }
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  jobSalary: {
    flex: 1,
    flexDirection: 'row-reverse'
  },
  sponsor: {
    fontStyle: 'italic',
    fontSize: 12,
    color: '#7D8795'
  },
  jobHeader: {
    flex: 4
  },
  cardItemBody: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  spinnerCtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  card: {
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: '#6c028a',
    borderBottomWidth: 5,
    shadowColor: '#ddd',
    shadowOffset: { width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 15,
    padding: 4
  },
  bold: {
    fontWeight: 'bold'
  },
  mainInfo: {
    fontSize: 18,
    marginBottom: 8
  },
  marginTop: {
    marginTop: 10
  },
  location: {
    color: '#777',
    fontSize: 14
  },
  horizontal: {
    padding: 10,
    marginTop: 500,
    paddingTop: 200
  },
  hr: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  }
})
