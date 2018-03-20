import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import * as Constants from '../constants'

export default class ModalHeader extends Component {


    render(){
        return (
            <View style ={styles.container}>
                <TouchableOpacity style = {styles.opacity}
                 onPress = {this.props.onPressClose}
                 >
                    <Text style = {styles.opacityText}>
                        X
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container : {

        marginTop: 20,
        height: 40,
        width: Dimensions.get('window').width,

        alignItems: 'flex-start',
        
    },
    opacity: {
        marginLeft: 10,
        marginTop: 10,
        width: 30,
        height : 30,
    },
    opacityText: {
        color: Constants.Colors.skyBlue,

    }
})