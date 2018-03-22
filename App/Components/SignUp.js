
import React, { Component } from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
  } from 'react-native';

  import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';

  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
  import { StackNavigator } from 'react-navigation'
  import * as Constants from '../constants'
  import Form from './Form'
  import ModalHeader from './ModalHeader'
  import { validateClientEmail, validateEmailAndPassword } from '../Helpers'

  import { firebaseAuth } from '../Firebase'

  export default class SignUp extends Component{

    constructor(props){
        super(props)

        console.log("Sign up props",this.props.navigation.state)
        this.state = {
            userName: '',
            email: '',
            password: '',
            showLoader: false,
        }
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
      
      getState = (state) => {
         this.state = state
          console.log('sign up state ', state)
      }

      goBack = () => {
          this.props.navigation.goBack()

      }


      onRegister = (state) => {

        const { email, password } = state;
        this.setState({
            showLoader: true
        })
        firebaseAuth.createUserWithEmailAndPassword(email, password)
          .then((user) => {
            // If you need to do anything with the user, do it here
            // The user will be logged in automatically by the
            // `onAuthStateChanged` listener we set up in App.js earlier
            this.setState({
                showLoader: false
            })
            this.goBack()
            user.updateProfile({                
                displayName: state.userName,

              }).then(function() {
                
              }, function(error) {
                // An error happened.
                const { code, message } = error
                alert(message)
              });
          })
          .catch((error) => {
            const { code, message } = error;
            // For details of error codes, see the docs
            // The message contains the default Firebase string
            // representation of the error
            this.setState({
                showLoader: false
            })
            alert(message)
          });
      }

      onPressConfirm = (state) => {
        console.log('sign up', state.email)
       if( validateEmailAndPassword(state.email,state.password)){
            this.onRegister(state)
       }
       else {
           console.log('else krdia')
       }
      }

    render(){
        return (
            <View style = {styles.container}>
                <ModalHeader
                    onPressClose = {this.goBack}
                />
                <KeyboardAwareScrollView contentContainerStyle = {styles.keyboardAwareView} >

                    <View style = {styles.loader}>
                     { this.state.showLoader ? < Pulse  size={30} color={Constants.Colors.skyBlue} /> : null }
                    </View>
                    <Form 
                    style = {styles.form}
                    userName={true}
                    submitButtonText = {'Confirm'}
                    onPressSubmit = {this.onPressConfirm}
                    email = {this.props.navigation.state.params.email}
                    getState = {this.getState}
                    
                    />



                </KeyboardAwareScrollView>
            </View>
        )
    }

  }

  

  const styles = StyleSheet.create({

    loader : {

        paddingBottom : 40
    },

    container : {
        
        flex: 1,
        backgroundColor: Constants.Colors.white
    },

    keyboardAwareView: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    form: {

    },

  })

  