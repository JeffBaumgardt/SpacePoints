import React from 'react'
import {useUser} from 'context/user'
import * as store from 'lib/store'
import AppRouter from 'pages/AppRouter'
import JoinFamily from 'pages/JoinFamily'
import {useDispatch} from 'react-redux'
import {initilizeFamily} from 'lib/redux/reducer/family'

function AuthentiatedApp() {
	const user = useUser()
	const [family, setFamily] = React.useState(null)
	const [isSetteled, setSetteled] = React.useState(false)
	const dispatch = useDispatch()

	React.useEffect(() => {
		const fetchFamily = async emailAddress => {
			try {
				const family = await store.findFamilyByEmail(emailAddress)
				setFamily(family)
				dispatch(initilizeFamily(family))
			} catch (error) {
				if (error.message === 'family-not-found') {
					setFamily(null)
				}
			}
			setSetteled(true)
		}
		fetchFamily(user.email)
	}, [user, setFamily, dispatch])

	return isSetteled ? (
		<>
			<AppRouter familyInfo={family} />
			{!family && <JoinFamily completeFamily={newFamily => {
				setFamily(newFamily)
				dispatch(initilizeFamily(newFamily))
			}} />}
		</>
	) : null
}

export default AuthentiatedApp
