import React from 'react'
import {useUser} from 'context/user'
import * as store from 'lib/store'
import AppRouter from 'pages/AppRouter'
import JoinFamily from 'pages/JoinFamily'

function AuthentiatedApp() {
	const user = useUser()
	const [family, setFamily] = React.useState(null)
	const [isSetteled, setSetteled] = React.useState(false)

	React.useEffect(() => {
		const fetchFamily = async emailAddress => {
			try {
				const family = await store.findFamilyByEmail(emailAddress)
				setFamily(family)
			} catch (error) {
				if (error.message === 'family-not-found') {
					setFamily(null)
				}
			}
			setSetteled(true)
		}
		fetchFamily(user.email)
	}, [user, setFamily])

	return isSetteled ? (
		<>
			<AppRouter familyInfo={family} />
			{!family && <JoinFamily completeFamily={newFamily => setFamily(newFamily)} />}
		</>
	) : null
}

export default AuthentiatedApp
