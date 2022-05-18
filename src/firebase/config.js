import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyDrcSDXbQ0X6kHmmZ1wQS3_YA_hhfWTUL8",
    authDomain: "workingdojo.firebaseapp.com",
    projectId: "workingdojo",
    storageBucket: "workingdojo.appspot.com",
    messagingSenderId: "769095705641",
    appId: "1:769095705641:web:e62b35d3303dc8a7b8e838"
};

//init firebase
firebase.initializeApp(firebaseConfig)

//init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

//timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }