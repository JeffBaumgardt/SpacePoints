import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Button, Container} from '@material-ui/core'
import Mail from '@material-ui/icons/Mail'

import WarmFuzzy from 'images/warm-fuzzie.png'

import {useAuth} from 'context/auth'

const useStyles = makeStyles(theme => ({
	loginContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 100
	},
	button: {
		marginTop: theme.spacing(4),
		margin: theme.spacing(1),
	},
	buttonIcon: {
		marginRight: theme.spacing(1),
	},
}))

function UnauthenticatedApp() {
	const {signIn} = useAuth()
	const classes = useStyles()

	return (
		<Container maxWidth="sm" className={classes.loginContainer}>
			<img src={WarmFuzzy} alt="Warm Fuzzy" />
			<Button variant="contained" color="primary" className={classes.button} onClick={signIn}>
				<Mail className={classes.buttonIcon} />
				Login with Gmail
			</Button>
		</Container>
	)
}

export default UnauthenticatedApp
