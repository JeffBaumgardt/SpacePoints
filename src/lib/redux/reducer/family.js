import {createReducer} from 'lib/redux/createReducer'

const INITILIZE_FAMILY = 'INITILIZE_FAMILY'
const RESET_FAMILY = 'RESET_FAMILY'
const UPDATE_KID = 'UPDATE_KID'
const UPDATE_FAMILY = 'UPDATE_FAMILY'

const initialState = {
	name: '',
	id: '',
	kids: '',
}

const mapKidsToRemoveDocRef = kids =>
	kids.map(kid => ({
		name: kid.name,
		points: kid.points,
		image: kid.image,
		id: kid.id,
	}))

const initilizeFamilyReducer = (state, action) => {
	state.name = action.name
	state.id = action.id
	state.kids = mapKidsToRemoveDocRef(action.kids)
}

const resetFamilyReducer = state => {
	state = initialState
}

const updateKidReducer = (state, action) => {
	const selectedKid = state.kids.find(kid => kid.id === action.id)
	selectedKid.points = action.points
	selectedKid.image = action.image
	selectedKid.name = action.name

	state.kids = [...state.kids, ...selectedKid]
}

const updateFamilyReducer = (state, action) => {
	state.name = action.name
	state.kids = mapKidsToRemoveDocRef(action.kids)
	state.adults = action.adults
}

const familyReducer = createReducer(initialState, {
	INITILIZE_FAMILY: initilizeFamilyReducer,
	RESET_FAMILY: resetFamilyReducer,
	UPDATE_KID: updateKidReducer,
	UPDATE_FAMILY: updateFamilyReducer,
})

export const initilizeFamily = family => {
	return {
		type: INITILIZE_FAMILY,
		...family,
	}
}

export const updateFamily = family => {
	return {
		type: UPDATE_FAMILY,
		...family
	}
}

export const resetFamily = () => {
	return {type: RESET_FAMILY}
}

export const updateKid = (id, {name, image, points}) => {
	return {
		type: UPDATE_KID,
		id,
		name,
		image,
		points
	}
}

export default familyReducer
