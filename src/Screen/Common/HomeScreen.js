import React, { Component } from 'react'
import { 
    Text, 
    View, 
    ActivityIndicator, 
    ScrollView, 
    FlatList, 
    Dimensions,
    NativeModules
  } from 'react-native'
import _ from 'lodash'

import Screen from './../Components/Screen'
import { moderateScale } from 'react-native-size-matters'
import Card from './../Components/Card'
import CardMiniBox from '../Components/CardMiniBox'

const {width, height} = Dimensions.get("screen")
const dataDum = require('../../Assets/dataDummy')

const { ServiceModule } = NativeModules

class HomeScreen extends Component {
   

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
    console.log("[HomeScreen] componentDidMount")
    this.FetchListQuery()
  }


   FetchListQuery = async (cursor) => {
      await ServiceModule.fetchList(cursor || "" , (res) => {
        const launchesNativeData = JSON.parse(res)
        // console.log("FetchListQuery launchesNativeData",launchesNativeData )

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

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const result = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20; // to measure if the scrollview reach the end of bottom
    return result 
  }


  render() {
    const dataDum = _.get(this.state, "data", null)

    const data = _.get(this.state, "dataGraphql", null)
    return (
      <Screen>
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
        <ScrollView 
          style={{paddingTop:moderateScale(16,0.25)}}
          onScroll={({nativeEvent}) => {
            if (this.isCloseToBottom(nativeEvent) == true && this.state.update == false) {
              this.loadMore()
            }
          }}
        >
          
          <CardMiniBox
            navigation={this.props.navigation}
          />
          
          <FlatList
            data= {this.state.dataGraphql}
            // data= {dataDum}
            extraData={this.state.dataGraphql}
            renderItem={(item) => {
              return(
                <Card
                  navigation={this.props.navigation}
                  data= {item.item}
                />
              )
            }}
            style={{
              paddingBottom: moderateScale(20)
            }}
            keyExtractor={(item, index) => index.toString()}
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
        </ScrollView>
        }
      </Screen>
    )
  }
}

export default HomeScreen