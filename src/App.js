import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import CircularProgress from '@material-ui/core/CircularProgress'
import {useUser} from 'context/user'

import SiteWrapper from 'pages/SiteWrapper'

const loadAuthenticatedApp = () => import('./AuthenticatedApp')
const AuthenticatedApp = React.lazy(loadAuthenticatedApp)
const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'))

function App() {
	const user = useUser()

	React.useEffect(() => {
		loadAuthenticatedApp()
	}, [])

	return (
		<SiteWrapper>
			<CssBaseline />
			<React.Suspense fallback={<CircularProgress />}>
				{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
			</React.Suspense>
		</SiteWrapper>
	)
}

export default App
