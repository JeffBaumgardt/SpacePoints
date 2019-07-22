import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import * as store from 'lib/store'
import * as auth from 'lib/auth'
import {useAction} from 'lib/useAction'

const AuthContext = React.createContext()

function AuthProvider(props) {
	const [attempt, setAttempt] = React.useState(false)
	const [userData, setUserData] = React.useState({})
	const [{data, loading, error, settled}, performAction] = useAction(auth.getUser)

	React.useLayoutEffect(() => {
		if (settled) {
			setAttempt(true)
		}
	}, [settled])

	const loginAttempt = async () => {
		const user = await performAction()
		setUserData(user)
	}

	if (!attempt) {
		if (loading) {
			return <CircularProgress />
		}
		if (error) {
			console.error(error)
		}
		loginAttempt(null)
	}

	const signIn = () => auth.login().then(loginAttempt)
	const logout = () => auth.logout().then(loginAttempt)

	return <AuthContext.Provider value={{data: userData, signIn, logout}} {...props} />
}

function useAuth() {
	const context = React.useContext(AuthContext)
	if (context === undefined) {
		throw new Error(`useAuth must be used within a AuthProvider`)
	}
	return context
}

export {AuthProvider, useAuth}
