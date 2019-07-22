import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const googleProvider = new firebase.auth.GoogleAuthProvider()

const firebaseConfig = {
	apiKey: '',
	authDomain: '',
	databaseURL: '',
	projectId: '',
	storageBucket: '',
	messagingSenderId: '',
	appId: 'ß',
}

firebase.initializeApp(firebaseConfig)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

export {firebase, googleProvider}
