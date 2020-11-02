import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

var config = {
  apiKey: 'AIzaSyC_SzqdvAKm6iyoAraUDQy9JV95s5qtHTg',
  authDomain: 'react-slack-app-b8a18.firebaseapp.com',
  databaseURL: 'https://react-slack-app-b8a18.firebaseio.com',
  projectId: 'react-slack-app-b8a18',
  storageBucket: 'react-slack-app-b8a18.appspot.com',
  messagingSenderId: '165977984120',
  appId: '1:165977984120:web:755447951200f8877bf18d',
}
// Initialize Firebase
firebase.initializeApp(config)

export default firebase
