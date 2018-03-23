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
import { firebaseAuth } from '../Firebase'
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader'
import { validateClientEmail, validateEmailAndPassword } from '../Helpers'


const missionStatement = "The quintessential chat application"

type Props = {};

export default class HomeScreen extends Component<Props> {

  constructor(props){
    super(props)
    this.state = {
      email:'',
      password: '',
      showLoader: false,
      initialising : true,
      user : null
    }
    
  }

  
  static navigationOptions = {
    title: 'Home'
  }

   /**
   * When the App component mounts, we listen for any authentication
   * state changes in Firebase.
   * Once subscribed, the 'user' parameter will either be null 
   * (logged out) or an Object (logged in)
   */

  componentDidMount() {
    this.authSubscription = firebaseAuth.onAuthStateChanged((user) => {
      this.setState({

        initialising: false,
        user,
      })
      this.authStateChanged(user)
    })
  }


  /**
   * Don't forget to stop listening for authentication state changes
   * when the component unmounts.
   */
  componentWillUnmount() {
    this.authSubscription();
  }


  authStateChanged = (user) => {
    if(user){
      this.props.navigation.navigate('Chat')
    }
  }


    setEmail = (text) => {
    this.setState({
        email: text
    })
    }

    setPassword = (text) => {
      this.setState({
          password: text
      })
    }

  onLogin = (state) => {
    const { email, password } = state;
    this.setState({
      showLoader: true
    })
    firebaseAuth.signInWithEmailAndPassword(email, password)

      .then((user) => {
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the 
        // `onAuthStateChanged` listener we set up in App.js earlier
        this.setState({
          showLoader: false
        })

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

 

  onPressLogin = () => {
      console.log("Login")
      if(validateEmailAndPassword(this.state.email,this.state.password)){
        this.onLogin(this.state)
      }
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
          { this.state.initialising ? < Pulse  size={40} color={Constants.Colors.skyBlue} /> :
            <View style = {styles.subView}>
              { !this.state.user ?
                <View style = {styles.subView}>
                    <View style = {styles.loader}>
                           { this.state.showLoader ? < Pulse  size={30} color={Constants.Colors.skyBlue} /> : null }
                      </View>
                          <Form 
                            userName={false}
                            submitButtonText = {'Login'}
                            onPressSubmit = {this.onPressLogin}
                            setEmail = {this.setEmail}
                            setPassword = {this.setPassword}

                          />
                           <TouchableOpacity style = {styles.signUpOpacity}

                                onPress={this.onPressSignUp}
                                >
                          <Text style = {styles.signupOpacityText} > Sign Up </Text>
                          </TouchableOpacity>
                          </View>
                          : <LoggedIn />
              }
              </View>
                          
          }

      </KeyboardAwareScrollView>
    );
  }
}

const LoggedIn = () =>( 
  <Text style = {styles.loggedInText}>
    Logged In
  </Text>
  )

 const MainStack = StackNavigator({
    Home: {
      screen: HomeScreen,
    },
    Chat : {
      screen: Chat
    },
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
  },
);


const styles = StyleSheet.create({

  loggedInText: {
    color: Constants.Colors.skyBlue,
    fontSize: 45,

  },

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

  
  subView :{
    alignItems: 'center',

  },

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 10,
  },
 
});
