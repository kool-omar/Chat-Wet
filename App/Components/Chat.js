
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
  import { fireBase, firebaseAuth, firebaseDatabase } from '../Firebase'
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

         constructor(props){
             super(props)
             this.messagesRef = firebaseDatabase.ref('messages/')
             this.state = {
                messages: [],
              }

              
         }

         


        
          listenForMessages(messagesRef) {
            messagesRef.on('value', (snap) => {
        
              // get children as an array
              var messages = [];
              snap.forEach((child) => {
                console.log(child.val().text)
                console.log(child.val().createdAt)
                console.log( new Date( child.val().createdAt))
                messages.push({

                  _id: child.val()._id,
                //   _key: child.key,
                  text: child.val().text,
                  createdAt: new Date( child.val().createdAt),

                  user: child.val().user
                })
              })
              this.setState( (previousState) => {
                return{
                  messages
                }
              })
              
              
        
            });
          }

         componentWillMount() {
             this.listenForMessages(this.messagesRef)
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
                  {
                    _id: 2,
                    text: 'H',
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
            messages = messages.map((message) => {
                return {
                  ...message,
                  createdAt: Date.now(),

                };
              });
            this.setState(previousState => ({
              // messages: GiftedChat.prepend(previousState.messages, messages, false),
            }))
            var messagePush =  this.messagesRef.push(messages[0])
           
          }
    render(){
        return (
            <View style={styles.container}>
             <GiftedChat

                // inverted = {false}
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: 1,
                    uid: firebaseAuth.currentUser.uid,
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