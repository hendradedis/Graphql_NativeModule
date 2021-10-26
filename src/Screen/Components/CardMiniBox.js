import React, { Component } from 'react'
import { Text, View,FlatList, ScrollView, ActivityIndicator, Alert, NativeModules } from 'react-native'

import { moderateScale } from 'react-native-size-matters'
import _ from 'lodash'

import CardMini from './CardMini'
import { TouchableOpacity } from 'react-native-gesture-handler'

const dataDum = require('../../Assets/dataDummy')

const { ServiceModule } = NativeModules

export default class CardMiniBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: dataDum.lauches,
      dataGraphql: [],
      isLoading:false,
      cursor:'',
      update:false,
      hasMore:true
    }
  }

  componentDidMount(){
    console.log("[CardMiniBox] componentDidMount")
    this.FetchListQuery()
  }

  FetchListQuery = async (cursor) => {
    await ServiceModule.fetchList(cursor || "" , (res) => {
      const launchesNativeData = JSON.parse(res)
      // console.log("FetchListQueryku launchesNativeData",launchesNativeData )

      let cursor = launchesNativeData.cursor
      let hasMore = launchesNativeData.hasMore

      let { launches } = launchesNativeData
      let prevDataofLaunches: any = this.state.dataGraphql

      let newData: Array = launches
      let combinedData: Array = prevDataofLaunches.concat(newData)

      this.setState({
        dataGraphql: combinedData,
        cursor:cursor,
        hasMore:hasMore,
        isLoading:false
      })
    })
}

loadMore = () => {
  let DataCursor = _.get(this.state, "cursor", "")
    if(this.state.hasMore === true) {
      this.setState({
        update: true
      })
    }

    this.FetchListQuery(DataCursor)
}

  handleAll=(data)=> {
    let dataKontent =  data.data
    this.props.navigation.navigate("ListScreen", {dataKontent});
  }

  isCloseToSide = ({layoutMeasurement, contentOffset, contentSize}) => {
    const result = layoutMeasurement.width + contentOffset.x >= contentSize.width - 20; // to measure if the scrollview reach the end of bottom
    return result 
  }

  render() {
    const data = _.get(this.state, "dataGraphql", null)
    return (
      <ScrollView 
        style={{marginBottom:moderateScale(15,0.25)}}
        showsVerticalScrollIndicator={false}
        onScroll={({nativeEvent}) => {
          if (this.isCloseToSide(nativeEvent) == true && this.state.update == false) {
            this.loadMore()
          }
        }}
      >
        {
          this.state.isLoading === true ? 
          <View style={{ justifyContent:'center', alignItems:'center', height:'80%', flex:1}}>
            <ActivityIndicator
              size={'large'}
              color={'#ffff'}
              style={{justifyContent:'center', alignSelf:'center'}}
            />  
         </View>  
         :
       <View>
         <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between'}}>
          <Text style={{color:'#ffff', fontSize:moderateScale(18,0.25), fontWeight:'700', marginBottom:moderateScale(10,0.25)}}>Rocket</Text>
         </View>
        <FlatList
          data= {data}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={(item) => {
            // console.log("itemku", item)
            return(
              <CardMini
                navigation={this.props.navigation}
                data= {item.item}
                miniCard={true}
              />
            )
          }}
          keyExtractor={(item, index) => String(item)} 
          ListFooterComponent={() => {
            if(this.state.update === true) {
              return(
                <ActivityIndicator size={'small'} color={"#07A7B8"} />
              )
            } else {
              return null
            }
          }} 
        />
       </View>   
        }
      </ScrollView>
    )
  }
}
