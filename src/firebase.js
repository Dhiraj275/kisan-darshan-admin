import firebase from 'firebase/app';
import 'firebase/database'; 
import 'firebase/firestore'
import 'firebase/storage';
import 'firebase/auth'
const config = {
    apiKey: "AIzaSyDJqDHiKaWEqGAEUx5qZjutSVhyChC_BeY",
    authDomain: "kisaandarshan-test.firebaseapp.com",
    databaseURL: "https://kisaandarshan-test-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kisaandarshan-test",
    storageBucket: "kisaandarshan-test.appspot.com",
    messagingSenderId: "109364081834",
    appId: "1:109364081834:web:81b45f841bb7e360bb8cd3"
  };

firebase.initializeApp(config);
export default firebase