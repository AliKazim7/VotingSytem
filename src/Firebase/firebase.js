import firebase from 'firebase'
import 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBEff3fTjyVt7LQDg5Dx6oVpC1qqgAsH0A",
    authDomain: "votingapp-a4e8b.firebaseapp.com",
    databaseURL: "https://votingapp-a4e8b.firebaseio.com",
    projectId: "votingapp-a4e8b",
    storageBucket: "votingapp-a4e8b.appspot.com",
    messagingSenderId: "7678517835",
    appId: "1:7678517835:web:addf64db5cae2c5af223ce",
    measurementId: "G-L6DQ0EQPNK"


}

const Firebase = firebase.initializeApp(firebaseConfig)
// const storage = Firebase.storage()

export default Firebase