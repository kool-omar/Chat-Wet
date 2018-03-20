
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
  
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
  import { StackNavigator } from 'react-navigation'
  import * as Constants from '../constants'
  import Form from './Form'
  import ModalHeader from './ModalHeader'

  export default class SignUp extends Component{

    constructor(props){
        super(props)

        console.log("Sign up props",this.props.navigation.state)

    }

    static navigationOptions = ({navigation}) => {
     return {
        title: 'Sign Up',
        headerLeft: (
            <Button
            onPress={() => navigation.goBack()}
            title="X"

          />
        ),


        }
        
      }
      
      onPressClose = () => {
          this.props.navigation.goBack()
      }

      onPressConfirm = () => {
        console.log('sign up')
      }

    render(){
        return (
            <View style = {styles.container}>
                <ModalHeader
                    onPressClose = {this.onPressClose}
                />
                <KeyboardAwareScrollView contentContainerStyle = {styles.keyboardAwareView} >
                
                    <Form 
                    style = {styles.form}
                    userName={true}
                    submitButtonText = {'Confirm'}
                    onPressSubmit = {this.onPressConfirm}
                    email = {this.props.navigation.state.params.email}
                    />



                </KeyboardAwareScrollView>
            </View>
        )
    }

  }

  

  const styles = StyleSheet.create({

    container : {
        // justifyContent: 'center',
        // alignItems: 'center',
        flex: 1,
        backgroundColor: Constants.Colors.white
    },

    keyboardAwareView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    form: {
        backgroundColor: Constants.Colors.steelBlue
    },

  })

  