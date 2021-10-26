
import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

class Screen extends Component {
  render() {
    return (
      <View style={styles.container}>
        {
          this.props.children
        }
      </View>
    )
  }
}

export default Screen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001623",
    paddingHorizontal:moderateScale(16,0.25)
  }
})