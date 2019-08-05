import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const googleProvider = new firebase.auth.GoogleAuthProvider()

const firebaseConfig = {
	apiKey: 'AIzaSyAKNmSxDi91iWYZ9GWaa7fgEhguepZx4ig',
	authDomain: 'spacepoints-92e2d.firebaseapp.com',
	databaseURL: 'https://spacepoints-92e2d.firebaseio.com',
	projectId: 'spacepoints-92e2d',
	storageBucket: 'spacepoints-92e2d.appspot.com',
	messagingSenderId: '917250609855',
	appId: '1:917250609855:web:9ba0cb9a51584070',
}

firebase.initializeApp(firebaseConfig)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

export {firebase, googleProvider}
