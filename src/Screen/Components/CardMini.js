import React, { Component } from 'react'
import { Text, View, StyleSheet, ActivityIndicator, Image, Alert, TouchableOpacity } from 'react-native'
import _ from 'lodash'
import {moderateScale} from 'react-native-size-matters'
import {useNavigation} from '@react-navigation/native'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import placeHolderIcon from '../../Assets/PlaceHolderIcon.png'

class CardMini extends Component {

  constructor(props){
    super(props)
    this.state={
      data:_.get(this.props, "data", null),
      imageUrl:props.data.mission.missionPatch
    }
  }

  handlePress = ({site, missionName,rocketName, iconUrl, rocketType, id}) => {
    let payload = {
      site: site,
      missionName: missionName,
      iconUrl: iconUrl,
      rocketName: rocketName,
      rocketType: rocketType,
      id: id
    }
    this.props.navigation.navigate("DetailScreen", {payload});
  }

  render() {
    let data = this.state.data
    let site = data.site
    let id = data.id
    let missionName = data.mission.name
    let iconUrl = data.mission.missionPatch
    let rocketName = data.rocket.name
    let rocketType = data.rocket.type

    return (
      <View style={styles.container}>
        {
          data === null ? 
          <View style={{ justifyContent:'center', alignItems:'center', height:'80%', flex:1}}>
            <ActivityIndicator
              size={'large'}
              color={'#ffff'}
              style={{justifyContent:'center', alignSelf:'center'}}
            />  
         </View>  
         :
         <TouchableOpacity onPress={() => 
          this.handlePress({
            site: site,
            missionName: missionName,
            iconUrl: iconUrl,
            rocketName: rocketName,
            rocketType: rocketType,
            id : id
         })}>
          <View style={{flexDirection:'row', paddingRight:moderateScale(12)}}>
            <View style={{flexDirection:'column',}}>
            {
                iconUrl === undefined ? 
                <Image
                  source={require('../../Assets/PlaceHolderIcon.png')}
                  style={styles.icon}
                />
                :
                <Image
                  source={{uri:iconUrl}}
                  style={styles.icon}
                />
              }
            </View>
            
            <View style={{flexDirection:'column', marginHorizontal:moderateScale(10,0.25), paddingRight:moderateScale(10,0.25)}}>
              <Text style={{color:'#e84118', fontSize:moderateScale(11)}}>{site}</Text>
              <Text style={{color:'white', fontSize:moderateScale(12)}}>{missionName}</Text>
                <View style={{flexDirection:'row'}}>
                  <Text style={{color:'white',marginRight:moderateScale(10), fontSize:moderateScale(10)}}>{rocketType}</Text>
                  <Text style={{color:'white', fontSize:moderateScale(10)}}>{rocketName}</Text>
                </View>
            </View>
            
          </View>
         </TouchableOpacity> 
         
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginRight:moderateScale(10,0.25), 
    backgroundColor:'#07A7B8', 
    width: moderateScale(200, 0.25), 
    height:moderateScale(100, 0.25), 
    borderRadius:moderateScale(6, 0.25), 
    padding:moderateScale(10,0.25),
    justifyContent:'center'
  },
  icon: {
    width:moderateScale(70, 0.25), 
    height:moderateScale(70, 0.25)
  }
})

export default CardMini