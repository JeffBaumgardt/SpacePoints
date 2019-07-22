import React from 'react'
import {useAuth} from 'context/auth'

function UnauthenticatedApp() {
	const {signIn} = useAuth()

	return <button onClick={signIn}>Sign In</button>
}

export default UnauthenticatedApp
