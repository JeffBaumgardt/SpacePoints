import React from 'react'
import PropTypes from 'prop-types'
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from './auth'
import {UserProvider} from './user'

function AppProviders({children}) {
	return (
		<BrowserRouter>
			<AuthProvider>
				<UserProvider>{children}</UserProvider>
			</AuthProvider>
		</BrowserRouter>
	)
}

AppProviders.propTypes = {
	children: PropTypes.node.isRequired,
}

export default AppProviders
