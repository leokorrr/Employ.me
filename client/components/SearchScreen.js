import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';

export default class SearchScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            text: 'Type job...',
            count: 0
        }
    }

    onPress = () => {
        this.setState({
          count: this.state.count+1
        });
    }

  render() {
    return (
      <View style={styles.container}>
            <View><TextInput style={styles.input}></TextInput></View>
            <View>
                <TouchableOpacity style={styles.button} onPress={this.onPress}>
                    <Text> Search...</Text>
                </TouchableOpacity>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#4286f4', 
    justifyContent: 'space-around'
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginTop: 60,
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 20
  },
  button: {
      backgroundColor: '#00BE68',
      alignItems: 'center',
      padding: 20,
      marginLeft: 15,
      marginRight: 15,
  }
});
