import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/analytics'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDUMb4dGISCd8N3UUtRrFAl398SSX4g4Mo",
  authDomain: "shopping-85507.firebaseapp.com",
  projectId: "shopping-85507",
  storageBucket: "shopping-85507.appspot.com",
  messagingSenderId: "375038453817",
  appId: "1:375038453817:web:1f5dd7cdb54e1742c645e8"
};
firebase.initializeApp(firebaseConfig)
// firebase.analytics()

export default firebase
