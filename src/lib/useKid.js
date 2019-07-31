import React from 'react'
import {getKid} from 'lib/store'

export const useKid = kidId => {
	const [kid, setKid] = React.useState(null)

	React.useEffect(() => {
		const getKidInfo = async () => {
			const kidInfo = await getKid(kidId)
			setKid(kidInfo)
		}
		getKidInfo()
	}, [kidId])

	return kid
}
