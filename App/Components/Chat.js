
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
            <View style={styles.container}>
            <FlatList
              data={[
                {key: 'Devin', description: 'desc 1'},
                {key: 'Jackson'},
                {key: 'James'},
                {key: 'Joel'},
                {key: 'John'},
                {key: 'Jillian'},
                {key: 'Jimmy'},
                {key: 'Julie'},
              ]}
              renderItem={({item}) => (<View style = {styles.itemView} >
                 <Text style={styles.itemHeader}>
                    {item.key
                    }</Text>
                    <Text style = {style = styles.itemDescriptor}>
                    {item.description}</Text>
              </View>)}
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