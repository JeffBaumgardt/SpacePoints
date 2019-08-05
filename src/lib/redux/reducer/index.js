import {combineReducers} from 'redux'
import familyReducer from './family'

const rootReducer = combineReducers({
	family: familyReducer,
})

export default rootReducer
