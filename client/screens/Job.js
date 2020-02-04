import React, { Component } from 'react';
import { Container, Header, Content, Input, Item, Button, Text, ListItem, CheckBox, Body } from 'native-base';
import { StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Card, CardItem } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export default class WelcomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            jobs: null,
            employmeApiLink: 'http://192.168.8.102:5000',
            job: 'default',
            jobId: this.props.navigation.getParam('jobId', 'default value'),
            benefits: null,
            requirements: null,
            devTools: null
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
    
    handlePress = () => {
        alert('You have applied to job!')
    }

    componentWillMount () {
        fetch(`${this.state.employmeApiLink}/api/native-jobs`)
              .then((res) => res.json())
              .then((resJson) => {
                  this.setState({
                      jobs: resJson
                  });
                  this.setState({
                      job: this.state.jobs.find(job => job._id === this.state.jobId)
                  })
              })
              .catch((err)=>{
                  console.log(err)
              })
              
      }

      reqList() {
        
    }

  render() {
    if (this.state.job.job_requirements) {
        this.state.requirements = this.state.job.job_requirements.map((requirement, i) => {
            return (
                <Text key={i} style={styles.reqTab}>
                    {requirement}
                </Text>
            )
        })
    } else {
        this.state.requirements = <Text>Loading...</Text>
    }
    
    if (this.state.job.job_benefits) {
        this.state.benefits = this.state.job.job_benefits.map((benefit, i) => {
            return (
                <Text key={i}>
                    <Ionicons name="ios-checkbox" size={16} color="#6c028a" /> {benefit}
                </Text>
            )
        })
    } else {
        this.state.benefits = <Text>Loading...</Text>
    } 

    if (this.state.job.job_about_company) {
        this.state.devTools = this.state.job.job_about_company.map((devTool, i) => {
            if(devTool) {
                return (
                    <Text key={i}>
                        <Ionicons name="md-happy" size={16} color="#00c900" /> {devTool} DevTool {i + 1}
                    </Text>
                )
            } else {
                return (
                    <Text key={i}>
                        <Ionicons name="md-sad" size={16} color="#e30808" /> {devTool} DevTool {i + 1} 
                    </Text>
                )
            }
        })
    } else {
        this.state.devTools = <Text>Loading...</Text>
    } 

    if(this.state.job !== 'default') {
        return (
            <Container>
                <Content>
                    <View style={styles.infoCtnTitle}>
                            <View style={styles.titleBox}>
                                <Text style={[styles.bold, styles.title]}>{this.state.job.job_title}</Text>
                                <Text style={[styles.salary]}>{this.state.job.job_salary}$</Text>
                            </View>
                            <Text >
                                <Text style={[styles.gray, styles.secondaryInfo, styles.headerBox]}>Company:</Text> <Text style={[styles.secondaryInfo, styles.headerBox]}>{this.state.job.job_company}</Text>
                            </Text>
                            <Text>
                                <Text style={[styles.gray, styles.secondaryInfo, styles.headerBox]}>From:</Text> <Text style={[styles.secondaryInfo, styles.headerBox]}>amazoon.com</Text>
                            </Text>
                        </View>
                    <Card style={styles.infoCtn}>
                            <CardItem>
                                <Body>
                                    <View>
                                        <Text style={[styles.bold, styles.sectionTitle]}>DESCRIPTION</Text>
                                        <Text>
                                            {this.state.job.job_description}  
                                        </Text>
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                    <Card style={styles.infoCtn}>
                            <CardItem>
                                <Body>
                                    <View>
                                        <Text style={[styles.bold, styles.sectionTitle]}>REQUIREMENTS</Text>
                                        <View style={styles.reqList}>
                                            {this.state.requirements}
                                        </View>
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                    <Card style={styles.infoCtn}>
                            <CardItem>
                                <Body>
                                    <View>
                                        <Text style={[styles.bold, styles.sectionTitle]}>BENEFITS</Text>
                                        {this.state.benefits}
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                    <Card style={styles.infoCtn}>
                            <CardItem>
                                <Body>
                                    <View>
                                        <Text style={[styles.bold, styles.sectionTitle]}>ABOUT COMPANY</Text>
                                        {this.state.devTools}
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                    <Card style={styles.infoCtn}>
                        <CardItem>
                            <Body>
                                <View>
                                    <Text style={[styles.bold, styles.sectionTitle]}>CONTACT</Text>
                                    <Text>
                                        <Text><Text style={styles.bold}>Tel.</Text> {this.state.job.job_telephone}</Text>
                                    </Text>
                                    <Text><Text style={styles.bold}>Email.</Text> {this.state.job.job_email}</Text>
                                </View>
                            </Body>
                        </CardItem>
                    </Card>
                    <TouchableOpacity onPress={this.handlePress} style={[styles.infoCtnFlex]}>
                            <Text style={styles.btn}>Apply</Text>
                        </TouchableOpacity>
                </Content>
            </Container>
        )
    } else {
        return (
            <Container style={styles.container}>
                <ActivityIndicator size="large" color="#6c028a" />
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
    infoCtnTitle: {
        marginLeft: 10,
        marginRight: 10,
        borderBottomColor: '#6c028a',
        borderBottomWidth: 5,
        padding: 15
    },
    sectionTitle: {
        fontSize: 18,
        marginBottom: 5
    },
    gray: {
        color: '#7D8795'
    },
    bold: {
      fontWeight: 'bold'
    },
    title: {
        fontSize: 24
    },
    salary: {
        fontSize: 18
    },
    titleBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    headerBox: {
        marginTop: -5
    },
    secondaryInfo: {
        fontSize: 12
    },
    infoCtn: {
        marginLeft: 10,
        marginRight: 10,
        borderBottomColor: '#6c028a',
        borderBottomWidth: 5,
        shadowColor: '#ddd',
        shadowOffset: { width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 15,
    },
    infoCtnFlex: {
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center'
    },
    reqTab: {
        backgroundColor: '#6c028a',
        color: '#fff',
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 4,
        fontSize: 14,
        textAlign: 'center',
        alignSelf: 'flex-start',
        marginRight: 5,
        marginBottom: 5
    },
    reqList: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    btn: {
        color: '#fff',
        backgroundColor: '#6c028a',
        elevation: 3,
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 4,
        textAlign: 'center',
        marginBottom: 15,
        fontSize: 18
    }
})
