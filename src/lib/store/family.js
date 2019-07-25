import {firebase} from '../firebase'

const store = firebase.firestore()

const createFamily = async familyName => {
	try {
		const docRef = await store.collection('family').add({
			name: familyName,
			adults: [],
			kids: [],
			rewards: [],
		})
		return docRef.id
	} catch (error) {
		throw error
	}
}

const getFamily = async docId => {
	const docRef = store.collection('family').doc(docId)
	try {
		const result = await docRef.get()
		const family = await result.docs[0]
		if (!family || !family.exists) {
			throw new Error('no-family')
		}
		return {id: family.id, data: family.data()}
	} catch (error) {
		throw error
	}
}

const addAdultToFamily = async (docId, emailAddress) => {
	const docRef = store.collection('family').doc(docId)
	try {
		const result = await docRef.get()
		if (!result || !result.exists) {
			throw new Error('no-family')
		}
		const adults = result.data().adults
		if (!adults.includes(emailAddress)) {
			docRef.set({adults: [...adults, emailAddress]}, {merge: true})
			return 'success'
		} else {
			return 'conflict'
		}
	} catch (error) {
		throw error
	}
}

const findFamilyByEmail = async emailAddress => {
	const docRef = store.collection('family').where('adults', 'array-contains', emailAddress)
	try {
		const result = await docRef.get()
		if (!result || result.empty) {
			throw new Error('family-not-found')
		} else {
			const family = result.docs[0]
			return {...family.data(), id: family.id}
		}
	} catch (error) {
		throw error
	}
}

export {createFamily, getFamily, findFamilyByEmail, addAdultToFamily}
