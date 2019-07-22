import {firebase} from '../firebase'

const store = firebase.firestore()

const createFamily = async familyName => {
	try {
		const docRef = await store.collection('family').add({
			name: familyName,
			adults: [],
			kids: [],
			rewards: []
		})
		return docRef.id
	} catch (error) {
		console.error(error)
	}
}

const getFamily = async docId => {
	const docRef = store.collection('family').doc(docId)
	try {
		const result = await docRef.get()
		const family = await result.docs[0]
		if (!family || !family.exists) {
			throw new Error('no family')
		}
		return {id: family.id, data: family.data()}
	} catch (error) {
		console.error(error)
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
			return family.data()
		}
	} catch (error) {
		if (error.message === 'family-not-found') {
			return {}
		}
		throw error
	}
}

export { createFamily, getFamily, findFamilyByEmail}
