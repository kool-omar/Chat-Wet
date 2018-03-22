import { AppRegistry } from 'react-native';
import {RootStack} from './App/Components/Home';
import * as firebase from './App/Firebase';



AppRegistry.registerComponent('Chat', () => RootStack);
