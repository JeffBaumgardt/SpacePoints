import {firebase} from '../firebase'

const store = firebase.firestore()

export const createKid = async ({name, image}) => {
	const result = await store.collection('kids').add({
		name,
		image,
		points: 0
	})
	return result.id
}

export const getKid = async kidId => {
	const result = await store.collection('kids').doc(kidId)
	const kid = await result.get()
	return {...kid.data(), id: kid.id}
}

export const removeKid = async docId => {
	return await store.collection('kids').doc(docId).delete()
}

export const updateKid = async ({kidId, name, image, points}) => {
	return await store.collection('kids').doc(kidId).update({
		name,
		image,
		points
	})
}
