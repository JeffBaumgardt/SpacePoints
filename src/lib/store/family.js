import {firebase} from '../firebase'
import {store as ReduxStore} from 'context/redux'
import {updateFamily} from 'lib/redux/reducer/family'

const store = firebase.firestore()

export const createFamily = async familyName => {
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

const processKids = async kids => {
	const kidPromises = []

	kids.forEach(kid => {
		kidPromises.push(getKid(kid))
	})

	return await Promise.all(kidPromises)
}

export const getFamily = async docId => {
	const docRef = store.collection('family').doc(docId)
	try {
		const result = await docRef.get()
		if (!result || !result.exists) {
			throw new Error('no-family')
		}

		const kids = await processKids(result.data().kids)

		return {id: result.id, ...result.data(), kids, docRef: docRef}
	} catch (error) {
		throw error
	}
}

const getKid = async kidRef => {
	const result = await kidRef.get()
	return {...result.data(), id: result.id, docRef: kidRef}
}

export const addAdultToFamily = async (docId, emailAddress) => {
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

export const findFamilyByEmail = async emailAddress => {
	const docRef = store.collection('family').where('adults', 'array-contains', emailAddress)
	try {
		const result = await docRef.get()
		if (!result || result.empty) {
			throw new Error('family-not-found')
		} else {
			const family = result.docs[0]
			return getFamily(family.id)
		}
	} catch (error) {
		throw error
	}
}

export const watchDocRef = docRef => {
	return docRef.onSnapshot(async snapshot => {
		console.log('Update', snapshot.data())
		const result = snapshot.data()

		const kids = await processKids(result.kids)

		const family = {id: snapshot.id, ...result, kids, docRef: result.ref}

		ReduxStore.dispatch(updateFamily(family))
	})F
}
