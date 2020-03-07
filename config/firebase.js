import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyCssNIoAtgCDBdOSCNJmZ5faRGuZPcEShg",
    authDomain: "cross-platforn-pkdx.firebaseapp.com",
    databaseURL: "https://cross-platforn-pkdx.firebaseio.com",
    projectId: "cross-platforn-pkdx",
    storageBucket: "cross-platforn-pkdx.appspot.com",
    messagingSenderId: "450156247641",
    appId: "1:450156247641:web:ead4ec41fb9a57c0928f48"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;