import React, {Component} from 'react'
import {Text, View, StyleSheet, Button, Alert, TextInput, ScrollView} from 'react-native'
import SessionService from '../service/SessionService';
import NewsListContainer from "../component/NewsListContainer";


import {Icon} from 'react-native-elements';
import ActionButton from "react-native-action-button";

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.onPressTitle = this.onPressTitle.bind(this);
  }

  async componentWillMount() {
    let sessionAlive = await SessionService.isSessionAlive();
    if (!sessionAlive) {
      const {navigate} = this.props.navigation;
      navigate('Login');
    }
  }

  onPressTitle() {
    const {navigate} = this.props.navigation;
    navigate('AreYouOk');
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1.8}}>
          {/* TODO add styles.container for scroll view?*/}
          <Text style={styles.paragraph} onPress={this.onPressTitle}>
            Home
          </Text>
          <NewsListContainer/>
        </ScrollView>
        {/*<ActionButton style={{flex: 0.2}}
                      buttonColor="rgba(231,76,60,1)"
                      onPress={() => Alert.alert("Seguime", "Seguimiento activado \uD83D\uDE00")}
                      icon={(<Icon name="person-pin-circle" color="white" size={26}/>)}>
        </ActionButton>*/}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
    color: '#34495e'
  }
});