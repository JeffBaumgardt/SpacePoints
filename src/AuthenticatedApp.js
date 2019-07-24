import React from 'react'
import {useUser} from 'context/user'
import * as store from 'lib/store'

function AuthentiatedApp() {
	const user = useUser()
	const [family, setFamily] = React.useState(null)

	React.useEffect(() => {
		const fetchFamily = async emailAddress => {
			const family = await store.findFamilyByEmail(emailAddress)
			console.log(family)
			setFamily(family)
		}
		fetchFamily(user.email)
	}, [user, setFamily])

	return <div>Hello World</div>
}

export default AuthentiatedApp
