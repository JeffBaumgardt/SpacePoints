import {firebase, googleProvider} from '../firebase'
import * as store from 'lib/store'

const login = async () => {
	try {
		const result = await firebase.auth().signInWithPopup(googleProvider)
		return result.user
	} catch (error) {
		console.error(error)
	}
}

const logout = async () => {
	try {
		await firebase.auth().signOut()
	} catch (error) {
		console.error(error)
	}
}

const getUser = () => {
	return new Promise((resolve, reject) => {
		firebase.auth().onAuthStateChanged(async user => {
			if (!user) {
				return resolve(null)
			}

			try {
				const userRecord = await store.getUser(user.uid)
				resolve({
					name: user.displayName,
					email: user.email,
					photoURL: user.photoURL,
					docRecord: userRecord.id,
					id: user.uid,
				})
			} catch (error) {
				logout()
				reject(error)
			}
		})
	})
}
window.firebase = firebase

export {login, logout, getUser}
