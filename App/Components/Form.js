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

  import * as Constants from '../constants'


  export default class Form extends Component {

    constructor(props){
        super(props)

        this.state={
            userName:'',
            email: "",
            password : "",
        }
    }

    componentDidMount(){
        console.log('component mounted',this.props)
    }

    setParentState = () => {
        this.props.getState(this.state)
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps)
    }


    onChangeText = (text) => {
      console.log('text changed', text)
    }


    componentDidUpdate(nextProps,nextState){

    }

    render(){

        return (
            <View style = {styles.container}>
            <View style = {styles.textInputView}
            >

            {
                this.props.userName ?<View>
                                         <Text style = {styles.loginText}
                        
                                            >
                                            User Name
                                            </Text>
                                            <TextInput

                                            style = {styles.textInput}
                                            autoCorrect = {false}
                                            placeholder = {"User Name"}
                                            textColor= {'thistle'}
                                            onChangeText = { (text) => {
                                              console.log('username text',text)
                                              this.setState({
                                                userName: text
                                              })
                                              }
                                          }
                                            >   

                            
                                         </TextInput>
                                 </View>
                : null
            }
            <Text style = {styles.loginText}
              
            >
              Email
            </Text>
            <TextInput
              style = {styles.textInput}
              placeholder = {"Email"}
              textColor= {'thistle'}
              autoCorrect = {false}
              onChangeText = { (text) => {

                this.setState({
                  email: text
                })

              }}
              value = {this.props.email}

            >   

                
            </TextInput>

            <Text style = {styles.loginText}>
              Password
            </Text>
            <TextInput
              style = {styles.textInput}
              placeholder = {"Password"}
              textColor= {'thistle'}
              autoCorrect = {false}
              secureTextEntry = {true}
              onChangeText = { (text) => {
                this.setState({
                  password: text
                })

              }}
              
            >   

                
            </TextInput>
            </View>
             <TouchableOpacity
              style={styles.loginButton}
              onPress ={ () => {
                this.props.onPressSubmit(this.state)
              }}
                >
              <Text style = {styles.loginOpacityText} > {this.props.submitButtonText} </Text>
            </TouchableOpacity>
       </View>
        )
    }
  }


  const styles = StyleSheet.create({
    
    loginText: {
        marginTop: 10,
        color:Constants.Colors.skyBlue,
      },
    
    textInput : {
        backgroundColor:'white',
        alignSelf: 'center',
        marginTop: 5,
        width: 200,
        height: 30,
        paddingLeft : 10,
        borderWidth: 1,
        borderColor: Constants.Colors.skyBlue,
        borderRadius: 6
      },

    textInputView :{
    
        justifyContent: 'space-between',
        
        marginBottom: 40,
    
      },

      loginOpacityText: {
        color: Constants.Colors.white,
        fontSize: 17
      },
    
      loginButton : {
        backgroundColor: Constants.Colors.skyBlue,
        width : 150,
        height : 40,
        justifyContent: 'center',
        alignItems: 'center'
      },

      container: {
          alignItems: 'center',
      },
  })