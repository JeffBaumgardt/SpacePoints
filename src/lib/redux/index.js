import {applyMiddleware, createStore, compose} from 'redux'
import thunkMiddle from 'redux-thunk'

import rootReducer from './reducer'

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore(preloadedState) {
	const middleware = [thunkMiddle]
	const middleEnhancer = applyMiddleware(...middleware)

	const enhancers = [middleEnhancer]
	const composedEnhancers = composeEnchancer(...enhancers)

	const store = createStore(rootReducer, preloadedState, composedEnhancers)

	return store
}