import {firebase, googleProvider} from '../firebase'

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

			resolve({
				name: user.displayName,
				email: user.email,
				photoURL: user.photoURL,
				id: user.uid,
			})
		})
	})
}
window.firebase = firebase

export {login, logout, getUser}
