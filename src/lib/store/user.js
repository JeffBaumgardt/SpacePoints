import {firebase} from '../firebase'

const store = firebase.firestore()

const createUser = async uid => {
	try {
		const docRef = await store.collection('user').add({
			uid,
		})
		return docRef.id
	} catch (error) {
		console.error(error)
	}
}

const getUser = async uid => {
	const docRef = store
		.collection('user')
		.where('uid', '==', uid)
		.limit(1)
	try {
		const result = await docRef.get()
		const doc = await result.docs[0]
		if (!doc || !doc.exists) {
			throw new Error('not-found')
		}
		return {id: doc.id, data: doc.data()}
	} catch (error) {
		if (error.code === 'not-found' || error.message === 'not-found') {
			const id = await createUser(uid)
			return {id}
		}
		throw error
	}
}

const updateUser = async (uid, update) => {
	const docRef = store
		.collection('user')
		.where('uid', '==', uid)
		.limit(1)
	try {
		const result = await docRef.get()
		const doc = await result.docs[0]
		if (doc && doc.exists) {
			doc.update(update)
		} else {
			doc.set(update)
		}
	} catch (error) {
		console.error(error)
	}
}

export {getUser, createUser, updateUser}
