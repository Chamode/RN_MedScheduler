import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

class Http extends Component {
   state = {
      data: ''
   }

   _api = () => {
    fetch(this.props.url, {
        method: this.props.HttpMethod
     })
     .then((response) => response.json())
     .then((responseJson) => {
        console.log(responseJson);
        this.setState({
           data: responseJson
        })
     })
     .catch((error) => {
        console.error(error);
     });
   }
   render() {
      return (
         <View>
         </View>
      )
   }
}
export default Http