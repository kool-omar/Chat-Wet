
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBLB5ar0j3dHBmc1PIS9syImw06AEeSr0M",
    authDomain: "chat-wet.firebaseapp.com",
    databaseURL: "https://chat-wet.firebaseio.com",
    storageBucket: "chat-wet.appspot.com",
    projectId: "chat-wet",
    messagingSenderId: "969850552931"
  };
  
 export const firebaseApp = firebase.initializeApp(firebaseConfig);

  export const firebaseAuth = firebase.auth()