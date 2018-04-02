import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';
import firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat';
import { fireBase, firebaseAuth, firebaseDatabase } from '../Firebase';
import * as Constants from '../constants';
import ChatInput from './ChatInput';

export default class Chat extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Chat',
      gesturesEnabled: false,
      headerLeft: (
        <Button
          onPress={() => {
            firebaseAuth.signOut().then(() => {
              navigation.goBack();
            });
          }}
          title="Logout"
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.messagesRef = null;
    this.state = {
      messages: [],
      fetch: true
    };
  }

  componentDidMount() {
    console.log('Did mount called ');
    this.messagesRef = firebaseDatabase.ref('messages/');
    this.messagesRef.off();
    const getMessages = data => {
      const message = data.val();
      console.log('messages ', message);
      this.setState(previousState => {
        return {
          messages: GiftedChat.append(previousState.messages, {
            _id: data.key,
            text: message.text,
            createdAt: new Date(message.createdAt),
            user: {
              _id: message.user._id,
              name: message.user.name
            }
          })
        };
      });
    };
    this.messagesRef.limitToLast(20).on('child_added', getMessages);
  }
  onSend(messages = []) {
    for (let i = 0; i < messages.length; i++) {
      this.messagesRef.push({
        text: messages[i].text,
        user: messages[i].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <GiftedChat
          showUserAvatar
          // loadEarlier={false}
          // isLoadingEarlier={this.state.fetch}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: firebaseAuth.currentUser.uid
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.white
  },
  itemView: {
    backgroundColor: Constants.Colors.skyBlue,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10
  },

  itemHeader: {
    padding: 10,
    fontSize: 18,
    height: 30
  },

  itemDescriptor: {
    padding: 12,
    fontSize: 16
  }
});
