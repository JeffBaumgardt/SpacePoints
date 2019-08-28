import React, {useCallback} from 'react'
import {useUser} from 'context/user'
import * as store from 'lib/store'
import AppRouter from 'pages/AppRouter'
import JoinFamily from 'pages/JoinFamily'
import {useDispatch, useSelector} from 'react-redux'
import {watchDocRef, updateFamily} from 'lib/store'

function AuthentiatedApp() {
	const user = useUser()
	const [familyRef, setFamilyRef] = React.useState(null)
	const [isSetteled, setSetteled] = React.useState(false)
	const family = useSelector(state => state.family)
	const dispatch = useDispatch()
	const familySetter = useCallback(family => dispatch(updateFamily(family)), [dispatch, updateFamily])

	React.useEffect(() => {
		const fetchFamily = async emailAddress => {
			try {
				const family = await store.findFamilyByEmail(emailAddress)
				dispatch(updateFamily(family))
				setFamilyRef(family.docRef)
			} catch (error) {
				if (error.message === 'family-not-found') {
					dispatch(updateFamily(null))
				}
			}
			setSetteled(true)
		}
		fetchFamily(user.email)
	}, [user, dispatch, setFamilyRef, updateFamily])

	React.useEffect(() => {
		let listener
		if (familyRef) {
			listener = watchDocRef(familyRef)
		}
	}, [familyRef])

	return isSetteled ? (
		<>
			<AppRouter/>
			{!family && (
				<JoinFamily
					completeFamily={familySetter}
				/>
			)}
		</>
	) : null
}

export default AuthentiatedApp
