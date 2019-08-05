import {Provider} from 'react-redux'
import configureStore from 'lib/redux'

import React from 'react'

export const store = configureStore()
window.store = store
const ReduxProvider = ({children}) => {
	return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider