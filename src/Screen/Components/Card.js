import React, { Component } from 'react'
import { Text, View, StyleSheet, ActivityIndicator, Image, Alert } from 'react-native'
import _ from 'lodash'
import {moderateScale} from 'react-native-size-matters'
import { TouchableOpacity } from 'react-native-gesture-handler'
import placeHolderIcon from '../../Assets/PlaceHolderIcon.png'


class Card extends Component {

  constructor(props){
    super(props)
    this.state={
      data:_.get(this.props, "data", null),
      imageUrl:props.data.mission.missionPatch
    }
  }

  handlePress=({site, missionName, iconUrl, rocketName, rocketType, id}) => {
    let payload = {
      site: site,
      missionName: missionName,
      iconUrl: iconUrl,
      rocketName: rocketName,
      rocketType: rocketType,
      id:id
    }
    this.props.navigation.navigate("DetailScreen", {payload});
  }

  componentDidMount() {
    console.log("[Card] componentDidMount")
  }

  render() {
    let data = this.state.data
    let site = data.site
    let missionName = data.mission.name
    let rocketName = data.rocket.name
    let rocketType = data.rocket.type
    let iconUrl = data.mission.missionPatch
    let id = data.id

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
            rocketType:rocketType,
            id: id
          })
         }>
          <View style={{flexDirection:'row'}}>
            <View style={{flexDirection:'column',width:'25%' }}>
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
            
            <View style={{flexDirection:'column',width:'75%'}}>
              <Text style={{color:'#ffffff', fontSize:moderateScale(16,0.25), fontWeight:'bold'}}>{missionName}</Text>
              <Text style={{color:'#e84118',fontSize:moderateScale(12,0.25), }}>{site}</Text>
                <View style={{flexDirection:'row', marginTop:moderateScale(8,0.25)}}>
                  <Text style={{color:'#ffff'}}>{rocketType}</Text>
                  <Text style={{color:'#ffff', marginLeft:moderateScale(25,0.25)}}>{rocketName}</Text>
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
    marginBottom:moderateScale(10,0.25), 
    backgroundColor:'#07A7B8', 
    width: '100%', 
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

export default Card