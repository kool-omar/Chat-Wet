 import React, { Component } from 'react';
 import {

    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    TouchableOpacity,

  } from 'react-native';

  import * as Constants from '../constants'

export default class ChatInput extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            text : '',
            viewWidth : 0,
            contentWidth: 0,
            viewHeight: 0,
        }
        
    }

    handleMessageChange = (message) => {

    }
    
    handleButtonPress = () => {

    }
    
    componentDidUpdate(prevProps) {
          
    }
    
    render() {

        const sending = false
    const isButtonDisabled = true
    const opacity = isButtonDisabled ? true : false

        return (

            <View style={styles.container}>

            <TextInput
            style={styles.textInput}
            placeholder={'placeholder'}
            returnKeyType='send'
            value={this.props.message}
            underlineColorAndroid={'transparent'}
            editable={!sending} 
            style={[styles.textInput, {height: Math.max(this.state.viewHeight,this.state.contentWidth)}]}
            value={this.state.text}

            onChangeText={(text) => {
                this.setState({ text })
            }}
            onContentSizeChange={(event) => {
                this.setState({ contentWidth: event.nativeEvent.contentSize.width })
            }}

            onLayout={ (event) => {
                var {x, y, width, height} = event.nativeEvent.layout
                this.setState({
                    viewWidth: width,
                    viewHeight: height
                })
            }}
            />


            <TouchableOpacity
                style={styles.button}
                onPress={this.handleButtonPress}
                disabled={isButtonDisabled}>
                <Text style = {styles.buttonText} >
                    >
                </Text>
               

            </TouchableOpacity>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      minWidth: '100%',
      backgroundColor: Constants.Colors.white,
      borderTopColor: Constants.Colors.skyBlue,
      borderTopWidth: 1,
    },
    textInput: {
      flex: 1,
      backgroundColor: '#ffffff',
      height: 40,
      margin: 10,
      borderRadius: 5,
      padding: 3,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: Constants.Colors.skyBlue, 

    },
    button: {
      flexShrink: 0,
      alignSelf: 'flex-end',
      width: 50,
      height: 40,
      marginTop: 10,
      marginRight: 10,
      marginBottom: 10,
      alignItems: 'center',
      justifyContent:'center',
      backgroundColor: Constants.Colors.skyBlue,
      borderRadius: 6
    },
    buttonText: {
        fontSize: 32,
        color : Constants.Colors.white
    }
  })