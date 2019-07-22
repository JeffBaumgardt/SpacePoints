import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import CircularProgress from '@material-ui/core/CircularProgress'
import {useUser} from 'context/user'

const loadAuthenticatedApp = () => import('./AuthenticatedApp')
const AuthenticatedApp = React.lazy(loadAuthenticatedApp)
const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'))

function App() {
	const user = useUser()

	React.useEffect(() => {
		loadAuthenticatedApp()
	}, [])

	return (
		<>
			<CssBaseline />
			<React.Suspense fallback={<CircularProgress />}>
				{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
			</React.Suspense>
		</>
	)
}

export default App
