import React, { Component } from 'react';
import {StyleSheet, Button, View, StatusBar, Root, Linking} from 'react-native';
import { AppLoading } from "expo";
import { Container, Header, Content, Card, CardItem, Body, Text, Title } from 'native-base';

import AppHeader from '../components/AppHeader';
import { NETWORK_URL } from 'react-native-dotenv';


export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
            item: '',
            jobs: [],
            salaryFilter: params ? params.salaryFilter : null,
            titleFilter: params ? params.titleFilter : null,
            searchJobTitle: params ? params.searchJobTitle : null,
            amazoonApiLink: NETWORK_URL,
            findedJobs: []
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
      fetch(`${this.state.amazoonApiLink}/api/jobs`)
            .then((res) => res.json())
            .then((resJson) => {
                this.setState({
                    jobs: resJson
                });
            })
            .then(() => {
              if(this.state.searchJobTitle) {
                this.setState({
                  findedJobs: this.filterJobs()
                })
              } else {
                this.setState({
                  findedJobs: this.state.jobs
                })
              }
            
              if (this.state.salaryFilter) {
                var filteredJobs = this.state.findedJobs.sort(this.filterBySalary);
                
                this.setState({
                  findedJobs: filteredJobs
                })
              }

              if(this.state.titleFilter) {
                var filteredJobs = this.state.findedJobs.sort(this.filterByTitle);
                
                this.setState({
                  findedJobs: filteredJobs
                })
              }
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    filterJobs = () => {
      return this.state.jobs.filter((job) => { return job.job_title.toLowerCase() == this.state.searchJobTitle.toLowerCase()})
    }

    filterBySalary = (a, b) => {
      const salaryA = a.job_salary;
      const salaryB = b.job_salary;

      let comparison = 0;

      if (salaryA > salaryB) {
        comparison = -1;
      } else if (salaryA < salaryB) {
        comparison = 1;
      }

      return comparison;
    }

    filterByTitle = (a, b) => {
      const genreA = a.job_title.toUpperCase();
      const genreB = b.job_title.toUpperCase();
      
      let comparison = 0;
      if (genreA > genreB) {
          comparison = 1;
      } else if (genreA < genreB) {
          comparison = -1;
      }
      return comparison;
  }

  render() {
    
      const jobsList = this.state.findedJobs.map((job, i) => {
        return (
          <Card key={job._id} style={[styles.card, (i === 0) ? styles.marginTop : styles.card ]}>
              <CardItem>
                <Body style={styles.cardItemBody} >
                  <View>
                    <Text style={[styles.bold, styles.mainInfo]} onPress={() => Linking.openURL(`http://192.168.43.194:8080${job.job_link}`)}>
                      {job.job_title} - {job.job_company}
                    </Text>
                    <Text style={styles.location} onPress={() => Linking.openURL(`http://192.168.43.194:8080${job.job_link}`)}>
                      Check out on amazoon.me...
                    </Text>
                  </View>
                  <View>
                    <Text style={[styles.bold, styles.mainInfo]}>
                      {job.job_salary}$
                    </Text>
                  </View>
                </Body>
              </CardItem>
            </Card>
        )
      })
    
    return (
        <Container>
          <Content>
            {jobsList}
          </Content>
        </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6c028a',
  },
  cardItemBody: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
  }
})