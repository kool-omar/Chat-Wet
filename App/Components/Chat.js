
 import React, { Component } from 'react';
 import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    TouchableOpacity,
    FlatList,
  } from 'react-native';

  import { GiftedChat } from 'react-native-gifted-chat'
  import { firebaseAuth } from '../Firebase'
  import * as Constants from '../constants'
import ChatInput from './ChatInput'


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

         state = {
            messages: [],
          }
        

         componentWillMount() {
            this.setState({
              messages: [
                {
                  _id: 1,
                  text: 'Hello developer',
                  createdAt: new Date(),
                  user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://facebook.github.io/react/img/logo_og.png',
                  },
                },
              ],
            })
          }
         onSend(messages = []) {
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, messages),
            }))
          }
    render(){
        return (
            <View style={styles.container}>
             <GiftedChat

                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                _id: 1,
                }}
                />
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor: Constants.Colors.white,
        
    },
    itemView:{
        backgroundColor: Constants.Colors.skyBlue,
        marginBottom: 10,
        marginRight: 10,
        marginLeft:10,
    },
    
    itemHeader : {
        padding: 10,
        fontSize: 18,
        height: 30,
    },

    itemDescriptor: {
        padding: 12,
        fontSize: 16,
    },
})