import React from 'react'

export const useAction = action => {
	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState(null)
	const [settled, setSettled] = React.useState(false)

	const performAction = async (body = null) => {
		try {
			setLoading(true)
			setError(null)
			setSettled(false)
			const data = await action(body)
			return data
		} catch (error) {
			setError(error)
		} finally {
			setLoading(false)
			setSettled(true)
		}
	}

	return [{loading, error, settled}, performAction]
}
