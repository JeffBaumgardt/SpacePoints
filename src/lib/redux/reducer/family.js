import {createReducer} from 'lib/redux/createReducer'

const INITILIZE_FAMILY = 'INITILIZE_FAMILY'

const initialState = {
	name: '',
	adults: [],
	kids: [],
	rewards: []
}

const initilizeFamilyReducer = (state, action) => {
	state.name = action.name
	state.adults = action.adults
	state.kids = action.kids
	state.rewards = action.rewards
}

const familyReducer = createReducer(initialState, {
	INITILIZE_FAMILY: initilizeFamilyReducer,
})

export const initilizeFamily = family => {
	return {
		type: INITILIZE_FAMILY,
		...family
	}
}

export default familyReducer