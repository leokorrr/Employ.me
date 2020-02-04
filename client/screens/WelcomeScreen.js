import React, { Component } from 'react';
import { Container, Header, Content, Input, Item, Button, Text, ListItem, CheckBox, Body } from 'native-base';
import { StyleSheet, View, Modal, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import HeaderPart from './Header';

export default class WelcomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            jobTitle: '',
            dataToSend: {},
            salary: '',
            reqs: [
                'Requirement 1',
                'Requirement 2',
                'Requirement 3',
                'Requirement 4',
                'Requirement 5',
                'Requirement 6',
                'Requirement 7',
                'Requirement 8',
                'Requirement 9',
                'Requirement 10',
                'Requirement 11',
                'Requirement 12',
            ],
            reqsList: null,
            reqToSend: [],
            modalVisible: false,
            showFilters: [],
            cbs: [
                {
                    id: 1,
                    title: 'Requirement 1',
                    checked: false
                },
                {
                    id: 2,
                    title: 'Requirement 2',
                    checked: false
                },
                {
                    id: 3,
                    title: 'Requirement 3',
                    checked: false
                },
                {
                    id: 4,
                    title: 'Requirement 4',
                    checked: false
                },
                {
                    id: 5,
                    title: 'Requirement 5',
                    checked: false
                },
                {
                    id: 6,
                    title: 'Requirement 6',
                    checked: false
                },
                {
                    id: 7,
                    title: 'Requirement 7',
                    checked: false
                },
                {
                    id: 8,
                    title: 'Requirement 8',
                    checked: false
                },
                {
                    id: 9,
                    title: 'Requirement 9',
                    checked: false
                },
                {
                    id: 10,
                    title: 'Requirement 10',
                    checked: false
                },
                {
                    id: 11,
                    title: 'Requirement 11',
                    checked: false
                },
                {
                    id: 12,
                    title: 'Requirement 12',
                    checked: false
                },
            ]
        }
    }


    // static navigationOptions = {
    //     headerTitle: () => <HeaderPart></HeaderPart>,
    //     headerStyle: {
    //         backgroundColor: "#6c028a",
    //     },
    //     headerTitleStyle: {
    //         color: "white"
    //     },
    // }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: () => <HeaderPart></HeaderPart>,
            headerStyle: {
                backgroundColor: "#6c028a",
            },
            headerTitleStyle: {
                color: "white"
            },
        };
      };
    

    getReqs() {
        let reqsFounded = [];
        for (let i = 0; i < this.state.cbs.length; i++) {
            if(this.state.cbs[i].checked) {
                reqsFounded.push(this.state.cbs[i].title)
                this.setState({
                    reqToSend: reqsFounded
                })
            }
        }
    }

    setData() {
        this.state.dataToSend = { 
            jobTitle: this.state.jobTitle,
            salary: this.state.salary,
            requirements: this.state.reqToSend
        }
    }

    sendData = async () => {
        await this.getReqs();
        await this.setData()
        const url = 'http://192.168.8.102:5000/api/native-jobs';
        await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.dataToSend)
        })
    }

    handleSubmit = () => {
        setTimeout(()=>{
            this.props.navigation.navigate('SearchResult')
        }, 500)
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    updateCheckbox(id) {
        const changedCheckbox = this.state.cbs.find((cb) => cb.id === id);
      
        changedCheckbox.checked = !changedCheckbox.checked;

        this.state.cbs[changedCheckbox.id - 1].checked = changedCheckbox.checked
        this.forceUpdate()
      }

    removeFilters() {
        for (let i = 0; i < this.state.cbs.length; i++) {
            this.state.cbs[i].checked = false;
            this.forceUpdate()
        }
    }

    removeEverything() {
        this.setState({jobTitle: ''})
        this.setState({salary: ''})

        for (let i = 0; i < this.state.cbs.length; i++) {
            this.state.cbs[i].checked = false;
            this.forceUpdate()
        }
    }

  render() {

    this.state.reqsList = this.state.cbs.map((cb, i) => {
        return (
            <View style={styles.filter} key={i}>
                <CheckBox key={cb.id} title={cb.title} checked={cb.checked} onPress={() => this.updateCheckbox(cb.id)} color="#6c028a"/>
                <Text style={styles.filterName}>{cb.title}</Text>
            </View>
        )
    })

    this.state.showFilters = this.state.cbs.map((cb, i) => {
        if (cb.checked) {
            return (
                <View key={cb.id}>
                    <Text style={styles.reqTab}>{cb.title}</Text>
                </View>
            )
        }
    })
    
    return (
        <Container style={styles.container}>
            <Content>
                <View style={styles.label}>
                    <Text style={styles.bold}>Work title:</Text>
                </View>
                <Item style={styles.inputCtn}>
                    <Input style={styles.input} 
                        placeholder='Type dreamed work title...' 
                        placeholderTextColor="#777" 
                        onChangeText={(text) => this.setState({jobTitle: text})} value={this.state.jobTitle} maxLength={200}/>
                </Item>
                <View style={styles.label}>
                    <Text style={styles.bold}>Salary:</Text>
                </View>
                <Item style={styles.inputCtn}>
                    <Input style={styles.input} keyboardType={'numeric'}  
                        placeholder='Type dreamed salary...' 
                        placeholderTextColor="#777" 
                        onChangeText={(number) => this.setState({salary: number})} value={this.state.salary} maxLength={200}/>
                </Item>
                <View style={styles.filtersCtn}>
                    <View style={styles.btnCtn}>
                        <Button  style={styles.btnOutline} onPress={() => {this.setModalVisible(true);}}>
                            <Text style={styles.btnTextFilters}>Filters +</Text>
                        </Button>
                    </View>
                    <Modal transparent={false} visible={this.state.modalVisible} animationType="fade" style={styles.modal}>
                        <Container style={styles.container}>
                            <Content>
                                <View style={styles.modalHeader}>
                                    <TouchableHighlight onPress={() => { this.setModalVisible(!this.state.modalVisible); }}>
                                        <Ionicons name="md-close" size={32} color="black" />
                                    </TouchableHighlight>
                                </View>
                                <View style={styles.filtersCtn}>
                                    <Text style={[styles.bold, styles.filtersTitle]}>Filters:{"\n"}</Text>
                                    <View style={styles.filtersListCtn}> 
                                        {this.state.reqsList}
                                    </View>
                                </View>
                                <View style={[styles.btnCtn, styles.btnMargin]}>
                                    <Button style={styles.btnOutline} onPress={() => {this.removeFilters()}}>
                                        <Text style={styles.btnText} style={styles.btnTextFilters}>Remove filters</Text>
                                    </Button>
                                </View>
                                <View style={[styles.btnCtn, styles.filterBtnMargin]}>
                                    <Button  style={styles.button} onPress={() => {this.setModalVisible(!this.state.modalVisible); this.sendData(); this.handleSubmit();}}><Text style={styles.btnText}>Search</Text></Button>
                                </View>
                                
                            </Content>
                        </Container>
                    </Modal>
                </View>
                <View style={styles.appliedFilters}>{this.state.showFilters}</View>
                <View style={[styles.btnCtn, styles.btnMargin]}>
                    <Button style={styles.btnOutline} onPress={() => {this.removeEverything()}}>
                        <Text style={styles.btnText} style={styles.btnTextFilters}>Remove All</Text>
                    </Button>
                </View>
                <View style={styles.btnCtn}>
                    <Button  style={[styles.button, styles.buttonSearchMain]} onPress={() => {this.sendData(); this.handleSubmit();}}><Text style={styles.btnText}>Search</Text></Button>
                </View>
            </Content>
        </Container>
    )
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ctnFlex: {
        flex: 1,
        flexDirection: 'column',
    },
    btnMargin: {
        marginRight: 20,
        marginLeft: 20,
        marginBottom: -15
    },
    filterBtnMargin: {
        marginBottom: 20
    },
    button: {
        marginTop: 40,
        height: 60,
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "#6c028a"
    },
    appliedFilters: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 25,
        marginBottom: -15,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    buttonSearchMain: {
        marginTop: 60
    },
    btnOutline: {
        height: 40,
        borderWidth: 2,
        borderColor: "#6c028a",
        backgroundColor: 'transparent',
        marginTop: 30,
        flex: 1,
        width: '100%'
    },
    label: {
        marginLeft: 20,
        marginTop: 30,
        fontWeight: 'bold'
    },
    modalHeader: {
        flex:1,
        flexDirection: 'row-reverse',
        paddingTop: 20,
        marginLeft: 20
    },
    reqTab: {
        backgroundColor: '#6c028a',
        color: '#fff',
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 4,
        fontSize: 12,
        textAlign: 'center',
        alignSelf: 'flex-start',
        marginRight: 5,
        marginBottom: 5
    },
    btnCtn: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    filtersTitle: {
        fontSize: 24,
        marginBottom: -15
    },
    modal: {
        width: '90%',
        height: '90%'
    },
    btnText: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        textAlign: 'center',
        fontSize: 16,
    },
    btnTextFilters: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        textAlign: 'center',
        fontSize: 16,
        color: "#6c028a",

    },
    inputCtn: {
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 4,
        paddingLeft: 8,
        paddingRight: 8,
        borderColor: '#ddd',
        borderBottomWidth: 2
    },
    filtersCtn: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: -15
    },
    filter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: -10,
        marginBottom: 10,
        alignItems: 'center'
    },
    filterName: {
        marginLeft: 15,
        textAlign: 'center',
        fontSize: 18
    },
    bold: {
        fontWeight: 'bold'
    },
})
