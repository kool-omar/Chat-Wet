
 import React, { Component } from 'react';
 import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    TouchableOpacity
  } from 'react-native';

  import { firebaseAuth } from '../Firebase'
  import * as Constants from '../constants'


export default class Chat extends Component {



    static navigationOptions = ({navigation}) => {
        return {
           title: 'Chat',
           gesturesEnabled: false,
           headerLeft: (
               <Button
                    onPress = {() => {
                        firebaseAuth.signOut().then(() => {
                            navigation.goBack()
                        })
                    }}
                    title = "Logout"
        
                />
           ),
   
   
           }
           
         }

    
    render(){
        return (
            <View style = {styles.container}>
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor: Constants.Colors.white,

    },
})