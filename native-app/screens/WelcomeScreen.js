import React, { Component } from 'react';
import { Container, Header, Content, Input, Item, Button, Text, ListItem, CheckBox, Body } from 'native-base';
import { StyleSheet, View } from 'react-native';

export default class WelcomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            checkedSalary: false,
            checkedTitle: false,
            searchJobTitle: ''
        }
    }

    static navigationOptions = {
        title: 'Employ.me',
        headerStyle: {
            backgroundColor: "#6c028a",
        },
        headerTitleStyle: {
            color: "white"
        },
    }

    handleCheckSalaryFilter = () => {
        this.setState({ 
            checkedSalary: !this.state.checkedSalary,
            checkedTitle: false
        })
    }

    handleCheckTitleFilter = () => {
        this.setState({ 
            checkedTitle: !this.state.checkedTitle,
            checkedSalary: false
        })
    }

    handleSearch = () => {
        this.props.navigation.navigate('SearchResult', {
            salaryFilter: this.state.checkedSalary,
            titleFilter: this.state.checkedTitle,
            searchJobTitle: this.state.searchJobTitle
        })
    }

    

  render() {
    
    return (
        <Container>
            <Content style={styles.ctnFlex}>
                <Item style={styles.inputCtn}>
                    <Input style={styles.input} placeholder='Type dreamed work title...' placeholderTextColor="#777" onChangeText={(text) => this.setState({searchJobTitle: text})}/>
                </Item>
                <Body style={styles.filtersCtn}>
                    <View>
                        <Text style={styles.bold}>Filter by:</Text>
                    </View>
                    <View style={styles.filter}>
                        <CheckBox checked={this.state.checkedSalary} color="#6c028a" onPress={this.handleCheckSalaryFilter}/>
                        <Text style={styles.filterName}>Salary</Text>
                        <CheckBox checked={this.state.checkedTitle} color="#6c028a" onPress={this.handleCheckTitleFilter}/>
                        <Text style={styles.filterName}>Title (A-Z)</Text>
                    </View>
                </Body>
                <View style={styles.btnCtn}>
                    <Button  style={styles.button} onPress={this.handleSearch}><Text style={styles.btnText}>Search</Text></Button>
                </View>
            </Content>
        </Container>
    )
  }
}


const styles = StyleSheet.create({
    ctnFlex: {
        flex: 1,
        flexDirection: 'column',
    },
    button: {
        marginTop: 40,
        width: 200,
        height: 60,
        backgroundColor: "#6c028a"
    },
    btnCtn: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnText: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        textAlign: 'center',
        fontSize: 16
    },
    inputCtn: {
        marginTop: 30,
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
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 30,
        marginTop: 20,
    },
    filter: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    filterName: {
        marginLeft: 15
    },
    bold: {
        fontWeight: 'bold'
    },
})