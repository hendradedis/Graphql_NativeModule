import React, { Component } from 'react'
import { ImageBackground, Text, View, Dimensions, NativeModules } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import Screen from '../Components/Screen'
import FastImage from "react-native-fast-image";
import _ from 'lodash'

const {width, height} = Dimensions.get('screen')
const { ServiceModule } = NativeModules

class DetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resData: null,
      isLoading:false
    }
  }

  componentDidMount() {
    console.log("[componentDidMount] DetailScreen")
    this.fetchDetailQuery()
  }

  fetchDetailQuery = async () => {
    const {navigation, route} = this.props
    let id = route.params.payload.id
      await ServiceModule.FetchDetail(id, (res) => {
        let data = JSON.parse(res)

        this.setState({
          resData: data,
          isLoading:false
        })
      })
  }

  render() {
    const {navigation, route} = this.props
    // let missionName = route.params.payload.missionName
    // let site = route.params.payload.site
    // let rocketName = route.params.payload.rocketName
    // let rocketType = route.params.payload.rocketType
    let id = _.get(route.params, "payload.id", 1)

    let missionName = _.get(this.state.resData,"mission.name", "")
    let site = _.get(this.state.resData, "site", "")
    let rocketName = _.get(this.state.resData, "rocket.name", "")
    let rocketType = _.get(this.state.resData,"rocket.type", "")
    return (
      <Screen>
        <View style={{justifyContent:'center', alignItems:'center'}}>
          <FastImage
            source={require('../../Assets/rockets.gif')}
            style={{width:width/3, height:height/2.3, marginTop:moderateScale(11,0.25)}}
          />
        </View>
        {
          this.state.isLoading === true ?
          <View style={{ justifyContent:'center', alignItems:'center', height:'80%', flex:1}}>
            <ActivityIndicator
              size={'large'}
              color={'#07A7B8'}
              style={{justifyContent:'center', alignSelf:'center'}}
            />  
         </View>  
         :
        <View style={{flex:1, marginVertical:moderateScale(10,0.25)}}>
          <Text></Text>
          <Text style={{color:'#07A7B8', fontSize:moderateScale(25, 0.25), fontWeight:'bold', alignSelf:'center'}}>{site}</Text>

          <View style={{flex:1, marginTop:moderateScale(25,0.25)}}>
          <Text style={{color:'white', fontSize:moderateScale(20,0.25), fontWeight:'bold'}}>Rocket Name</Text>  
            <Text style={{color:'#07A7B8'}}>{rocketName}</Text>
          <Text style={{color:'white', fontSize:moderateScale(20,0.25), fontWeight:'bold', marginTop:moderateScale(16,0.25)}}>Mission</Text>
            <Text style={{color:'#07A7B8'}}>{missionName}</Text>
          <Text style={{color:'white', fontSize:moderateScale(20,0.25), fontWeight:'bold', marginTop:moderateScale(16,0.25)}}>Rocket Type</Text>
            <Text style={{color:'#07A7B8'}}>{rocketType}</Text>
          </View>
        </View>
        }
      </Screen>
    )
  }
}

export default DetailScreen