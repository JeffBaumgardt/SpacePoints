import React from 'react'
import {useUser} from 'context/user'
import * as store from 'lib/store'
import HomeLanding from 'pages/HomeLanding'
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
			<HomeLanding familyInfo={family} />
			{!family && <JoinFamily completeFamily={newFamily => setFamily(newFamily)} />}
		</>
	) : null
}

export default AuthentiatedApp
