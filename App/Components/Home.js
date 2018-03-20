/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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

import SignUp from './SignUp'
import * as Constants from '../constants'
import Form from './Form'
import Chat from './Chat'

const missionStatement = "The quintessential chat application"

type Props = {};
export default class HomeScreen extends Component<Props> {

  constructor(props){
    super(props)
    this.state = {
      email:'',
    }
    
  }

  
  static navigationOptions = {
    title: 'Home'
  }

  setEmail = (text) => {
    console.log('text',text)
    this.setState({
      email: text
    })
  }

  onPressLogin = () => {
      console.log("Login")
      this.props.navigation.navigate('Chat')
  } 

  onPressSignUp = () => {
    console.log("Sign up")
    this.props.navigation.navigate('SignUp', {
      hardcode: 69,
      email: this.state.email
    })
  }

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}
      
      >
        
        <Text style = {styles.titleText}
        >
          Chat Wet
          </Text>

        <Text style= {styles.statementText}> 
          {missionStatement}
          </Text>

        <Form 
          userName={false}
          submitButtonText = {'Login'}
          onPressSubmit = {this.onPressLogin}
          setEmail = {this.setEmail}
        />


            
       

       <TouchableOpacity style = {styles.signUpOpacity}

         onPress={this.onPressSignUp}
          >
         <Text style = {styles.signupOpacityText} > Sign Up </Text>
       </TouchableOpacity>


      </KeyboardAwareScrollView>
    );
  }
}

 const MainStack = StackNavigator({
    Home: {
      screen: HomeScreen,
    },
    Chat : {
      screen: Chat
    },
  },
  {
    

    
  }
)

export const RootStack = StackNavigator(
  {
    Main: {
      screen: MainStack,
      
    },
    SignUp: {
      screen: SignUp,
    },
  },
  {
    mode: 'modal',

    headerMode: 'none'
  }
);


const styles = StyleSheet.create({


  titleText : {
    color: Constants.Colors.skyBlue,
    fontSize: 35,
    marginTop: 50,
    marginBottom: 0,

  },

  statementText: {
    marginTop: 40,
    marginBottom: 80,
    color: 'thistle',
    fontSize: 17,
    textAlign: 'center',
  },


  signupOpacityText: {
    color:Constants.Colors.skyBlue,
  },

  signUpOpacity : {
    marginTop: 10,
  },

  


  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 10,
  },
 
});
