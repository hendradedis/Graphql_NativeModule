import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Screen from '../Components/Screen';

class ListScreen extends Component {
  render() {
    let data = this.props.data
    return (
      <Screen>
        <Text style={{color:'white'}}> Test ListScreen </Text>
      </Screen>
    )
  }
}

export default ListScreen;