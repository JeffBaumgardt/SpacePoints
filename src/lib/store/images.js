import uuidv4 from 'uuid/v4';
import {firebase} from '../firebase.js'

const storageRef = firebase.storage().ref()

export const uploadImage = async file => {
	const ref = storageRef.child(`images/${uuidv4()}.jpg`)
	const upload = await ref.put(file)
	return upload.ref.getDownloadURL()
}
